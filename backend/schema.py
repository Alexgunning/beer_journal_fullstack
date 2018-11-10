beer_schema = {
    "type" : "object",
    "properties" : {
        "_id" : {"type" : "string"},
        "name" : {"type" : "string"},
        "brewer" : {"type" : "string"},
        "abv" : {"type" : "number"},
        "user" : {"type" : "string"},
        "rating" : {"type" : ["number"]},
    },
    "required": ["_id", "name", "brewer", "abv", "user"]
}

