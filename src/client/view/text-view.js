'use strict';

var actions = require('../actions.js');
var h = require('virtual-dom/h');

module.exports = function textView (title, text) {
  return h('section.main.text', [
    h('div.container', [
      h('button', {
        onclick: function () {
          actions.setPage('clicker');
        }
      }, 'Back'),
      h('h2.text-title', title),
      h('p.text-content', text)
    ])
  ]);
};
