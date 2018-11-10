'''routes'''
import json
from uuid import uuid4
from flask import jsonify, request, abort, g, session
from jsonschema import validate, ValidationError
from app import app, mongo
from schema import beer_schema
from user import User
# from app import login
from auth import generate_token, remove_token
from auth_jwt import generate_token_jwt, requires_auth_jwt
from auth0 import requires_auth
from flask_cors import cross_origin
from pprint import pprint
import functools
import os
from werkzeug.utils import secure_filename
import boto3

UPLOAD_FOLDER = '/Users/alexandergunning/projects/beer_journal_fullstack/backend'
def get_user(id):
    user = mongo.db.users.find_one({"_id": id})
    return User(**user)


# TODO convert all aborts to this
def bad_request(code, message):
    response = jsonify({'message': message})
    response.status_code = code
    return response


@app.route('/beer', methods=['POST'])
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def add_beer():
    userObject = g.current_user
    user = userObject["sub"]
    try:
        beer = json.loads(request.data)
    except:
        return bad_request(400, "Request not json")
    beer["user"] = user

    try:
        validate(beer, beer_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
    mongo.db.beers.insert_one(beer)
    return jsonify(beer)


@app.route('/beer', methods=['PUT'])
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def put_beer():
    userObject = g.current_user
    user = userObject["sub"]
    try:
        beer = json.loads(request.data)
    except:
        abort(400)
    beer["user"] = user
    try:
        validate(beer, beer_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
    try:
        mongo.db.beers.insert_one(beer)
    except:
        mongo.db.beers.update_one({"_id": beer["_id"]}, {"$set": beer})
    return jsonify(beer)


@app.route('/beer', methods=['GET'])
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def get_beers():
    search = request.args.get('search')
    userObject = g.current_user
    user = userObject["sub"]
    if search:
        beers = mongo.db.beers.find({"user": user, "$text": {"$search": search}})
    else:
        beers = mongo.db.beers.find({"user": user})
    # TODO do we need to sort this stuff
    #  To sort the results in order of relevance score, you must explicitly
    #  project the $meta textScore field and sort on it:
    #     db.stores.find(
    #        { $text: { $search: "java coffee shop" } },
    #        { score: { $meta: "textScore" } }
    #     ).sort( { score: { $meta: "textScore" } } )
    return jsonify(list(beers))


@app.route('/beer/<string:beer_id>')
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def get_beer_by_id(beer_id):
    beer = mongo.db.beers.find_one({"_id": beer_id})
    if not beer:
        abort(400)
    return jsonify(beer)


@app.route('/beer/<string:beer_id>', methods=['DELETE'])
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def delete_beer_by_id(beer_id):
    result = mongo.db.beers.delete_one({"_id": beer_id})
    if result.deleted_count == 0:
        return bad_request(404, "Not Found")
    else:
        return "No Content", 204

@app.route('/status')
def status():
    s3 = boto3.resource('s3')
    for bucket in s3.buckets.all():
        print(bucket.name)
    return "running"

@app.route('/deleteImage', methods=['DELETE'])
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def deleteImage():
    # TODO delete the image that is posted to S3
    return ""


@app.route('/upload', methods=['POST'])
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload")
    pprint(vars(request))
    file = request.files.get('file')
    pprint(vars(file))

    filename = secure_filename(file.filename)

    s3 = boto3.resource('s3')
    s3.Object('beerjournal', filename).put(Body=file.stream)

    # filename = 'kittle.jpg'
    destination="/".join([target, filename])
    print(destination)
    pprint(file)
    file.save(destination)
    session['uploadFilePath'] = destination
    response="Whatever you wish too return"
    return response
    return "success"

