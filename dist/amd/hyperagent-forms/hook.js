define(
  ["hyperagent-forms/form","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Form = __dependency1__.Form;

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


    __exports__.LoadHook = LoadHook;
  });