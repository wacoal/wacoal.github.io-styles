var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var config = require('../config');

gulp.task('browser-sync', function() {
  browserSync.init(config.browserSync);
});

gulp.task('watch', function() {
  gulp.watch(config.path.style.watch, ['style']);
  gulp.watch(config.path.image.watch, ['imagemin']);
  //gulp.watch(config.path.iconfont.watch, ['iconfont']);
  gulp.watch(config.path.templates.watch, ['templates']);
});

gulp.task('default', function(callback) {
  return runSequence(
    //['style-copy', 'image-copy', 'cache-image-copy', 'font-copy', 'html-copy'],
    ['browser-sync', 'watch'],
    callback
  );
});
