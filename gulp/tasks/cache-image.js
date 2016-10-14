var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../config');

function cacheImageCopy() {
  gulp.src(config.path.cacheImage.copy.from)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(config.path.cacheImage.copy.to));
};

gulp.task('cache-image-copy', cacheImageCopy);
