function DelayedResource(options, data) {
  this._data = data;
  this._options = options;
}

DelayedResource.prototype.load = function () {
  var resource = new Hyperagent.Resource(this._options);
  resource._load(this._data);

  return resource;
};

export DelayedResource;
