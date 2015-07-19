var gulp = require('gulp');
var ignore = require('gulp-ignore');

var globalContext = require('../global-context.js');


function developmentTask() {
  return productionTask();
}


function productionTask() {
  var destDir = globalContext.getPaths().destDir;
  return gulp.src([ './src/**/*.*' ], { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(ignore.exclude([ '**/*.scss', '**/*.js', '**/*.jade' ]))
    .pipe(gulp.dest(destDir + '/'));
}

module.exports.development = developmentTask;
module.exports.production = productionTask;
