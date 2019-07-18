const gulp = require('gulp');
const gulpif = require('gulp-if');
const args = require('./util/args');
const sass = require('gulp-sass');
const autoprefixe = require('gulp-autoprefixer');
const connect = require('gulp-connect');

const srcUrl = args.act ? `src/styles/${args.act}.scss` : 'src/styles/**/*.{scss,css}';
console.log(`开发css为：${srcUrl}`);

gulp.task('css', (cb) => {
  return gulp.src(srcUrl)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixe({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(`dist/${args.act}`))
    .pipe(gulpif(args.watch, connect.reload()))
})