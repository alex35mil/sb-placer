"use strict";

var gulp     = require('gulp'),
    jshint   = require('gulp-jshint'),
    map      = require('map-stream'),
    finder   = require('../helpers/finder'),
    notifier = require('../helpers/notifier'),
    config   = require('../config').scripts.lint;

module.exports = function() {

  var files     = finder(config.dir, 'js'),
      excl_min  = '!' + config.dir + '*.min.js';

  files.push(excl_min);

  var failReporter = map(function(file, cb) {
    if (!file.jshint.success) notifier(file.relative, true, 'Ooooooops!');
    cb(null, file);
  });

  return gulp.src(files)
      .pipe(jshint(config.options))
      .pipe(jshint.reporter())
      .pipe(failReporter);

};
