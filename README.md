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

## License

Licensed under MIT
