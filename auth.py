from functools import wraps
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from secrets import token_hex
from app import app, mongo
from user import User


# TWO_WEEKS = 1209600


# def generate_token(user, expiration=TWO_WEEKS):
#     s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
#     print(user)
#     token = s.dumps({
#         '_id': user['_id'],
#         'email': user['email']
#     }).decode('utf-8')
#     return token

def generate_token():
    return token_hex(32)

def verify_token(token):
    user_mongo = mongo.db.users.find_one({"token": token})
    try:
        user = User(**user_mongo)
    except :
        return None
    return user


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
