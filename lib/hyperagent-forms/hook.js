import Form from 'hyperagent-forms/form';

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
