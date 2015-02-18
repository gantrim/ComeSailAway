module.exports = function (gulp, plugins) {
  gulp.task('livereload', function (cb) {
    plugins.sequence(
      'watch:api',
      'watch:assets',
      'watch:templates',
      'watch:customScripts',
      cb
    );
  });
};
