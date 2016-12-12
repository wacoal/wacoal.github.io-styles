var gulp = require('gulp');
var sass = require('gulp-sass');
// var autoprefixer = require("gulp-autoprefixer");
var minifyCss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('style', function() {
  gulp.src(config.path.style.src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass({sourceComments: 'normal'}))
    // .pipe(autoprefixer({browsers: ['last 2 version', 'ie 8', 'ie 9']}))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.path.style.dest))
    //.pipe(gulp.dest(config.path.style.copy.to));
});

gulp.task('style-copy', function() {
  gulp.src(config.path.style.copy.from)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(config.path.style.copy.to));
});
