"use strict";
var Form = require("hyperagent-forms/form").Form;

function LoadHook(object) {
  var forms = object._forms;
  if (!forms) {
    this.forms = {};
  } else {
    this.forms = new Hyperagent.LazyResource(this, forms, {
      factory: Form.factory
    });
  }
}


exports.LoadHook = LoadHook;