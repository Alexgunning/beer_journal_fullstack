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

def generateToken():
   return token_hex(16)

def getUserId(token):
    user = mongo.db.users.find_one({"token": token})
    if not user:
        abort(401)
    return str(user['_id'])

def getUserToken(username, password):
    user = mongo.db.users.find_one({"username": username, "password": password})
    print(user)
    if not user:
        abort(401)
    return user['token']

def getUserIdFromRequest(req):
    token = req.headers.get('token')
    userId = getUserId(token)
    if not userId:
        abort(401)
    return userId

def mapBeers(beers):
    for beer in beers:
        beer['_id'] = str(beer['_id'])
        beer['user'] = str(beer['user'])
    return beers
    

@app.route('/newUser', methods=['POST'])
def newUser():
    username = request.args.get('username')
    password = request.args.get('password')
    name = request.args.get('name')
    if not username or not password or not name:
        return "name username and/or password not sent"
    token = generateToken()
    userInsert = mongo.db.users.insert_one({"username" : username, "password": password, "token": token, "name": name})
    return jsonify({"_id": str(userInsert.inserted_id), "token": token})

@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return "name username and/or password not sent"
    token = getUserToken(username, password)
    return jsonify({"token": token })

@app.route('/addBeer', methods=['POST'])
def addBeer():
    user = getUserIdFromRequest(request)
    name = request.args.get('name')
    brewer = request.args.get('brewer')
    abv = request.args.get('abv')
    beer = mongo.db.beers.insert_one({"name": name, "brewer": brewer, "abv": abv, "user": ObjectId(user)})
    return jsonify({"_id" : str(beer.inserted_id)})

@app.route('/getBeers')
def getBeers():
    user = getUserIdFromRequest(request)
    beer = mongo.db.beers.find({"user": ObjectId(user)})
    mappedBeer = mapBeers(list(beer))
    return jsonify(mappedBeer)
    # return jsonify(list(beer))


if __name__ == '__main__':
    app.run()
