import os

class Config(object):
    MONGO_DBNAME = 'beer'
    MONGO_URI = 'mongodb://localhost:27017/beer'
    SECRET_KEY = 'gqKMW24fOHBUCipfnNaydJrD7MVqRQCR'

class Auth0(object):
    AUTH0_DOMAIN = 'beerjournal.auth0.com'
    API_AUDIENCE = 'https://beerjournal.com'
    ALGORITHMS = ["RS256"]
