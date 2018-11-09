'''routes'''
import json
from uuid import uuid4
from flask import jsonify, request, abort, g, session
from jsonschema import validate, ValidationError
from app import app, mongo
from schema import beer_schema, user_schema, login_schema
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

UPLOAD_FOLDER = '/Users/alexandergunning/projects/beer_journal_fullstack/backend'
def get_user(id):
    user = mongo.db.users.find_one({"_id": id})
    return User(**user)


# TODO convert all aborts to this
def bad_request(code, message):
    response = jsonify({'message': message})
    response.status_code = code
    return response


@app.route('/auth/register', methods=['POST'])
def register():
    try:
        new_user = json.loads(request.data)
    except:
        abort(400)
    new_user["_id"] = str(uuid4())
    try:
        validate(new_user, user_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
    user = User(**new_user)
    user.set_password(new_user["password"])
    user.token = generate_token()

    # Pull out the class variables
    mongo_user = vars(user)
    try:
        user_insert = mongo.db.users.insert_one(mongo_user)
    # TODO figure out more descriptive error
    except:
        return bad_request(400, "Dupliciate email")

    return jsonify(_id=mongo_user["_id"], name=mongo_user["name"], token=mongo_user["token"])


@app.route('/auth/register_jwt', methods=['POST'])
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

    # Pull out the class variables
    mongo_user = vars(user)
    try:
        user_insert = mongo.db.users.insert_one(mongo_user)
    # TODO figure out more descriptive error
    except:
        return bad_request(400, "Dupliciate email")

    return jsonify(id=mongo_user["_id"], token=generate_token_jwt(mongo_user))

@app.route("/auth/login_jwt", methods=["POST"])
def login_jwt():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    user_map = vars(user)
    if user:
        return jsonify(token=generate_token_jwt(user_map))

    return jsonify(error=True), 403

@app.route("/auth/user_jwt", methods=["GET"])
@requires_auth_jwt
def get_user_jwt():
    return jsonify(result=g.current_user)

@app.route("/auth/login", methods=["POST"])
def login():
    try:
        login = json.loads(request.data)
    except:
        abort(400)
    try:
        validate(login, login_schema)
    except ValidationError as e:
        print(e.message)
        return bad_request(400, e.message)
    user = User.get_user_with_email_and_password(login["email"], login["password"])
    if user:
        if user.token:
            token = user.token
        else:
            token = generate_token()
            mongo.db.users.update_one({"_id": user._id }, {"$set": {"token" : token}})
        return jsonify(_id=user._id, name=user.name, token=token)
    return jsonify(error=True), 403

@app.route('/auth/logout')
@requires_auth
def logout():
    remove_token(g.current_user._id)
    return "logout success"

@app.route('/auth/checkToken')
@requires_auth
def check_token():
    return jsonify(_id=g.current_user._id, name=g.current_user.name, email=g.current_user.email, token=g.current_user.token)

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
    beer["_id"] = str(uuid4())

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
        return "", 204

@app.route('/status')
def status():
    return "running"

@app.route('/do', methods=['POST'])
def do():
    return "running"

@cross_origin(headers=[])
@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload`")
    # pprint(vars(request))
    file = request.files.get('file')

    filename = secure_filename(file.filename)
    # filename = 'kittle.jpg'
    destination="/".join([target, filename])
    print(destination)
    pprint(file)
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response
    return "success"

