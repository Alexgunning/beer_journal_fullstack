'''routes'''
import json
from secrets import token_hex
from uuid import uuid4
from flask_cors import CORS
from flask import Flask, jsonify, request, abort
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from app import app

# app = Flask(__name__)
CORS(app)
# bcrypt = Bcrypt(app)

app.config['MONGO_DBNAME'] = 'beer'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/beer'

mongo = PyMongo(app)

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
    email = request.args.get('email')
    password = request.args.get('password')
    name = request.args.get('name')
    if not email or not password or not name:
        return "name email and/or password not sent"
    token = generate_token()
    _id = str(uuid4())
    user_insert = mongo.db.users.insert_one({"_id": _id, "email" : email, "password": password, "token": token, "name": name})
    return jsonify({"_id": user_insert.inserted_id})

@app.route('/login', methods=['POST'])
def login():
    email = request.args.get('email')
    password = request.args.get('password')
    if not email or not password:
        return "name email and/or password not sent"
    token = get_user_token(email, password)
    return jsonify({"token": token})

@app.route('/addBeer', methods=['POST'])
def add_beer():
    user_id = get_user_id_from_request(request)
    try:
        beer = json.loads(request.data)
        name = beer["name"]
        brewer = beer["brewer"]
        abv = beer["abv"]
    except:
        abort(400)
    _id = str(uuid4())
    beer_to_insert = {"_id": _id, "name": name, "brewer": brewer, "abv": abv, "user": user_id}
    mongo.db.beers.insert_one(beer_to_insert)
    return jsonify(beer_to_insert)

@app.route('/putBeer', methods=['PUT'])
def put_beer():
    user_id = get_user_id_from_request(request)
    try:
        beer = json.loads(request.data)
        _id = beer["_id"]
        name = beer["name"]
        brewer = beer["brewer"]
        abv = beer["abv"]
    except:
        abort(400)
    beer["user"] = user_id
    try:
        mongo.db.beers.insert_one(beer)
    except:
        mongo.db.beers.update_one({"_id:": _id}, {"$set": beer})
    return jsonify(beer)

@app.route('/getBeers')
def get_beers():
    user_id = get_user_id_from_request(request)
    beers = mongo.db.beers.find({"user": user_id})
    return jsonify(list(beers))

@app.route('/getBeerById/<string:beer_id>')
def get_beer_by_id(beer_id):
    # user_id = get_user_id_from_request(request)
    beer = mongo.db.beers.find_one({"_id": beer_id})
    return jsonify(beer)

# if __name__ == '__main__':
#     app.run()
