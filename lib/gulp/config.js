"use strict";

var pkg     = require('../../package.json'),
    bundler = require('./helpers/bundler');

var paths = {
    in_base: './src/',
    out_dist: './dist/',
    out_public: './public/'
};

var types = {
  js: 'js',
  css: 'css',
  img: 'img',
  html: 'html'
};

var bundles = ['sb-placer', 'sb-placer.jquery'];

// Go
module.exports = {

  scripts: {
    bundle_configs: bundler(bundles, types.js, paths),
    in_dir: paths.in_base + types.js + '/',
    lint: {
      options: pkg.lintOptions,
      dir: paths.out_dist
    }
  },

  css: {
    bundle_configs: bundler(bundles, types.css, paths),
    in_dir: paths.in_base + types.css + '/',
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      cascade: false
    },
    sass: {
      sourceComments: 'normal',
      errLogToConsole: true
    },
    compress: {}
  },

  imgs: {
    in_dir: paths.in_base + types.img + '/',
    out_dir: paths.out_public + types.img + '/',
    imagemin: {}
  },

  html: {
    in_dir: paths.in_base + types.html + '/',
    out_dir: paths.out_public,
    slim_options: {
      pretty: true
    }
  },

  clean: {
    html: paths.out_public,
    imgs: paths.out_public + types.img + '/',
    css: paths.out_public + types.css + '/',
    scripts: paths.out_public + types.js + '/',
    dist: paths.out_dist
  }

};
