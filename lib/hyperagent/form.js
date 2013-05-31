/*global Hyperagent */
// TODO: Figure out a way to use tv4 as AMD/ES6 module if compiled that way ...

function Form(object, options, data) {
  // Expose relevant object attributes.
  this.schema = object.schema;
  this.method = object.method;
  this.href = object.href;

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

Form.prototype.submit = function () {
  var deferred = Hyperagent._config.defer();

  Hyperagent._config.ajax({
    url: this.href,
    method: this.method,
    success: this._resolveFactory(deferred),
    error: this._rejectFactory(deferred)
  });

  return deferred.promise;
};

Form.prototype._resolveFactory = function (deferred) {
  return function (data, status, xhr) {
    deferred.resolve();
  };
};

Form.prototype._rejectFactory = function (deferred) {
  return function (xhr, status) {
    deferred.reject();
  };
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
