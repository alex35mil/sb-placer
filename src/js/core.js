var core = {

  go: function(placer, targets, params) {

    var terms = params.conditions;

    for (var i = 0; i < terms.length; i++) {

      if (this.isIncompatibleArrays(terms[i].check, terms[i].when)) continue;

      if (this.isCompatibleArrays(terms[i].check, terms[i].when)) {
        var place_it = false;
        for (var ii = 0; ii < terms[i].check.length; ii++) {
          if (this.isMatch(terms[i].check[ii], terms[i].when[ii])) {
            place_it = true;
          } else {
            place_it = false;
            break;
          }
        }
        if (place_it) {
          placer(targets, terms[i].place);
          this.execCallback(params.callback, terms[i].check, terms[i].when, terms[i].place);
          return true;
        }
      }

      if (this.isMatch(terms[i].check, terms[i].when)) {
        placer(targets, terms[i].place);
        this.execCallback(params.callback, terms[i].check, terms[i].when, terms[i].place);
        return true;
      }

    }

    // Oops, no match
    placer(targets, params.default_value);
    this.execCallback(params.callback, false, false, params.default_value);
    return true;

  },

  isIncompatibleArrays: function(check, when) {
    return (
      type.isArray(check) && type.isArray(when) && check.length !== when.length
    );
  },

  isCompatibleArrays: function(check, when) {
    return (
      type.isArray(check) && type.isArray(when) && check.length === when.length
    );
  },

  isMatch: function(check, when) {
    return (
      (type.isRegExp(when) && check.match(when)) ||
      (!type.isRegExp(when) && type.isArray(when) && when.indexOf(check) !== -1) ||
      (!type.isRegExp(when) && !type.isArray(when) && when === check)
    );
  },

  execCallback: function(cb, check, when, place) {
    if (cb && type.isFunction(cb)) cb(check, when, place);
  }

};
