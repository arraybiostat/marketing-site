var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var globalContext = require('../global-context.js');

var src = [
  './src/assets/preload/**/*.js',
  './src/assets/javascripts/**/*.js',
  './src/pages/**/*.js'
];

function developmentTask() {
  return gulp.src(src, { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(sourcemaps.init())
    .pipe(concat(PROJECT_NAME + '.js', { sourcesContent: true }))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(PATHS.destDir + '/js'));
}


function productionTask() {
  return gulp.src(src, { cwd: globalContext.getPaths().projectDir, base: './src' })
    .pipe(concat(PROJECT_NAME + '.js', { sourcesContent: true }))
    .pipe(uglify({ mangle: false }))  // todo: use jsbundle instead
    .pipe(gulp.dest(PATHS.destDir + '/js'));
}


module.exports.development = developmentTask;
module.exports.production = productionTask;
