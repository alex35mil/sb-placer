;(function(root, factory) {

  "use strict";
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.sbPlacer = factory();
  }

}(this, function() {

  "use strict";

   //= require helpers/indexof.js
   //= require helpers/selector.js
   //= require helpers/checkers.js
   //= require core.js
   //= require actions.js

  return function(params) {

    var placer  = actions.place,
        targets = actions.getTargets(params.targets);

    core.go(placer, targets, params);

  };

}));
