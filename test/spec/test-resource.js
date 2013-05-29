/*global describe, it, Hyperagent, beforeEach, fixtures, assert, _ */
(function () {
  'use strict';
  describe('Resource', function () {
    it('should expose a forms attribute', function () {
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
    });
  });
}());
