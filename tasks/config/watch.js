/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 *
 */
module.exports = function (gulp, plugins, growl) {
  var server = plugins.livereload();
  gulp.task('watch:api', function () {
    // Watch Style files
    return gulp.watch('api/**/*', ['syncAssets'])
      .on('change', function (file) {
        server.changed(file.path);
      });
  });

  gulp.task('watch:assets', function () {
    // Watch assets
    return gulp.watch(['assets/**/*', 'tasks/pipeline.js'], ['syncAssets'])
      .on('change', function (file) {
        server.changed(file.path);
      });
  });

  gulp.task('watch:templates', function () {
    // Watch assets
    return gulp.watch(['views/**/*.jade', 'tasks/pipeline.js'], ['templates'])
      .on('change', function (file) {
        server.changed(file.path);
      });
  });

  gulp.task('watch:customScripts', function () {
    // Watch assets
    return gulp.watch(['views/**/*.coffee', 'tasks/pipeline.js'], ['customScripts'])
      .on('change', function (file) {
        server.changed(file.path);
      });
  });

};
