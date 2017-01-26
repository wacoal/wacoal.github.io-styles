module.exports = {
  path: {
    //view: 'views/**/*.blade.php',
    style: {
      watch: 'assets/sass/**/*.scss',
      src: 'assets/sass/**/*.scss',
      dest: 'wacoal.github.io/common/css',
      copy: {
        from: 'wacoal.github.io/common/css/**/*.css',
        to: 'common/css'
      }
    },
    script: {
      watch: 'js',
      dest: 'js',
      copy: {
        from: 'js/**/*',
        to: 'sample/js'
      }
    },
    image: {
      watch: 'assets/img/**/*.+(jpg|jpeg|png|gif|svg)',
      src: 'assets/img/**/*.+(jpg|jpeg|png|gif|svg)',
      dest: 'wacoal.github.io/common/img',
      copy: {
        from: 'wacoal.github.io/common/img/**/*',
        to: 'common/img'
      }
    },
    // cacheImage: {
    //   copy: {
    //     from: 'cache/common/**/*',
    //     to: 'sample/cache/common'
    //   }
    // },
    // iconfont: {
    //   watch: 'gg-fonts/*.svg',
    //   src: 'gg-fonts/*.svg',
    //   dest: 'fonts',
    //   copy: {
    //     from: 'public/fonts/*.+(eot|ttf|woff|woff2)',
    //     to: 'sample/fonts'
    //   }
    // },
    templates: {
      watch: 'assets/template/**/*.ejs',
      src: ['assets/template/**/*.ejs', '!assets/template/**/_*.ejs'],
      dest: 'wacoal.github.io'
    },
    html: 'sample/**/*.html',
    clean: ['public', 'sample']
  },
  browserSync: {
    proxy: 'http://',
    //serveStatic: ['sample'],
    serveStatic: ['wacoal.github.io'],

    // files: ['views/**/*.blade.php', 'public/css/**/*.css', 'sample/**/*.html', 'sample/css/**/*.css'],
    files: ['css/**/*.css' , "wacoal.github.io/**/*.html"],
    port: 3000
  }
};
