const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('build', gulpSequence('html', 'css', 'js', 'images', ['watch', 'server']))