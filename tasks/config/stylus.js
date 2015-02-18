module.exports = function (gulp, plugins, growl) {

  var foundation = gulp.task('stylus', function () {
    var nib = require('nib');
    var stylus = require('gulp-stylus');
    var concat = require('gulp-concat');
    var growl = require('gulp-notify-growl');

    gulp.src('assets/foundation/styl/foundation.styl')
      .pipe(stylus({
        use: nib(),
        compress: true
      }))
      .pipe(gulp.dest('.tmp/public/styles/'))
      .pipe(plugins.if(growl, plugins.notify({message: 'Generated Foundation Styles'})));

    gulp.src('assets/styles/**/*.styl')
      .pipe(stylus({
        use: nib(),
        compress: true
      }))
      .pipe(concat('app.css'))
      .pipe(gulp.dest('.tmp/public/styles/'))
      .pipe(plugins.if(growl, plugins.notify({message: 'Generated Custom Styles'})))

  });

};
