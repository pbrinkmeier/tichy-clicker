'use strict';

var h = require('virtual-dom/h');

module.exports = function textView (title, text) {
  return h('section.main.text', [
    h('div.container', [
      h('button', 'Back'),
      h('h2.text-title', title),
      h('p.text-content', text)
    ])
  ]);
};
