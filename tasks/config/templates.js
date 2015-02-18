module.exports = function (gulp, plugins, growl) {
  return gulp.task('templates', function () {
    var jade = require('gulp-jade');
    return gulp.src('views/**/*.jade')
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest('.tmp/public/'))
  });
}
