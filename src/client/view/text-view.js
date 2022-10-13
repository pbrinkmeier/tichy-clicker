'use strict';

var actions = require('../actions.js');
var i18n = require('../util/i18n')
var h = require('virtual-dom/h');

module.exports = function textView (title, text) {
  return h('section.main.text', [
    h('div.container', [
      h('button', {
        onclick: function () {
          actions.setPage('clicker');
        }
      }, i18n.tr("back")),
      h('h2.text-title', title),
      h('p.text-content', text)
    ])
  ]);
};
