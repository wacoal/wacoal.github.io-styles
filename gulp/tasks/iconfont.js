var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('iconfont', function() {
  gulp.src(config.path.iconfont.src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(iconfont({
      fontName: 'gg-fonts',
      startCodepoint: 0xf101
    }))
    .pipe(gulp.dest(config.path.iconfont.dest))
    //.pipe(gulp.dest(config.path.iconfont.copy.to));
});

gulp.task('font-copy', function() {
  gulp.src(config.path.iconfont.copy.from)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(config.path.iconfont.copy.to));
});
