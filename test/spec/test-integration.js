/*global describe, it, Hyperagent, beforeEach, fixtures, assert */

(function () {
  'use strict';

  describe('Resource Integration', function () {
    beforeEach(function () {
      this.ajaxCalls = [];
      this.ajaxResponses = [];

      var ajaxMock = function (options) {
        this.ajaxCalls.push(options);

        window.setZeroTimeout(function () {
          var response = this.ajaxResponses.pop();
          if (!Array.isArray(response)) {
            response = [response];
          }

          // jQuery success/error give a string as second parameter that
          // indicates failure or success, even though the remaining parameters
          // diverge.
          if (response[1] && response[1] !== 'success') {
            options.error.call(null, response);
          } else {
            options.success.call(null, response);
          }

        }.bind(this));
      }.bind(this);

      Hyperagent.configure('ajax', ajaxMock);

      this.agent = new Hyperagent.Resource('http://example.com/');
    });

    it('should expose the forms attribute', function (done) {
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        assert.property(api, 'forms');
        assert.lengthOf(this.ajaxCalls, 1);
      }.bind(this)).then(done, done);
    });

    it('should expose the form\'s JSON schema', function (done) {
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup();

        assert.isDefined(form.schema);
        assert.equal(form.schema, api.forms.signup.schema,
          'Schema should be accessible through both class and instance');
      }.bind(this)).then(done, done);
    });

    it('should reject invalid inputs', function (done) {
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({ username: 'justaname' });
        assert.isFalse(form.validate());
        assert.lengthOf(form.errors, 1);
        assert.match(form.errors[0].message, /required property: password/);
      }).then(done, done);
    });

    it('should accept valid inputs', function (done) {
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({
          username: 'passy',
          password: 'unicorn'
        });

        assert.isTrue(form.validate());
        assert.lengthOf(form.errors, 0);
      }).then(done, done);
    });

    it('should allow late setting of inputs', function (done) {
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({
          username: 'passy'
        });

        form.data.password = 'popsicles';

        assert.isTrue(form.validate());
      }).then(done, done);
    });

    it('should issue a POST request on submit', function (done) {
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({
          username: 'passy',
          password: 'unicorn'
        });

        form.submit();
        assert.lengthOf(this.ajaxCalls, 2);
        assert.equal(this.ajaxCalls[1].method, 'POST');
      }.bind(this)).then(done, done);
    });

    it('should provide a lazy resource object', function (done) {
      var fakeXHR = {
        statusCode: 201,
        statusText: 'Created'
      };

      this.ajaxResponses.push([JSON.stringify(fixtures.response), 'success',
        fakeXHR]);
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({
          username: 'passy',
          password: 'unicorn'
        });

        form.submit().then(function (xhr, lazyResource) {
          var resource = lazyResource.load();
          assert.equal(xhr.statusCode, 201);
          assert.equal(resource.props.message, 'Everythin\'s hawt.');
        });
      }).then(done, done);
    });

    it('should provide the same API on errors', function (done) {
      var fakeXHR = {
        statusCode: 418,
        statusText: 'I\'m a teapot',
        responseText: fixtures.errorResponse
      };

      this.ajaxResponses.push([fakeXHR, 'error']);
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({
          username: 'passy',
          password: 'unicorn'
        });

        form.submit().then(function (xhr, lazyResource) {
          var resource = lazyResource.load();
          assert.equal(xhr.statusCode, 418);
          assert.equal(resource.props.message, 'Error');
        });
      }).then(done, done);
    });

    it('should work without proper responses', function (done) {
      var fakeXHR = {
        statusCode: 204,
        statusText: 'No content',
      };

      this.ajaxResponses.push(['', 'success', fakeXHR]);
      this.ajaxResponses.push(JSON.stringify(fixtures.fullDoc));
      this.agent.fetch().then(function (api) {
        var form = new api.forms.signup({
          username: 'passy',
          password: 'unicorn'
        });

        form.submit().then(function (xhr) {
          assert.equal(xhr.statusCode, 204);
        });
      }).then(done, done);
    });
  });
}());
