module.exports = {
  path: {
    view: 'views/**/*.blade.php',
    style: {
      watch: 'assets/sass/**/*.scss',
      src: 'assets/sass/**/*.scss',
      dest: 'css',
      copy: {
        from: 'css/**/*.css',
        to: 'sample/css'
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
      dest: 'img',
      copy: {
        from: 'img/**/*',
        to: 'sample/img'
      }
    },
    cacheImage: {
      copy: {
        from: 'cache/common/**/*',
        to: 'sample/cache/common'
      }
    },
    iconfont: {
      watch: 'gg-fonts/*.svg',
      src: 'gg-fonts/*.svg',
      dest: 'fonts',
      copy: {
        from: 'public/fonts/*.+(eot|ttf|woff|woff2)',
        to: 'sample/fonts'
      }
    },
    templates: {
      watch: 'assets/template/**/*.ejs',
      src: ['assets/template/**/*.ejs', '!assets/template/**/_*.ejs'],
      dest: 'sample'
    },
    html: 'sample/**/*.html',
    clean: ['public', 'sample']
  },
  browserSync: {
    proxy: 'https://vm.livede55.com',
    serveStatic: ['views', 'sample'],
    // files: ['views/**/*.blade.php', 'public/css/**/*.css', 'sample/**/*.html', 'sample/css/**/*.css'],
    files: ['views/**/*.blade.php', 'css/**/*.css'],
    port: 3000
  }
};
