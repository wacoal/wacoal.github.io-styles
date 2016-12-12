var gulp = require('gulp');
var imagemin = require("gulp-imagemin");
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('imagemin', function() {
  gulp.src(config.path.image.src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(changed(config.path.image.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(config.path.image.dest))
    //.pipe(gulp.dest(config.path.image.copy.to));
});

gulp.task('image-copy', function() {
  gulp.src(config.path.image.copy.from)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(config.path.image.copy.to));
});
