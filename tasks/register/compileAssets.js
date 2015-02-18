module.exports = function (gulp, plugins) {
  gulp.task('compileAssets', function (cb) {
    plugins.sequence(
      'clean:dev',
      'jst:dev',
      'stylus',
      'copy:dev',
      'coffee:dev',
      'customScripts',
      'templates',
      cb
    );
  });
};
