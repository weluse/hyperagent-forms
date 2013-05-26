/*global describe, it, Hyperagent, beforeEach, fixtures, assert, _ */
(function () {
  'use strict';
  describe('Resource', function () {
    it('should still exist', function () {
      var agent = new Hyperagent.Resource('http://example.com/');
      assert(agent.fetch);
    });
  });
}());
