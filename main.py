from secrets import token_hex
from flask_cors import CORS
from bson.objectid import ObjectId
from flask import Flask, jsonify, request, abort
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

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
    return str(user['_id'])

def get_user_token(username, password):
    user = mongo.db.users.find_one({"username": username, "password": password})
    if not user:
        abort(401)
    return user['token']

def get_user_id_from_request(req):
    token = req.headers.get('token')
    if not token:
        token = 'de32ae4a14bc52375f8f725b5874cd43'
    user_id = get_user_id(token)
    if not user_id:
        abort(401)
    return user_id

def map_beers(beers):
    '''jsonify doesn't convert object ids to str so find all object ids and convert to str'''
    for beer in beers:
        for key, val in beer.items():
            if val.__class__.__name__ == "ObjectId":
                beer[key] = str(val)
    return beers
#TODO figure out how to combine these two functions
def map_beer(beer):
    '''jsonify doesn't convert object ids to str so find all object ids and convert to str'''
    for key, val in beer.items():
        if val.__class__.__name__ == "ObjectId":
            beer[key] = str(val)
    return beer


@app.route('/newUser', methods=['POST'])
def new_user():
    username = request.args.get('username')
    password = request.args.get('password')
    name = request.args.get('name')
    if not username or not password or not name:
        return "name username and/or password not sent"
    token = generate_token()
    user_insert = mongo.db.users.insert_one({"username" : username, "password": password, "token": token, "name": name})
    return jsonify({"_id": str(user_insert.inserted_id), "token": token})

@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return "name username and/or password not sent"
    token = get_user_token(username, password)
    return jsonify({"token": token})

@app.route('/addBeer', methods=['POST'])
def add_beer():
    user_id = get_user_id_from_request(request)
    name = request.args.get('name')
    brewer = request.args.get('brewer')
    abv = request.args.get('abv')
    beer = mongo.db.beers.insert_one({"name": name, "brewer": brewer, "abv": abv, "user": ObjectId(user_id)})
    return jsonify({"_id" : str(beer.inserted_id)})

@app.route('/getBeers')
def get_beers():
    user_id = get_user_id_from_request(request)
    beers = mongo.db.beers.find({"user": ObjectId(user_id)})
    mapped_beer = map_beers(list(beers))
    return jsonify(mapped_beer)

@app.route('/getBeerById/<string:beer_id>')
def get_beer_by_id(beer_id):
    # user_id = get_user_id_from_request(request)
    beer = mongo.db.beers.find_one({"_id": ObjectId(beer_id)})
    mapped_beer = map_beer(beer)
    return jsonify(mapped_beer)

if __name__ == '__main__':
    app.run()
