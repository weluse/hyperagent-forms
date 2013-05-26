# Installing hyperagent-forms

## Bower

Make sure you have bower installed or install it via `npm install -g bower`.

```bash
bower install --save hyperagent-forms
```

## Old School

  * [Download Hyperagent v0.1.0 Tarball](https://github.com/weluse/hyperagent/archive/v0.1.0.tar.gz)
  * [Download Hyperagent-Forms v0.1.0 Tarball](https://github.com/weluse/hyperagent-forms/archive/v0.1.0.tar.gz)
  * [Download jQuery](http://jquery.com/)
  * [Download q](http://documentup.com/kriskowal/q/)
  * [Download URI.js](http://medialize.github.io/URI.js/)

## Integration


```html
<script src="components/uri.js/src/URI.js"></script>
<script src="components/uri.js/src/URITemplate.js"></script>
<script src="components/q/q.js"></script>
<script src="components/hyperagent/dist/hyperagent.js"></script>
<script src="components/hyperagent-forms/dist/hyperagent-forms.js"></script>

<script>
  Hyperagent.configure('loadHooks', [HyperagentForms.loadHook]);
  var api = new Hyperagent.Resource('https://example.com/');
</script>
```
