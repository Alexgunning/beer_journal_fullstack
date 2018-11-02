from functools import wraps
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from secrets import token_hex
from app import app, mongo
from user import User

def generate_token():
    return token_hex(32)

def verify_token(token):
    user_mongo = mongo.db.users.find_one({"token": token})
    try:
        user = User(**user_mongo)
    except :
        return None
    return user

def remove_token(user_id):
    mongo.db.users.update_one({"_id": user_id }, {"$set": {"token" : None}})


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            user = verify_token(token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return jsonify(message="Authentication is required to access this resource"), 401

    return decorated
