import config from '../config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

gulp.task('templates', () => {
  gulp.src(config.path.templates.src)
    .pipe($.ejs({
        msg: "Hello Gulp!"
    }))
    .pipe($.plumber({
      errorHandler: (err) => {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe($.ejs({}, {
      ext: '.html'
    }))
    .pipe(gulp.dest(config.path.templates.dest));
});

// import config from '../config';
// import gulp from 'gulp';
// import gulpLoadPlugins from 'gulp-load-plugins';
// const $ = gulpLoadPlugins();
//
// gulp.task('templates', () => {
//   gulp.src(config.path.templates.src)
//     .pipe($.plumber({
//       errorHandler: (err) => {
//         console.log(err.messageFormatted);
//         console.log("tes");
//         this.emit('end');
//       }
//     }))
//     .pipe($.ejs({}, {
//       "ext": '.html'
//     }))
//     .pipe(gulp.dest(config.path.templates.dest));
// });
