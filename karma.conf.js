// Karma configuration
// Generated on Sun May 26 2013 02:01:55 GMT+0200 (CEST)


// base path, that will be used to resolve files and exclude
basePath = '';


// frameworks to use
frameworks = ['mocha'];


// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'components/chai/chai.js',
  'components/uri.js/src/URI.js',
  'components/uri.js/src/URITemplate.js',
  'components/q/q.js',
  'components/hyperagent/dist/hyperagent.js',
  'components/tv4/tv4.js',
  'dist/hyperagent-forms.js',
  'test/setup.js',
  'test/lib/utils.js',
  'test/fixtures/**/*.js',
  'test/spec/test-*.js'
];

// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;


// plugins to load
plugins = [
  'karma-mocha',
  'karma-chrome-launcher',
  'karma-firefox-launcher'
];
