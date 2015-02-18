module.exports = function (gulp, plugins, growl) {
  var growl = require('gulp-notify-growl'),
      //groc = require("gulp-groc"),
      clean = require('gulp-clean');

  // clean doc
  //gulp.task('documentation:clean', function () {
  //  return gulp
  //    .src(['jsdoc'], {
  //      read: false
  //    })
  //    .pipe(clean())
  //    .pipe(plugins.if(growl, plugins.notify({message: 'Cleaned Documentation'})));
  //  ;
  //});
  //
  //gulp.task('documentation:gen', ['documentation:clean'], function () {
  //  return gulp
  //    .src("./views/components/auth/**/*.coffee")
  //    .pipe(groc({
  //      out: 'jsdoc'
  //    }));
  //});
}
