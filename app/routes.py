'''routes'''
from werkzeug.security import generate_password_hash, check_password_hash
import json
from secrets import token_hex
from uuid import uuid4
from flask import Flask, jsonify, request, abort, send_from_directory
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from jsonschema import validate, ValidationError
from app import app, mongo
from schema import beer_schema, user_schema, login_schema
from flask_login import UserMixin, current_user, login_user, login_required
from app import login

class User(UserMixin):
    def __init__(self, **kwargs):
        self._id = kwargs["_id"]
        self.email = kwargs["email"]
        self.name = kwargs["name"]
        try:
            self.password_hash = kwargs["password_hash"]
        except:
            print("Not sure if always passing in password_hash")
        try:
            self.token = kwargs["token"]
        except:
            print("Not sure if always passing in token")

    def get_id(self):
        return self._id

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# app = Flask(__name__)
# bcrypt = Bcrypt(app)

@login.user_loader
def load_user(id):
    return get_user(id)


def get_user(id):
    print("GET_USER CALL USER FROM DB FIRST")
    user = mongo.db.users.find_one({"_id": id})
    print("GET_USER CALL USER FROM DB", user)
    return User(**user)

#TODO convert all aborts to this
def bad_request(code, message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response

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
    #Pull out the class variables
    mongo_user = vars(user)
    user_insert = mongo.db.users.insert_one(mongo_user)
    return "user registered"

@app.route('/login', methods=['POST', 'GET'])
def login():
    if current_user.is_authenticated:
        return "already authenticated"
    try:
        login = json.loads(request.data)
    except:
        abort(400)
    try:
        validate(login, login_schema)
    except:
        return abort(400)
    user_mongo = mongo.db.users.find_one({"email": login["email"] })
    user = User(**user_mongo)
    if user is None or not user.check_password(login["password"]):
        return "invalid login"
    login_user(user, remember=True)
    return "login success"

@app.route('/logout')
def logout():
    logout_user()
    return "logout success"

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
def get_beers():
    user_id = get_user_id_from_request(request)
    beers = mongo.db.beers.find({"user": user_id})
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
