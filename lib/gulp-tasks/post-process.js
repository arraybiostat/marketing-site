var gulp = require('gulp');
var rev = require("gulp-rev");
var replace = require('gulp-replace');
var gzip = require('gulp-gzip');
var fs = require('fs-extra');
var async = require('async');
var path = require('path');
var http = require('http');
var StaticServer = require('node-static').Server;

var globalContext = require('../global-context.js');

gulp.task('dev:watch', function(cb) {
  var assetSources = _([ 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg' ]).map(function(ext ) {
    return './src/**/*.' + ext;
  });

  gulp.watch('./src/**/*.scss', [ 'css' ]);
  gulp.watch('./src/**/*.js', [ 'js' ]);
  gulp.watch('./src/**/*.jade', [ 'html']);
  gulp.watch(assetSources, [ 'assets' ]);
  cb();
});

gulp.task('dev:server', function(cb) {
  var destDir = PATHS.destDir;
  var staticServer = new StaticServer(destDir, { cache: false });
  var opts = globalContext.getOptions();
  var port = opts.port || 8080;
  var host = opts.host || 'localhost';

  var server = http.createServer(function(request, response) {
    request.addListener('end', function() {

      staticServer.serve(request, response, function(err, res) {
        if (err) {
          console.error('File error for', request.url, err);
          response.writeHead(err.status, err.headers);
          response.end("Not found");
        }
      });

    }).resume();

  }).listen(port, host);

  var loc = host + ':' + port;

  server.on('error', function(err) {
    if (err.code == 'EADDRINUSE') {
      console.error('Address', loc, 'already in use'); // todo: perhaps kill other process first
    } else {
      console.error('\n\n\n\n\n========================================', err, err.stack)
    }
  });
  server.on('exit', function(err) { // todo: verify
    cb(err);
  });

  console.log('Serving', destDir, 'at', 'http://' + loc);
});


gulp.task('post:rev_hash', [ 'css', 'js', 'html' ], function() {
  var destRelPath = PATHS.destRelPath;
  return gulp.src([ '**/*.css', '**/*.js' ], { cwd: PATHS.destDir, base: './' })
    .pipe(rev())
    .pipe(gulp.dest('./')) // this path system is so annoying. It seems to be applied relative to the path that rev returns
    .pipe(rev.manifest())
    .pipe(gulp.dest(destRelPath + '/.working'));
});


gulp.task('post:rev_html_tags', [ 'post:rev_hash' ], function() {
  console.log('Updating html with versioned asset file names..');
  var manifest = JSON.parse(fs.readFileSync(path.resolve(PATHS.destDir, './.working/rev-manifest.json'), { encoding: 'utf8' }));
  // eg: { "generated/production/css/arraybiostat.css": "generated/production/css/arraybiostat-2757dfe6ee.css",
  //       "generated/production/js/arraybiostat.js": "generated/production/js/arraybiostat-654dc85b2b.js" }
  var destRelPath = PATHS.destRelPath;
  var pathPrefix = destRelPath.indexOf('./') === 0 ? destRelPath.substring(2) : destRelPath;
  var stream = gulp.src([ '**/*.html' ], { cwd: PATHS.destDir, base: './' });
  // NOTE: using stupid string replacement as placeholder. TODO: use true html parser
  _(manifest).each(function(hashed, orig) {
    var origLoc = orig.replace(pathPrefix, '');
    var hashedLoc = hashed.replace(pathPrefix, '');
    console.log('Doing simple string replacement of original path', origLoc, 'with', hashedLoc, 'in all html files.');
    stream = stream.pipe(replace(origLoc, hashedLoc))
  });
  return stream.pipe(gulp.dest('./'));
});


gulp.task('post:rev_cleanup', [ 'post:rev_html_tags' ], function(cb){
  var manifestPath = path.resolve(PATHS.destDir, './.working/rev-manifest.json');
  var manifest = fs.readFileSync(manifestPath, { encoding: 'utf8' });
  var origPaths = Object.keys(JSON.parse(manifest));
  fs.unlinkSync(manifestPath);
  console.log('Removing unversioned assets:', JSON.stringify(origPaths), 'and gulp-rev manifest file', manifestPath);
  async.each(origPaths, function(origRelPath, done) {
    var loc = path.resolve(PATHS.projectDir, origRelPath);
    if (loc.indexOf(PATHS.destDir) > -1) {
      fs.unlink(origRelPath, done);
    } else {
      cb('Could not find unversioned file to clean up');
    }
  }, cb);
});


gulp.task('post:gzip', [ 'post:revision_assets' ], function() {
  console.log('Creating gzip version of all css, js, and html files');
  return gulp.src([ '**/*.css', '**/*.js', '**/*.html' ], { cwd: PATHS.destDir, base: './' })
    .pipe(gzip({
      append: true,
      gzipOptions: { level: 6 }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('post:revision_assets', [ 'post:rev_hash', 'post:rev_html_tags', 'post:rev_cleanup' ]);

gulp.task('production:post_process', [ 'post:revision_assets', 'post:gzip' ]);



module.exports.development = [ 'dev:server', 'dev:watch' ];
module.exports.production = [ 'production:post_process' ];
