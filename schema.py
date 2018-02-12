beer_schema = {
    "type" : "object",
    "properties" : {
        "_id" : {"type" : "string"},
        "name" : {"type" : "string"},
        "brewer" : {"type" : "string"},
        "abv" : {"type" : "number"},
        "user" : {"type" : "string"},
        "image" : {"type" : ["string", "null"]},
        "rating" : {"type" : ["number"]},
    },
    "required": ["_id", "name", "brewer", "abv", "user"]
}

user_schema = {
    "type" : "object",
    "properties" : {
        "_id" : {"type" : "string"},
        "email" : {"type" : "string"},
        "password" : {"type" : "string"},
        "name" : {"type" : "string"},
        "token" : {"type" : "string"}
    },
    "required": ["_id", "email", "password", "name", "token"]
}

login_schema = {
    "type" : "object",
    "properties" : {
        "email" : {"type" : "string"},
        "password" : {"type" : "string"},
    },
    "required": ["email", "password"]
}
