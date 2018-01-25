from secrets import token_hex
from bson import ObjectId
from flask import Flask, jsonify, request, abort
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config['MONGO_DBNAME'] = 'beer'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/beer'

mongo = PyMongo(app)

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
    user_id = get_user_id(token)
    if not user_id:
        abort(401)
    return user_id

def map_beers(beers):
    for beer in beers:
        beer['_id'] = str(beer['_id'])
        beer['user'] = str(beer['user'])
    return beers


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
    user = get_user_id_from_request(request)
    name = request.args.get('name')
    brewer = request.args.get('brewer')
    abv = request.args.get('abv')
    beer = mongo.db.beers.insert_one({"name": name, "brewer": brewer, "abv": abv, "user": ObjectId(user)})
    return jsonify({"_id" : str(beer.inserted_id)})

@app.route('/getBeers')
def get_beers():
    user = get_user_id_from_request(request)
    beer = mongo.db.beers.find({"user": ObjectId(user)})
    mapped_beer = map_beers(list(beer))
    return jsonify(mapped_beer)

if __name__ == '__main__':
    app.run()
