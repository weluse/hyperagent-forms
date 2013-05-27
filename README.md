# hyperagent.js [![Build Status](https://secure.travis-ci.org/weluse/hyperagent-forms.png?branch=master)](https://travis-ci.org/weluse/hyperagent-forms) [![Coverage Status](https://coveralls.io/repos/weluse/hyperagent-forms/badge.png?branch=master)](https://coveralls.io/r/weluse/hyperagent?branch=master)

hyperagent-forms is a plugin for [hyperagent.js](http://weluse.github.io/hyperagent)
adding support for a custom, unofficial form profile to HAL.

## Installation

Download with bower or alternatively
[install manually](http://weluse.github.io/hyperagent-forms/install/).

```bash
bower install hyperagent-forms
```

## Dependencies

I haven't settled for a JSON Schema implementation yet. Might become one of these:

- https://github.com/geraintluff/tv4
- https://github.com/natesilva/jayschema
- https://github.com/akidee/schema.js
- https://github.com/kriszyp/json-schema

## Spec

There is no official support for write access in HAL at this time, but [several
discussions](https://groups.google.com/forum/#!topic/hal-discuss/mi7qwK18gfw)
have been had around this topic. This library implements a custom schema, based
on what has been proposed in those discussions.

## Example

The following JSON response represents the entry point of
https://rw-api.example.com and shall serve as an example for using hyperclient.

```json
{
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
      "href": "/signup"
      "method": "POST",
      "schema": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "description": "Create an account",
        "title": "signup",
        "required": [
          "username",
          "password
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
}
```

### Forms

Forms are available as `forms` attribute on your Hyperagent Resource.

```javascript
var api = Hyperagent.Resource('https://api-rw.example.com/');
api.fetch().then(function () {
  api.forms['ht:submit'];
  // What now? :)
});
```

## License

Licensed under MIT
