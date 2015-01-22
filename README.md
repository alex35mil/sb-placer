# SB Placer

## About
* This is the tool to change content of html-element according given criteria.
* There is a pure JavaScript version, without any dependency from third-party libraries.
* And jQuery-plugin for jQuery lovers.
* You can use it for phones switch, titles switch, any site content switch.

## Grab it

```python
# from `npm`
npm install --save sb-placer

# `bower`
bower install --save sb-placer
```

Or you can [download this repo](https://github.com/alexfedoseev/sb-placer/archive/master.zip) and use `sb-placer.min.js` / `sb-placer.jquery.min.js` from `/dist` folder.

## Setup

In the `<head>`:

```html
<!-- Stand-alone -->
<script src="/path/to/sb-placer.min.js"></script>

<!-- jQuery -->
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/sb-placer.jquery.min.js"></script>
```

You can use it as `CommonJS` / `AMD` module.

```javascript
// Stand-alone
var sbPlacer = require('sb-placer');

// jQuery
var $ = require('jquery');
        require('sb-placer/jquery');
```

Now we can change the things.

```javascript
// Stand-alone
sbPlacer({
  /* settings */
});

// jQuery
$('.sb-phone').sbPlacer({
  /* settings */
});
```

## Configure

What we have to do to make things happen:

* give the `DOM`-node to place the data
* give the criteria
* exec callback right after the change (if you want to)

### DOM-node

Here it is:

```javascript
// Stand-alone
sbPlacer({
  targets: '.sb-phone'
  /* settings */
});

// jQuery
$('.sb-phone').sbPlacer({
  /* settings */
});
```

`.sb-phone` — it's a simple css-selector. You can use classes, ids and all the stuff. In this example all nodes with the class `sb-phone` will be `innerHTML`'ed with the given data.

This is the only difference between the stand-alone and jQuery configurations.

### Criteria

```javascript
// get the visitor's current source with Sourcebuster
var source = sbjs.get.current.src;

// magic!
$('.sb-phone').sbPlacer({
  default_value: '8-800-DEFAULT-PHONE',
  conditions: [
    {
      check: source,
      when: 'google',
      place: '8-800-GOOGLE-PHONE'
    },
    {
      check: source,
      when: 'bing',
      place: '8-800-BING-PHONE'
    }
  ]
});
```

* `default_value` — **String** (you can use `html` here)
* `conditions` — **Array** of **Objects**

#### Condition object

* `check` — **String** / **Array** of **Strings**
* `when` — **String** / **Array** of **Strings** / **RegExp**
* `place` — **String** (you can use `html` here)

We `place` data if `check === when`. In the example above if `source` is `'google'` — it will place `'8-800-GOOGLE-PHONE'` inside the node.

Ok, it was simple. What about this one:

```javascript
$('.sb-phone').sbPlacer({
  default_value: '8-800-DEFAULT-PHONE',
  conditions: [
    {
      check: source,
      when: ['google', 'bing'],
      place: '8-800-GOOGLE-BING-PHONE'
    },
    {
      check: source,
      when: 'facebook',
      place: '8-800-FACEBOOK-PHONE'
    }
  ]
});
```

If `source` is `'google'` **OR** `'bing'` — place `'8-800-GOOGLE-BING-PHONE'`.

We want more!

```javascript
var source = sbjs.get.current.src,
    medium = sbjs.get.current.mdm;

$('.sb-phone').sbPlacer({
  default_value: '8-800-DEFAULT-PHONE',
  conditions: [
    {
      check: [source, medium],
      when: [['google', 'bing'], 'organic'],
      place: '8-800-GOOGLE-BING-PHONE'
    },
    {
      check: [source, medium],
      when: ['facebook', 'social'],
      place: '8-800-FACEBOOK-PHONE'
    }
  ]
});
```

If `source` is (`'google'` **OR** `'bing'`) **AND** (`medium` is `'organic'`) — place `'8-800-GOOGLE-BING-PHONE'`.

**NB! This is important:** `[check].length === [when].length`, or this condition will be omitted.

And finally `RegExp`:

```javascript
var source   = sbjs.get.current.src,
    medium   = sbjs.get.current.mdm,
    campaign = sbjs.get.current.cmp;

$('.sb-phone').sbPlacer({
  default_value: '8-800-DEFAULT-PHONE',
  conditions: [
    {
      check: [source, medium, campaign],
      when: [['google', 'bing'], 'cpc', /^gb_.*_cpc$/i],
      place: '8-800-GOOGLE-BING-PHONE'
    },
    {
      check: [source, medium, campaign],
      when: [['facebook', 'twitter'], 'social', /^ft_.*_social$/i],
      place: '8-800-FACEBOOK-TWITTER-PHONE'
    }
  ]
});
```

### Callback

You can exec callback right after the placement was done (it's optional). It takes 3 arguments: `check`, `when` & `place` — values from matched object.

If nothing matched:

* `check = false`
* `when = false`
* `place = default_value`


```javascript
var doSmth = function(check, when, place) {
  // bla-bla
}

$('.sb-phone').sbPlacer({
  /* settings */
  callback: doSmth
});
```

## P.S.

This script interacts with DOM-nodes, so pay attention to where you put the placer. Use jQuery's `$(document).ready` (or native event `DOMContentLoaded` with fallback) or place the placer after the target `DOM`-node.

## P.P.S.

It's MIT.

Have fun!