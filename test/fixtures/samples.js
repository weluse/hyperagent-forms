if (window.fixtures === undefined) {
  window.fixtures = {};
}

window.fixtures.fullDoc = {
  "_links": {
    "self": {
      "href": "/"
    },
    "curies": [
      {
        "name": "ht",
        "href": "http://haltalk.herokuapp.com/rels/{rel}",
        "templated": true
      }
    ]
  },
  "_forms": {
    "ht:signup": {
      "href": "/signup",
      "method": "POST",
      "schema": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "description": "Create an account",
        "title": "signup",
        "required": [
          "username",
          "password"
        ],
        "type": "object",
        "properties": {
          "username": {
            "minLength": 1,
            "type": "string",
            "description": "The username you want to log in with."
          },
          "password": {
            "type": "string",
            "description": "The password you want to log in with."
          },
          "bio": {
            "type": "string",
            "description": "A short description of yourself."
          },
          "real_name": {
            "type": "string",
            "description": "The name you were born with."
          }
        }
      }
    }
  }
};

window.fixtures.response = {
  "_links": {
    "self": { href: "/response" }
  },
  "message": "Everythin's hawt."
};

window.fixtures.errorResponse = {
  "_links": {
    "self": { href: "/" }
  },
  "message": "Error"
};
