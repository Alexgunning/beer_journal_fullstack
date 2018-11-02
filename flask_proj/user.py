'''routes'''
from werkzeug.security import generate_password_hash, check_password_hash
import json
from uuid import uuid4
from flask import Flask, jsonify, request, abort, send_from_directory
from flask_pymongo import PyMongo
from app import app, mongo

class User():
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

    @staticmethod
    def get_user_by_email(email):
        user_mongo = mongo.db.users.find_one({"email": email})
        try:
           user = User(**user_mongo)
           return user
        except:
            return None

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.get_user_by_email(email)
        if user and user.check_password(password):
            return user
        else:
            return None

