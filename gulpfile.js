
var gulp = require('gulp');
var tap = require('gulp-tap');
var ext = require('gulp-ext');
var svgo = require('gulp-svgo');

var Viz = require('viz.js');

gulp.task('default', defaultTask);

function defaultTask() {
  gulp.src('src/**/*.dot')
    .pipe(tap(file => {
      file.contents = Buffer.from(Viz(file.contents.toString()))
    }))
    .pipe(ext.replace('svg'))
    .pipe(svgo())
    .pipe(gulp.dest('./build'));
}

gulp.task('watch', () => gulp.watch('src/**/*.dot', ['default']));
