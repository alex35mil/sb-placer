$(function() {
  var source = get_sbjs.current.src,
      medium = get_sbjs.current.mdm,
      campaign = get_sbjs.current.cmp;

  $('#this-is-id-simple').sb_placer({
    default_value: 'default phone (simple)',
    conditions: [
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
        when: [ ['yandex', 'begun'], 'cpc', [1, 2, 'y_celevye_poisk'] ],
        place: '<i>ya_beg_phone (arrays)</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['google', 'facebook'], 'cpc', [3, 'sMtH', 'g_celevye_poisk'] ],
        place: '<i>g_fb_phone (arrays)</i>'
      }
    ]
  });

  $('#this-is-id-regexp').sb_placer({
    default_value: 'default phone (regexp)',
    conditions: [
      {
        check: [source, medium, campaign],
        when: [ ['yandex', 'begun'], 'cpc', /^y_cele.*ye_poisk$/i],
        place: '<i>ya_beg_phone (regexp)</i>'
      },
      {
        check: [source, medium, campaign],
        when: [ ['google', 'facebook'], 'cpc', /^g_cele.*ye_poisk$/i],
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