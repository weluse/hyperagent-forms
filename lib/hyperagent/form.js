function Form(object, options) {
  this.schema = object.schema;
}

Form.factory = function (object, options) {
  function FormFactory() {
    if (!(this instanceof FormFactory)) {
      throw new Error('FormFactory should be created with `new`.');
    }

    return new Form(object, options);
  }

  FormFactory.schema = object.schema;
  return FormFactory;
};

export Form;
