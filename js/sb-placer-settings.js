$(function() {
  var source = get_sbjs.current.src,
      medium = get_sbjs.current.mdm,
      campaign = get_sbjs.current.cmp;

  function call_me_back(check, when, place) {
    console.log('Check value: ' + JSON.stringify(check) + ' (' + check.constructor.name + ')');
    console.log('When value: ' + JSON.stringify(when) + ' (' + when.constructor.name + ')');
    console.log('Place value: ' + JSON.stringify(place) + ' (' + place.constructor.name + ')');
  }

  $('#this-is-id-simple').sb_placer({
    default_value: 'default phone (simple)',
    conditions: [
      {
        check: source,
        when: 'yand',
        place: '<i>ya_phone (simple) - WRONG 1</i>'
      },
      {
        check: source,
        when: 'yandexxx',
        place: '<i>ya_phone (simple) - WRONG 2</i>'
      },
      {
        check: source,
        when: 'yandex',
        place: '<i>ya_phone (simple)</i>'
      },
      {
        check: source,
        when: 'google',
        place: '<i>g_phone (simple)</i>'
      }
    ]
  });

  $('#this-is-id-arrays').sb_placer({
    default_value: 'default phone (arrays)',
    conditions: [
      {
        check: [source, medium, campaign],
        when: [ ['yand', 'begun'], 'cpc', [1, 2, 'y_celevye_poisk'] ],
        place: '<i>ya_beg_phone (arrays) - WRONG 1</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['yandexxx', 'begun'], 'cpc', [1, 2, 'y_celevye_poisk'] ],
        place: '<i>ya_beg_phone (arrays) - WRONG 2</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['yandex', 'begun'], 'cp', [1, 2, 'y_celevye_poisk'] ],
        place: '<i>ya_beg_phone (arrays) - WRONG 3</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['yandex', 'begun'], 'cpccc', [1, 2, 'y_celevye_poisk'] ],
        place: '<i>ya_beg_phone (arrays) - WRONG 4</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['yandex', 'begun'], 'cpc', [1, 2, 'y_celevye_poisk'] ],
        place: '<i>ya_beg_phone (arrays)</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['google', 'facebook'], 'cpc', [3, 'sMtH', 'g_celevye_poisk'] ],
        place: '<i>g_fb_phone (arrays)</i>'
      }
    ],
    callback: call_me_back
  });

  $('#this-is-id-regexp').sb_placer({
    default_value: 'default phone (regexp)',
    conditions: [
      {
        check: [source, medium, campaign],
        when: [ ['yandex', 'begun'], 'cpc', /^y_.*_poisk$/i],
        place: '<i>ya_beg_phone (regexp)</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['google', 'facebook'], 'cpc', /^g_.*_poisk$/i],
        place: '<i>g_fb_phone (regexp)</i>'
      }
    ]
  });

  $('.this-is-class').sb_placer({
    default_value: 'default phone (all classes)',
    conditions: [
      {
        check: source,
        when: 'yandex',
        place: '<i>ya_phone (all classes)</i>'
      },
      {
        check: source,
        when: 'google',
        place: '<i>g_phone (all classes)</i>'
      }
    ]
  });
});