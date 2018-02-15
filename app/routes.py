'''routes'''
from werkzeug.security import generate_password_hash, check_password_hash
import json
from uuid import uuid4
from flask import Flask, jsonify, request, abort, g
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from jsonschema import validate, ValidationError
from app import app, mongo
from schema import beer_schema, user_schema, login_schema
from user import User
from flask_login import UserMixin, current_user, login_user, login_required
from app import login
from auth import generate_token, requires_auth, verify_token

def get_user(id):
    user = mongo.db.users.find_one({"_id": id})
    return User(**user)

#TODO convert all aborts to this
def bad_request(code, message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response

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

@app.route('/register', methods=['POST'])
def register():
    try:
        new_user = json.loads(request.data)
    except:
        abort(400)
    new_user["_id"] = str(uuid4())
    try:
        validate(new_user, user_schema)
    except:
        return abort(400)
    user = User(**new_user)
    user.set_password(new_user["password"])
    user.token = generate_token()

    #Pull out the class variables
    mongo_user = vars(user)
    try:
        user_insert = mongo.db.users.insert_one(mongo_user)
    #TODO figure out more descriptive error
    except:
        return bad_request("Dupliciate email", 400)

    return jsonify(id=mongo_user["_id"], token=mongo_user["token"])

@app.route("/login", methods=["POST"])
def login():
    try:
        login = json.loads(request.data)
    except:
        abort(400)
    try:
        validate(login, login_schema)
    except:
        return bad_request("Login Parameters not correct", 400)
    user = User.get_user_with_email_and_password(login["email"], login["password"])
    if user:
        return jsonify(token=user._id)
    return jsonify(error=True), 403

@app.route('/logout')
@login_required
def logout():
    
    return "logout success"

# @app.route("/api/is_token_valid", methods=["POST"])
# def is_token_valid():
#     incoming = request.get_json()
#     is_valid = verify_token(incoming["token"])

#     if is_valid:
#         return jsonify(token_is_valid=True)
#     else:
#         return jsonify(token_is_valid=False), 403

@app.route('/addBeer', methods=['POST'])
def add_beer():
    user_id = get_user_id_from_request(request)
    try:
        beer = json.loads(request.data)
    except:
        return bad_request(400, "Request not json")
    beer["user"] = user_id
    beer["_id"] = str(uuid4())

    try:
        validate(beer, beer_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
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
        validate(beer, beer_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
    try:
        mongo.db.beers.insert_one(beer)
    except:
        print("update one")
        mongo.db.beers.update_one({"_id": beer["_id"]}, {"$set": beer})
    return jsonify(beer)

@app.route('/getBeers')
@requires_auth
def get_beers():
    beers = mongo.db.beers.find({"user": g.current_user._id })
    return jsonify(list(beers))

@app.route('/getBeerById/<string:beer_id>')
def get_beer_by_id(beer_id):
    beer = mongo.db.beers.find_one({"_id": beer_id})
    if not beer:
        abort(400)
    return jsonify(beer)


@app.route('/')
@login_required
def test():
    return "wooooooo"
