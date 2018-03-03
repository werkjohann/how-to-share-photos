
var fs = require('fs');

var gulp = require('gulp');
var tap = require('gulp-tap');
var ext = require('gulp-ext');
var svgo = require('gulp-svgo');

var Viz = require('viz.js');

gulp.task('dot', dotTask);
gulp.task('html', htmlTask);

gulp.task('default', ['dot', 'html']);

gulp.task('watch', ['default', '_watch']);

gulp.task('_watch', () => gulp.watch('src/**/*', ['default']));


function dotTask() {
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
    .pipe(gulp.dest('./docs'));
}

function htmlTask() {
  gulp.src('src/**/*.html')
    .pipe(tap(file => {
      var svg = fs.readFileSync('docs/apple_photos.svg', 'utf8');
      file.contents = Buffer.from(file.contents.toString().replace(/__SVG__/g, svg));
    }))
    .pipe(gulp.dest('./docs'));
}
