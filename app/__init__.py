from flask import Flask
from config import Config
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_login import LoginManager
from flask import Flask

app = Flask(__name__)
login = LoginManager(app)
login.init_app(app)
# login.login_view = 'login'
CORS(app)
app.config.from_object(Config)

mongo = PyMongo(app)

from app import routes
