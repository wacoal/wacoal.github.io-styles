var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', function(callback) {
  return del(config.path.clean, callback);
});
