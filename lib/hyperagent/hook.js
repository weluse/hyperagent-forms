function FormAccessor() {
}

function LoadHook(object) {
  this.forms = new FormAccessor(object);
}

export LoadHook;
