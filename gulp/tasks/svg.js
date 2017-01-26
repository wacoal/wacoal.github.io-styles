/**
 * svgタスク
 * svgスプライトを作成する
 */
var gulp = require('gulp');
//var _ = require('lodash');

module.exports = function () {
    gulp.task('svg', function () {
    gulp.src(__CONFIG.path.svg.src)
      .pipe($.svgmin())
      .pipe($.svgstore({ inlineSvg: true }))
      .pipe($.cheerio({
        run: function ($, file) {
            $('svg').addClass('hide');
            $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.rename({
        basename:'_svg_ver2',
        extname: '.ejs'
      }))
      .pipe(gulp.dest(__CONFIG.path.svg.dest));
  });
}();
