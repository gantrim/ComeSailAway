/**
 * Created by greg on 2/4/15.
 */
module.exports = function (gulp, plugins, growl) {
  gulp.task('customScripts', function () {

    var coffeeify = require('gulp-coffeeify'),
        ngAnnotate = require('gulp-ng-annotate'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat');

    return gulp.src('views/**/*.coffee')
      .pipe(coffeeify())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('.tmp/public/js/'))
      .pipe(plugins.if(growl, plugins.notify({message: 'CustomScripts task complete'})));
  });
}
