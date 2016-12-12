var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('script-copy', function() {
  gulp.src(config.path.script.copy.from)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(config.path.script.copy.to));
});
