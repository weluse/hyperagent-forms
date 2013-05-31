// TODO: Figure out a way to use tv4 as AMD/ES6 module if compiled that way ...

function Form(object, options, data) {
  this.schema = object.schema;
  this.errors = {};
  this.data = data;
}

Form.prototype.validate = function () {
  if (!this.schema) {
    throw new Error('Trying to validate a form without schema.');
  }

  var result = window.tv4.validateMultiple(this.data, this.schema);
  this.errors = result.errors;
  return result.valid;
};

Form.factory = function (object, options) {
  function FormFactory(data) {
    if (!(this instanceof FormFactory)) {
      throw new Error('FormFactory should be created with `new`.');
    }

    return new Form(object, options, data);
  }

  FormFactory.schema = object.schema;
  return FormFactory;
};

export Form;
