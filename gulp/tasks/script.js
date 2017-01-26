import config from '../config';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

gulp.task('script', () => {
  gulp.src(config.path.script.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.path.script.dest));
});

// gulp.task('script-copy', () => {
//   gulp.src(config.path.script.copy.from)
//     .pipe($.plumber({
//       errorHandler: (err) => {
//         console.log(err.messageFormatted);
//         this.emit('end');
//       }
//     }))
//     .pipe(gulp.dest(config.path.script.copy.to));
// });
