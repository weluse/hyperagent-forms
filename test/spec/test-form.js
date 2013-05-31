/*global describe, it, HyperagentForms, assert */

(function () {
  'use strict';
  describe('Form', function () {
    it('should be constructed', function () {
      var form = new HyperagentForms.Form({});
      assert.isNotNull(form);
    });

    describe('Factory', function () {
      it('fail if not instantiated with new', function () {
        var Form = new HyperagentForms.Form.factory({});
        assert.throws(function () { Form() }, /should be created with `new`/);
      });
    });
  });
}());

