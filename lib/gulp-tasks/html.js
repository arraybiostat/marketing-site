var gulp = require('gulp');

var globalContext = require('../global-context.js');

var HtmlForge = require('../html-forge.js');


function developmentTask(cb) {
  // todo: lint
  var forge = new HtmlForge();
  forge.process(function(err, res) {
    if (err) {
      console.error('\n\nPlease fix your html.');
    }
    cb(null, res); // suppress error in dev mode so pipe/server can recover when file is fixed
  });
}


function productionTask(cb) {
  // todo: minify html?
  var forge = new HtmlForge();
  forge.process(cb);
}

module.exports.development = developmentTask;
module.exports.production = productionTask;
