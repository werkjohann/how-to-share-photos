
var gulp = require('gulp');
var tap = require('gulp-tap');
var ext = require('gulp-ext');
var svgo = require('gulp-svgo');

var Viz = require('viz.js');

gulp.task('default', defaultTask);

function defaultTask() {
  gulp.src('src/**/*.dot')
    .pipe(tap(file => {
      //try {
      file.contents = Buffer.from(Viz(file.contents.toString()));
      // } catch (e) {
      //   file.contents = Buffer.from(e.toString());
      // }
    }))
    .pipe(ext.replace('svg'))
    .pipe(svgo())
    .pipe(gulp.dest('./build'));
}

gulp.task('watch', () => defaultTask() || gulp.watch('src/**/*.dot', ['default']));
