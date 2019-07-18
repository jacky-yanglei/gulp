const gulp = require('gulp');
const gulpif = require('gulp-if');
const args = require('./util/args');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');
const named = require('vinyl-named');

const srcUrl = args.act ? `src/js/${args.act}.js` : 'src/js/**/*.js';
console.log(`开发js为：${srcUrl}`)

gulp.task('js', () => {
  return gulp.src(srcUrl)
    .pipe(plumber({
      //处理错误
      errorHandle: function () {}
    }))
    // .pipe(webpack(webpackConfig))
    .pipe(babel())
    .pipe(uglify({
      compress: {
        properties: false
      },
      output: {
        quote_keys: true
      }
    }))
    .pipe(gulp.dest(`dist/${args.act}`))
    .pipe(gulpif(args.watch, connect.reload()))
})