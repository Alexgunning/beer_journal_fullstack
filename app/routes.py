'''routes'''
import json
from secrets import token_hex
from uuid import uuid4
from flask_cors import CORS
from flask import Flask, jsonify, request, abort
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from jsonschema import validate
from app import app, mongo
from schema import beer_schema, user_schema, login_schema

# app = Flask(__name__)
CORS(app)
# bcrypt = Bcrypt(app)


##TODO throw errors in getting user ids and tokens and catch them in auth routes to abort(401) instead of in repo functions

def generate_token():
    return token_hex(16)

def get_user_id(token):
    user = mongo.db.users.find_one({"token": token})
    if not user:
        abort(401)
    return user['_id']

def get_user_token(email, password):
    user = mongo.db.users.find_one({"email": email, "password": password})
    if not user:
        abort(401)
    return user['token']

def get_user_id_from_request(req):
    token = req.headers.get('token')
    if not token:
        token = '7884b22d989b2bc1b3eeede091e1c0e6'
    user_id = get_user_id(token)
    if not user_id:
        abort(401)
    return user_id

@app.route('/newUser', methods=['POST'])
def new_user():
    try:
        new_user = json.loads(request.data)
    except:
        abort(400)
    new_user["token"] = generate_token()
    new_user["_id"] = str(uuid4())
    try:
        validate(new_user, user_schema)
    except:
        return abort(400)
    user_insert = mongo.db.users.insert_one(new_user)
    return jsonify({"_id": user_insert.inserted_id})

@app.route('/login', methods=['POST'])
def login():
    try:
        login = json.loads(request.data)
    except:
        abort(400)
    try:
        validate(login, login_schema)
    except:
        return abort(400)
    token = get_user_token(login["email"], login["password"])
    return jsonify({"token": token})

@app.route('/addBeer', methods=['POST'])
def add_beer():
    user_id = get_user_id_from_request(request)
    try:
        beer = json.loads(request.data)
    except:
        abort(400)
    beer["user"] = user_id
    beer["_id"] = str(uuid4())

    try:
        validate(beer, beer_schema)
    except:
        return abort(400)
    mongo.db.beers.insert_one(beer)
    return jsonify(beer)

@app.route('/putBeer', methods=['PUT'])
def put_beer():
    user_id = get_user_id_from_request(request)
    try:
        beer = json.loads(request.data)
    except:
        abort(400)
    beer["user"] = user_id
    try:
        mongo.db.beers.insert_one(beer)
    except:
        mongo.db.beers.update_one({"_id:": user_id}, {"$set": beer})
    return jsonify(beer)

@app.route('/getBeers')
def get_beers():
    user_id = get_user_id_from_request(request)
    beers = mongo.db.beers.find({"user": user_id})
    return jsonify(list(beers))

@app.route('/getBeerById/<string:beer_id>')
def get_beer_by_id(beer_id):
    beer = mongo.db.beers.find_one({"_id": beer_id})
    return jsonify(beer)

# if __name__ == '__main__':
#     app.run()
