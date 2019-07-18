const gulp = require('gulp');
const args = require('./util/args');
const watch= require('gulp-watch');
const batch = require('gulp-batch');
const fs = require('fs');
const path = require('path');
const connect = require('gulp-connect');
const clc = require('cli-color');
let jsModifyCount = 0,
    cssModifyCount = 0,
    htmlModifyCount = 0,
    imagesModifyCount = 0;


gulp.task('watch', (cb) => {
  if(!args.watch) return cb();
  // gulp.watch('src/templates/*.html', ['html'])
  // gulp.watch('src/styles/**/*.scss', ['css'])
  // gulp.watch('src/js/**/*.js', ['js'])
  watch('src/templates/*.html', (vinyl) => {
    const rootDir = process.cwd();
    ++htmlModifyCount;
    console.log(clc.cyan('文件') + clc.red(`${vinyl.basename}` + clc.cyan(`更新(${clc.cyan(htmlModifyCount)})`)));
    if (vinyl.event === 'unlink') {
      fs.unlinkSync(path.resolve(rootDir, `../dist/templates/${vinyl.basename}`));
      connect.reload();
      return null;
    }
    gulp.start('html')
  })

  watch('src/styles/**/*.scss', (vinyl) => {
    const rootDir = process.cwd();
    ++cssModifyCount;
    console.log(clc.cyan('文件') + clc.red(`${vinyl.basename}` + clc.cyan(`更新(${clc.cyan(cssModifyCount)})`)));
    if (vinyl.event === 'unlink') {
      fs.unlinkSync(path.resolve(rootDir, `../dist/css/${vinyl.basename}`));
      connect.reload();
      return null;
    }
    gulp.start('css')
  })

  watch('src/js/**/*.js', (vinyl) => {
    const rootDir = process.cwd();
    ++jsModifyCount;
    console.log(clc.cyan('文件') + clc.red(`${vinyl.basename}` + clc.cyan(`更新(${clc.cyan(jsModifyCount)})`)));
    if (vinyl.event === 'unlink') {
      fs.unlinkSync(path.resolve(rootDir, `../dist/js/${vinyl.basename}`));
      connect.reload();
      return null;
    }
    gulp.start('js')
  })

  watch('src/images/**/*', (vinyl) => {
    const rootDir = process.cwd();
    ++imagesModifyCount;
    console.log(clc.cyan('文件') + clc.red(`${vinyl.basename}` + clc.cyan(`更新(${clc.cyan(imagesModifyCount)})`)));
    if (vinyl.event === 'unlink') {
      fs.unlinkSync(path.resolve(rootDir, `../dist/images/${vinyl.basename}`));
      connect.reload();
      return null;
    }
    gulp.start('images')
  })
})