var gulp = require('gulp');
var del = require('del');
var debug = require('gulp-debug'); // eg: .pipe(debug({ title: 'myInspection:', minimal: false }))
//var through = require('through2'); // neat

var globalContext = require('./lib/global-context.js');
var cssTasks = require('./lib/gulp-tasks/css.js');
var jsTasks = require('./lib/gulp-tasks/javascript.js');
var htmlTasks = require('./lib/gulp-tasks/html.js');
var assetsTasks = require('./lib/gulp-tasks/assets.js');
var postProcessTasks = require('./lib/gulp-tasks/post-process.js');


gulp.task('init:env', function(cb) {
  globalContext.init();
  cb();
});

gulp.task('css', _byEnv(cssTasks));
gulp.task('js', _byEnv(jsTasks));
gulp.task('html', _byEnv(htmlTasks));
gulp.task('assets', _byEnv(assetsTasks));
gulp.task('post_process', _byEnv(postProcessTasks));

gulp.task('default', [ 'init:env', 'clean', 'css', 'js', 'html', 'assets', 'post_process' ]);

function runGulp() {
  gulp.start('default');
}


gulp.task('clean', function() { // note: do not pass in cb, that makes the task async
  var destDir = PATHS.destDir + '/**';
  if (destDir && destDir.length > 10 && destDir.indexOf('generated') > -1) {
    del.sync(destDir, { force: true });
  } else {
    throw new Error('Destination not configured correctly');
  }
});

gulp.task('_finished', function(cb) {
  if (_buildFinishedCallback) {
    setImmediate(_buildFinishedCallback);
  }
  cb();
});


function _byEnv(mod) {
  if (globalContext.isDevMode()) {
    return mod.development;
  } else {
    return mod.production;
  }
}


module.exports.runGulp = runGulp;
