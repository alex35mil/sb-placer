var actions = {

  place: function(targets, value) {
    targets.each(function() {
      $(this).html(value);
    });
  }

};
