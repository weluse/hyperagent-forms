import Form from 'hyperagent/form';

function FormAccessor(forms) {
  Object.keys(forms || {}).forEach(function (form) {


  }.bind(this));
}

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

export LoadHook;
