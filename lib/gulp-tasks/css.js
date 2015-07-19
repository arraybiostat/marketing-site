var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var merge = require('merge-stream');

var globalContext = require('../global-context.js');
var includePaths = [
  './src/assets/stylesheets',
  './src/assets/preload/tboot/stylesheets'
];

function developmentTask() {
  var sassFailed = function(err) {
    console.error('\n\nSASS FAILED TO COMPILE:', err.message, err.stack);
    return err;
  };
  var sassConfig = {
    outputStyle: 'expanded',
    sourceMapContents: true,
    includePaths: includePaths
  };

  var assets = gulp.src('./src/assets/**/*.scss', { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig).on('error', notify.onError(sassFailed)));

  var mixins = gulp.src('./src/partials/**/*.scss', { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig).on('error', notify.onError(sassFailed)));

  var pages = gulp.src('./src/pages/**/*.scss', { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig).on('error', notify.onError(sassFailed)));

  return merge(assets, mixins, pages)// sourcemaps was getting confused by multiple directories in gulp.src
    .pipe(concat(PROJECT_NAME + '.css'))
    .pipe(sourcemaps.write({ addComment: true, includeContent: true }))
    .pipe(gulp.dest(PATHS.destDir + '/css'));
}


function productionTask() {
  return gulp.src([ './src/assets/**/*.scss', './src/partials/**/*.scss', './src/pages/**/*.scss'  ], { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(sass(_.extend({
      outputStyle: 'compressed',
      includePaths: includePaths
    })))
    .pipe(concat(PROJECT_NAME + '.css'))
    .pipe(gulp.dest(PATHS.destDir + '/css'));
}

module.exports.development = developmentTask;
module.exports.production = productionTask;
