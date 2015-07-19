var globalContext = require('./global-context.js');
var gulpSetup = require('../gulpfile.js');


function SiteBuilder(opts) {
  opts = opts || {};
  globalContext.init(opts);
}

SiteBuilder.prototype = {

  start: function() {
    gulpSetup.runGulp();
  }

};


module.exports = SiteBuilder;
