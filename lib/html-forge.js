var Metalsmith = require('metalsmith');
var jade = require('metalsmith-jade');
var permalinks = require('metalsmith-permalinks');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var moveUp = require('metalsmith-move-up')
var ignore = require('metalsmith-ignore');


var globalContext = require('./global-context.js');


function HtmlForge() {
  this._options = globalContext.getOptions();
  this._metalsmith = Metalsmith(__dirname + '/..');
}

HtmlForge.prototype = {

  process: function(cb) {
    this._setupPipeline();
    if (isDevMode) {
      this._setupDevMode();
    } else {
      this._setupProductionMode();
    }

    this._metalsmith.
      destination(PATHS.destDir).
      build(function(err, files) {
        if (err) {
          console.error('FAILED! Error compiling site:', err, err.stack);
        } else {
          console.log('Generated html at:', PATHS.destDir);
        }
        cb && cb(err, { files: files, dest: PATHS.destDir });
      });
    // todo: lint
  },

  _setupPipeline: function() {
    this._metalsmith
      .source('src/pages')
      .clean(false) // handled by gulp task
      .use(ignore([ '**/_*.jade', '**/*.scss', '**/*.css', '**/*.js', '**/.*', '**/*.bak*' ])) // note: sass and js handled by Gulp
      .use(markdown())
      .use(jade({
        useMetadata: true
      }))
      //.use(moveUp({ // perhaps restore if site gets more complicated
      //  pattern: [ 'homepage/**' ],
      //  by: 1
      //}))
      .use(permalinks({
        pattern: ':collection/:page'
      }));
  },

  _setupDevMode: function() {
  },

  _setupProductionMode: function() {
    // todo: gzip
  }

};

module.exports = HtmlForge;



