const gulp = require('gulp');
const gulpif = require('gulp-if');
const args = require('./util/args');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const rename =  require('gulp-rename');

const srcUrl = args.act ? `src/images/${args.act}/*.{png,jpg,gif}` : 'src/images/**/*.{png,jpg,gif}';
console.log(`开发images为：${srcUrl}`);

gulp.task('images', () => {
  return gulp.src(srcUrl)
    .pipe(rename(path => {
      path.dirname = ''
    }))
    .pipe(gulp.dest(`dist/${args.act}`))
    .pipe(gulpif(args.watch, connect.reload()))
})