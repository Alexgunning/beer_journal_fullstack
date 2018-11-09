from flask import Flask
from config import Config
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask import Flask

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)
app.config.from_object(Config)

mongo = PyMongo(app)

from app import routes
