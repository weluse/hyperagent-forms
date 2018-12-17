/*global describe, it, Hyperagent, assert */

(function () {
  'use strict';
  describe('Resource', function () {
    it('should expose an empty forms attribute', function () {
      var agent = new Hyperagent.Resource('http://example.com/');
      agent._load({
        _links: {
          self: { href: 'http://example.com' }
        }
      });

      assert.deepEqual(agent.forms, {});
    });

    it('should expose forms', function () {
      var agent = new Hyperagent.Resource('http://example.com/');
      agent._load({
        _links: {
          self: { href: 'http://example.com' }
        },
        _forms: {
          create: {
            method: 'POST',
            href: '/'
          }
        }
      });

      assert.property(agent.forms, 'create');
      assert.equal(agent.forms.create.props.method, 'POST');
    });

    it('should absolutize form hrefs', function () {
      var agent = new Hyperagent.Resource('http://example.com/');
      agent._load({
        _links: {
          self: { href: 'http://example.com' }
        },
        _forms: {
          create: {
            method: 'POST',
            href: '/create'
          }
        }
      });

      assert.property(agent.forms, 'create');
      var form = new agent.forms.create();
      assert.equal(form._options.url, 'http://example.com/create');
    });
  });
}());
