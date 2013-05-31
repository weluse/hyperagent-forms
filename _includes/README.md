# hyperagent-forms.js [![Build Status](https://secure.travis-ci.org/weluse/hyperagent-forms.png?branch=master)](https://travis-ci.org/weluse/hyperagent-forms) [![Coverage Status](https://coveralls.io/repos/weluse/hyperagent-forms/badge.png?branch=master)](https://coveralls.io/r/weluse/hyperagent-forms?branch=master)

hyperagent-forms is a plugin for [hyperagent.js](http://weluse.github.io/hyperagent)
adding support for a custom, unofficial form profile to HAL.

## Installation

Download with bower or alternatively
[install manually](http://weluse.github.io/hyperagent-forms/install/).

```bash
bower install hyperagent-forms
```

## Usage

Just configure hyperagent.js to run the plugin's load hook when a resource is
loaded:

```javascript
Hyperagent.configure('loadHooks', [HyperagentForms.LoadHook]);
```

## Dependencies

There is *optional* support for [JSON Schema v4] validation through the Tiny
Validator for JSON Schema v4 [tv4]. You only need to load it if you want to use
`validate`, though.

  [JSON Schema]: http://json-schema.org/
  [tv4]: https://github.com/geraintluff/tv4

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
}
```

### Forms

Forms are available as `forms` attribute on your Hyperagent Resource.

```javascript
var api = Hyperagent.Resource('https://api-rw.example.com/');
api.fetch().then(function () {
  var signup = new api.forms['ht:signup']({ username: 'mkelly' });
  signup.data.username = 'overwrite';

  if (signup.validate()) {
    signup.submit();
  } else {
    console.error(signup.errors);
  }
});
```

Submitting this formular with the data `{ username: 'mkelly', password:
'ilikehal' }` would cause an HTTP request similar to this to be sent:

```http
POST /signup HTTP/1.1
Host: api-rw.example.com
...
Content-Type: application/json
Content-Size: xxx

{
  "username": "mkelly",
  "password": "ilikehal"
}
```

## API

### Resource#forms

When the plugin is loaded, a `forms` attribute is added to every loaded Resource
instance and represents the form objects under the `_forms` key of the document.
Forms are lazily constructed and can be accessed via name, CURIE or expanded URL.

```javascript
assert.equal(api.forms['ht:signup'], api.forms['http://haltalk.herokuapp.com/rels/signup']);
```

The return value is a constructor for a `Form` class and also exposes a `schema`
attribute that contains the raw JSON schema that can be accessed without
instantiating the object.

```javascript
buildFormFor(api.forms['ht:signup'].schema);
```

### Form([data])

The constructor of `Forms` takes an an object containing the form values
specified by the schema.

```javascript
var form = new api.forms['ht:signup']({ username: 'passy', password: 'unicorns' });
```

The form can also be constructed without passing in data:

```javascript
var form = new api.forms['delete']();
```

### Form#data

The data passed into the constructor can be altered at any point through the
`data` attribute:

```javascript
var form = new api.forms['ht:signup']({ password: 'popsicles' });
form.data.username = 'newuser';
console.log(form.data.password);  // "popsicles"
```

### Form#schema / Form.schema

If the form has a JSON schema, it can be accessed through the object or the
class. This can be used to generate user interfaces based on the required
inputs or own validations.


### Form#submit()

Submits the data to the specified `href`. The `data` will be stringified as JSON
and is passed as request body. The return value is a promise that contains a
`DelayedResource` object both when resolved and rejected:

```javascript
form.submit().then(function (result) {
  console.log('Status Code: ', result.xhr.statusCode);
  console.log('User name: ', result.loadResource().props.username);
}, function (error) {
  console.warn('Status Code: ', result.xhr.statusCode);
  console.warn('Error Message: ', result.loadResource().props.error);
});
```

### DelayedResource

A delayed resource is wrapped in a promise returned from `submit` operation. It
always contains the underlying XMLHttpRequest object as `xhr` attribute and has
a `loadResource()` message that *can* be used to interpret the response text as
HAL document.

## License

Licensed under MIT
