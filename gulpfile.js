var gulp         = require('gulp'),
    pump         = require('pump'),
    nunjucks     = require('gulp-nunjucks'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    include      = require('gulp-include'),
    imagemin     = require('gulp-imagemin'),
    clean        = require('gulp-clean'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),
    config       = require('./config.json');

gulp

  // Stylesheets (with SCSS, autoprefixer)
  // -------------------------------------
  .task('css', () => {
    pump([
      gulp.src(config.css.src),
      sass().on('error', sass.logError),
      autoprefixer(config.autoprefixer),
      gulp.dest(config.css.dest),
      browserSync.stream()
    ]);
  })

  // JavaScript (with require/include)
  // ---------------------------------
  .task('js', () => {
      pump([
        gulp.src(config.js.src),
        include().on('error', console.log),
        gulp.dest(config.js.dest),
        browserSync.stream()
      ]);
  })

  // Fonts (just copy font files)
  // ----------------------------
  .task('fonts', () => {
    pump([
      gulp.src(config.fonts.src),
      gulp.dest(config.fonts.dest),
      browserSync.stream()
    ]);
  })

  // Images (just copy image files)
  // ------------------------------
  .task('images', () => {
    pump([
      gulp.src(config.images.src),
      gulp.dest(config.images.dest),
      browserSync.stream()
    ]);
  })

  // Templates (with Nunjucks)
  // -------------------------
  .task('html', () => {
    pump([
      gulp.src(config.html.src),
      nunjucks.compile(),
      rename({ extname: '.html' }),
      gulp.dest(config.html.dest),
      browserSync.stream()
    ]);
  })

  // Copy (custom files)
  // -------------------
  .task('copy', () => {
    config.copy.map((item) => {
      pump([
        gulp.src(item.src),
        gulp.dest(item.dest)
      ]);
    });
  })

  // Clean (remove dist)
  // -------------------
  .task('clean', () => {
    pump([
      gulp.src(config.clean.src, config.clean.options),
      clean()
    ]);
  })

  // Watch (watch and run tasks on change)
  // -------------------------------------
  .task('watch', function() {
    gulp.watch(config.css.watch, ['css']);
    gulp.watch(config.js.watch, ['js']);
    gulp.watch(config.fonts.watch, ['fonts']);
    gulp.watch(config.images.watch, ['images']);
    gulp.watch(config.html.watch, ['html']);
  })

  // Browser Sync (run live reload server)
  // -------------------------------------
  .task('browserSync', ['default'], () => {
    browserSync.init(config.browserSync);
  })

  // Minify (compress CSS, JS, image)
  // --------------------------------
  .task('minify', () => {

    // CSS
    pump([
      gulp.src([config.css.dest + '/**/*.css', '!' + config.css.dest + '/**/*.min.css']),
      cleanCSS(),
      rename({ suffix: '.min' }),
      gulp.dest(config.css.dest)
    ]);

    // JavaScript
    pump([
      gulp.src([config.js.dest + '/**/*.js', '!' + config.js.dest + '/**/*.min.js']),
      uglify(),
      rename({ suffix: '.min' }),
      gulp.dest(config.js.dest)
    ]);

    // Images
    pump([
      gulp.src(config.images.dest + '**/*'),
      imagemin(),
      rename(),
      gulp.dest(config.images.dest)
    ]);

  })

  // Gulp Tasks
  // ----------
  .task('build', ['css', 'js', 'fonts', 'images', 'html', 'copy'])
  .task('serve', ['build', 'browserSync', 'watch'])
  .task('production', ['clean', 'build', 'minify'])
  .task('default', ['build']);
