/*global describe, it, HyperagentForms, assert */

(function () {
  'use strict';
  describe('Form', function () {
    it('should be constructed', function () {
      var form = new HyperagentForms.Form({});
      assert.isNotNull(form);
    });

    it('should pass data to its attribute', function () {
      var form = new HyperagentForms.Form({}, {}, { myData: true });
      assert.isTrue(form.data.myData);
      assert.isUndefined(form.data.myOtherData);
    });

    it('should throw on validation without schema', function () {
      var form = new HyperagentForms.Form({});
      assert.throws(form.validate.bind(form), /without schema/);
    });

    describe('Factory', function () {
      it('fail if not instantiated with new', function () {
        var Form = new HyperagentForms.Form.factory({});
        assert.throws(function () { Form() }, /should be created with `new`/);
      });

      it('should pass data to its attribute', function () {
        var Form = new HyperagentForms.Form.factory({});
        var form = new Form({ myData: true });
        assert.isTrue(form.data.myData);
        assert.isUndefined(form.data.myOtherData);
      });
    });
  });
}());

