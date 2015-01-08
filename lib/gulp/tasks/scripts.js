"use strict";

var gulp        = require('gulp'),
    include     = require('gulp-include'),
    uglify      = require('gulp-uglify'),
    buffer      = require('vinyl-buffer'),
    rename      = require('gulp-rename'),
    header      = require('gulp-header'),
    gulpif      = require('gulp-if'),
    linter      = require('../helpers/linter'),
    notifier    = require('../helpers/notifier'),
    config      = require('../config').scripts;

gulp.task('scripts', function(cb) {

  var bundle_queue = config.bundle_configs.length,
      not_4production = process.env.NODE_ENV !== 'production';

  var bundleThis = function(bundle_config) {

    var bundle = function() {

      return gulp.src(bundle_config.in_dir + bundle_config.in_file)
          .pipe(include())
          .pipe(gulpif(global.not_4production, gulp.dest(bundle_config.out_public_dir)))
          .pipe(gulpif(bundle_config.save_to_dist, gulp.dest(bundle_config.out_dist_dir)))
          .pipe(gulpif(bundle_config.compress, buffer()))
          .pipe(gulpif(bundle_config.compress, uglify()))
          .pipe(gulpif(bundle_config.compress, rename({suffix: '.min'})))
          .pipe(gulpif(!global.not_4production, header(bundle_config.banner)))
          .pipe(gulpif(bundle_config.save_to_dist, gulp.dest(bundle_config.out_dist_dir)))
          .pipe(gulp.dest(bundle_config.out_public_dir))
          .on('end', handleQueue);
    };

    var handleQueue = function() {
      notifier(bundle_config.out_file);
      if (bundle_queue) {
        bundle_queue--;
        if (bundle_queue === 0) {
          linter();
          cb();
        }
      }
    };

    return bundle();
  };

  config.bundle_configs.forEach(bundleThis);

});

gulp.task('lint', function() {
  linter();
});
