var path = require('path');
var underscore = require('underscore');

var projectName = 'arraybiostat';

global._ = underscore;

var _singleton;

function init(opts) {
  if (_singleton) {
    return;
  }
  _singleton = {};
  _singleton.site_env = _siteEnv();
  _singleton.options = opts || {};
  _singleton.isDevMode = isDevMode();
  var projectDir = path.resolve(__dirname, '../');
  var srcRelPath = './src';
  var destRelPath ='./generated/' + _singleton.site_env;

  _singleton.paths = {
    projectDir: projectDir,
    srcRelPath: srcRelPath,
    destRelPath: destRelPath,
    srcDir: path.resolve(projectDir, srcRelPath),
    destDir: path.resolve(projectDir, destRelPath)
  };

  // convenient, so meh
  global.OPTIONS = _singleton.options;
  global.isDevMode = _singleton.isDevMode;
  global.PATHS = _singleton.paths;
  global.PROJECT_NAME = projectName;

  console.log('Starting', _siteEnv(), 'build script. Paths:', JSON.stringify(_singleton.paths));
}

function getOptions() {
  return _singleton.options;
}

function _siteEnv() {
  return process.env.SITE_ENV || global.SITE_ENV || 'production';
}

function getPaths() {
  return _singleton.paths;
}

function isDevMode() {
  return _siteEnv() === 'development';
}

module.exports.getPaths = getPaths;
module.exports.init = init;
module.exports.isDevMode = isDevMode;
module.exports.getOptions = getOptions;
