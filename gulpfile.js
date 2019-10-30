'use strict';
var argv         = require('minimist')(process.argv.slice(2))
  , gulp         = require('gulp')
  , cache        = require('gulp-cache')
  , watch        = require('gulp-watch')
  , gutil        = require('gulp-util')
  , gulpif       = require('gulp-if')
  , gulpifelse   = require('gulp-if-else')
  , sass         = require('gulp-sass')
  , livereload   = require('gulp-livereload')
  , prefix       = require('gulp-autoprefixer')
  , minifyCss    = require('gulp-minify-css')
  , minifyHtml   = require('gulp-minify-html')
  , imagemin     = require('gulp-imagemin')
  , uglify       = require('gulp-uglify')
  , useref       = require('gulp-useref')
  , filter       = require('gulp-filter')
  , concat       = require('gulp-concat')
  , defineModule = require('gulp-define-module')
  , declare      = require('gulp-declare')
  , handlebars   = require('gulp-handlebars')
  , del          = require('del')
  , express      = require('express')
  , path         = require('path')
  , opn          = require('opn')
  , info         = require('./package.json');

// Configuration

var Config = {
  port: 8080,
  livereload_port: 35729,
  cache: (typeof argv.cache !== 'undefined' ? !!argv.cache : false),
  imagemin: {
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  },
  paths: {
    app:   {
      root:   './src',
      js:     './src/dev/js',
      scss:   './src/dev/scss',
      css:    './src/dev/css',
      images: './src/dev/images',
      fonts:  './src/dev/fonts',
      lib:    './src/dev/lib',
      tmpl:   './src/dev/tmpl',
      extra: [
        //'app/foo/**/*',
        //'app/bar/**/*'
      ]
    },
    build: {
      root:   './src',
      js:     './src/assets/js',
      css:    './src/assets/css',
      lib:    './src/assets/lib',
      images: './src/assets/images',
      extra: [
        //'public/foo/',
        //'public/bar/'
      ]
    }
  }
}

// Tasks
// =====

// Styles
gulp.task('styles', function(){
  return gulp.src(Config.paths.app.scss + '/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(prefix('last 2 version', '> 5%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(Config.paths.build.css));
});

// Fonts
gulp.task('fonts:clean', function(next){
  del(Config.paths.build.fonts + '/**', next);
});
gulp.task('fonts', ['fonts:clean'], function(){
  return gulp.src(Config.paths.app.fonts + '/**/*')
    .pipe(gulp.dest(Config.paths.build.fonts + '/'));
});

// Images
gulp.task('images:clean', function(next){
  del(Config.paths.build.images + '/**', next);
});
gulp.task('images', function(){
  return gulp.src(Config.paths.app.images + '/**/*')
    .pipe(gulpifelse(
      Config.cache, function(){
        return cache(imagemin(Config.imagemin)) // if
      }, function(){
        return imagemin(Config.imagemin) // else
      }
    ))
    .pipe(gulp.dest(Config.paths.build.images + '/'));
});

// Templates
gulp.task('templates', function(){
  return gulp.src(Config.paths.app.tmpl + '/**/*')
    .pipe(handlebars())
    .pipe(defineModule('plain'))
    .pipe(declare({
      namespace: 'tmpl'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(Config.paths.app.js + '/'));
});


// Extra folders
gulp.task('extra:clean', function(next){
  if(!Config.paths.build.extra.length) {
    return;
  }
  del(Config.paths.build.extra + '/**', next);
})
gulp.task('extra', ['extra:clean'], function(){
  if(!Config.paths.app.extra.length || !Config.paths.build.extra.length || Config.paths.app.extra.length != Config.paths.build.extra.length) {
    return;
  }
  for(var dir in Config.paths.app.extra) {
    gulp.src(Config.paths.app.extra[dir])
      .pipe(gulp.dest(Config.paths.build.extra[dir]));
  }
});

// Server
gulp.task('server', function(){
  var server = express()
    .use(express.static(path.resolve(Config.paths.app.root)))
    .listen(Config.port);
  gutil.log('Server listening on port ' + Config.port);
});

// LiveReload
gulp.task('livereload', function(){
  livereload.listen(Config.livereload_port, function(err) {
    if(err) gutil.log('Livereload error:', err);
  })
});
var exec = require('child_process').exec;
// Watches
gulp.task('watch', function(){
  watch(Config.paths.app.scss + '/**/*.scss', function(){
    gulp.start('styles');
  });
  watch(Config.paths.app.tmpl + '/**/*.hbs', function(){
    gulp.start('templates');
  });
  gulp.watch([
    Config.paths.app.images + '/**/*.png',
    Config.paths.app.images + '/**/*.jpg',
    Config.paths.app.images + '/**/*.jpeg',
    Config.paths.app.images + '/**/*.gif',
    Config.paths.app.css + '/**/*.css',
    Config.paths.app.js + '/**/*.js',
  ], function(evt){
    livereload.changed(evt.path);
  });
  // exec('ng serve', function (err, stdout, stderr) {
  //   console.log(stdout);
  //   console.log(stderr);
  // });
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('clean', ['fonts:clean', 'images:clean', 'extra:clean']);
gulp.task('build', ['templates', 'styles', 'fonts', 'extra', 'images']);
gulp.task('default', ['server', 'livereload', 'templates', 'styles', 'watch'], function(){
  if(argv.o) opn('http://localhost:' + Config.port);
});