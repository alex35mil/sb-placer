;(function (factory) {

  "use strict";
  if (typeof exports === 'object') {
    factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }

}(function ($) {

  "use strict";

  //= require helpers/indexof.js
  //= require helpers/checkers.js
  //= require core.js
  //= require actions.jquery.js

  $.fn.sbPlacer = function(params) {

    var placer  = actions.place,
        targets = this;

    core.go(placer, targets, params);

    return targets;

  };

}));
