var gulp = require('gulp');
var ejs = require('gulp-ejs');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('templates', function() {
  gulp.src(config.path.templates.src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(config.path.templates.dest));
});

gulp.task('html-copy', function() {
  gulp.src(config.path.templates.src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(config.path.templates.dest));
});
