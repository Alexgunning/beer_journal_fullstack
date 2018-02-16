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
from app import login
from auth import generate_token, requires_auth, verify_token, remove_token
from auth_jwt import generate_token_jwt, requires_auth_jwt, verify_token_jwt

def get_user(id):
    user = mongo.db.users.find_one({"_id": id})
    return User(**user)

#TODO convert all aborts to this
def bad_request(code, message):
    response = jsonify({'message': message})
    response.status_code = code
    return response

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
        return bad_request(400, "Dupliciate email")

    return jsonify(id=mongo_user["_id"], token=mongo_user["token"])

@app.route('/register_jwt', methods=['POST'])
def register_jwt():
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

    #Pull out the class variables
    mongo_user = vars(user)
    try:
        user_insert = mongo.db.users.insert_one(mongo_user)
    #TODO figure out more descriptive error
    except:
        return bad_request(400, "Dupliciate email")

    return jsonify(id=mongo_user["_id"], token=generate_token_jwt(mongo_user))

@app.route("/login_jwt", methods=["POST"])
def login_jwt():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    user_map = vars(user)
    if user:
        return jsonify(token=generate_token_jwt(user_map))

    return jsonify(error=True), 403

@app.route("/user_jwt", methods=["GET"])
@requires_auth_jwt
def get_user_jwt():
    return jsonify(result=g.current_user)

@app.route("/login", methods=["POST"])
def login():
    try:
        login = json.loads(request.data)
    except:
        abort(400)
    try:
        validate(login, login_schema)
    except:
        return bad_request(400, "Login Parameters not correct")
    user = User.get_user_with_email_and_password(login["email"], login["password"])
    if user:
        if user.token:
            token = user.token
        else:
            token = generate_token()
            mongo.db.users.update_one({"_id": user._id }, {"$set": {"token" : token}})
        return jsonify(_id=user._id,token=token)
    return jsonify(error=True), 403

@app.route('/logout')
@requires_auth
def logout():
    remove_token(g.current_user._id)
    return "logout success"


@app.route('/addBeer', methods=['POST'])
@requires_auth
def add_beer():
    user = g.current_user
    try:
        beer = json.loads(request.data)
    except:
        return bad_request(400, "Request not json")
    beer["user"] = user._id
    beer["_id"] = str(uuid4())

    try:
        validate(beer, beer_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
    mongo.db.beers.insert_one(beer)
    return jsonify(beer)

@app.route('/putBeer', methods=['PUT'])
@requires_auth
def put_beer():
    user = g.current_user
    try:
        beer = json.loads(request.data)
    except:
        abort(400)
    beer["user"] = user._id
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
@requires_auth
def get_beer_by_id(beer_id):
    beer = mongo.db.beers.find_one({"_id": beer_id})
    if not beer:
        abort(400)
    return jsonify(beer)
