from flask import Flask
from flask_pymongo import PyMongo
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'beer'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/beer'

mongo = PyMongo(app)

@app.route('/')
def hello():
    beer = mongo.db.beers.find()
    return str( beer.count() )

if __name__ == '__main__':
    app.run()
