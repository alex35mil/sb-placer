"use strict";

var pkg = require('../../../package.json');

module.exports = function(bundles, type, paths) {

  var makeBundle = function(bundle) {

    var type_dir = type + '/',
        in_dir = paths.in_base + type_dir,
        in_file = bundle + '.' + (type === 'css' ? '{sass,scss}' : type),
        out_dir = paths.out_public + type_dir,
        out_file = bundle + '.' + type;

    return {
      in_dir: in_dir,
      in_file: in_file,
      out_dist_dir: paths.out_dist,
      out_public_dir: out_dir,
      out_file: out_file,
      banner: '/** ' + bundle + '.js' + ' v' + pkg.version + ' **/\n',
      compress: true,
      save_to_dist: true
    };
  };

  var pack = [];
  for (var i = 0; i < bundles.length; i++) {
    pack.push(makeBundle(bundles[i]));
  }
  return pack;

};