(function () {
var define, requireModule;

(function () {
  'use strict';
  var registry = {}, seen = {};

  define = function (name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function (name) {
    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i = 0, l = deps.length; i < l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(deps[i]));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;
  };
}());

define('hyperagent-forms/delayed',
  ["exports"],
  function(__exports__) {
    "use strict";
    function DelayedResource(xhr, options, data) {
      this.xhr = xhr;
      this._options = options;

      this._data = data;
      if (!this._data && xhr && xhr.responseText) {
        this._data = xhr.responseText;
      }
    }

    DelayedResource.prototype.loadResource = function () {
      var resource = new Hyperagent.Resource(this._options);
      resource._load(this._data);

      return resource;
    };


    __exports__.DelayedResource = DelayedResource;
  });
define('hyperagent-forms/form',
  ["hyperagent-forms/delayed","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DelayedResource = __dependency1__.DelayedResource;
    /*global Hyperagent */
    // TODO: Figure out a way to use tv4 as AMD/ES6 module if compiled that way ...


    function Form(object, options, data) {
      // Expose relevant object attributes.
      this.schema = object.schema;
      this.method = object.method;
      this.href = object.href;
      this._options = options;

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
      var options = {
        url: this.href,
        type: this.method || 'get',
        success: this._resolveFactory(deferred),
        error: this._rejectFactory(deferred)
      };

      if (this.data) {
        options.data = JSON.stringify(this.data);
      }

      Hyperagent._config.ajax(options);

      return deferred.promise;
    };

    Form.prototype._resolveFactory = function (deferred) {
      return function (data, status, xhr) {
        var parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch (err) {
          // The server is not required to return valid JSON or any response at all.
        }
        var resource = new DelayedResource(xhr, this._options, parsedData);
        deferred.resolve(resource);
      }.bind(this);
    };

    Form.prototype._rejectFactory = function (deferred) {
      return function (xhr, status) {
        var resource = new DelayedResource(xhr, this._options);
        deferred.reject(resource);
      }.bind(this);
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


    __exports__.Form = Form;
  });
define('hyperagent-forms/hook',
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
define('hyperagentForms',
  ["hyperagent-forms/hook","hyperagent-forms/form","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var LoadHook = __dependency1__.LoadHook;
    var Form = __dependency2__.Form;


    __exports__.LoadHook = LoadHook;
    __exports__.Form = Form;
  });
window.HyperagentForms = requireModule('hyperagentForms');
}());