var type = {

  isArray: Array.isArray || function(o) {
    return (
        typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]'
    );
  },

  isRegExp: function(o) {
    return (
        Object.prototype.toString.call(o) === '[object RegExp]'
    );
  },

  isFunction: function(o) {
    return (
        typeof o === 'function' && Object.prototype.toString.call(o) === '[object Function]'
    );
  }

};
