const gulp = require('gulp');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const gulpif =require('gulp-if');
const args = require('./util/args');

const srcUrl = args.act ? `src/templates/${args.act}.html` : 'src/templates/**/*.html';
console.log(`开发html为：${srcUrl}`);

gulp.task('html', () => {
  gulp.src(srcUrl)
      .pipe(rename({basename: 'index'}))
      .pipe(gulp.dest(`dist/${args.act}`))
      .pipe(gulpif(args.watch, connect.reload()))
})