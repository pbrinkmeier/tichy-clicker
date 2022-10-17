'use strict';

var actions = require('./actions.js');
var i18n = require('./util/i18n.js');
var clickerView = require('./view/clicker-view.js');
var h = require('virtual-dom/h');
var rainbowSpans = require('./view/rainbow-spans.js');
var shopView = require('./view/shop-view.js');
var textView = require('./view/text-view.js');

module.exports = function render (state) {
  var main;
  var path = state.page.split('/');

  switch (path[0]) {
    case 'clicker':
      main = clickerView(state);
      break;
    case 'how-to-play':
      main = textView(i18n.tr('how_to_play'), i18n.tr('how_to_play_description'));
      break;
    case 'about':
      main = textView(i18n.tr('about'), i18n.tr('about_description'));
      break;
    case 'shop':
      main = shopView(path[1], state);
      break;
  }

  return h('div.tichy-clicker', [
    h('section.topbar', [
      h('div.container', [
        h('h1.topbar-title', [
          rainbowSpans(i18n.tr('tichy_clicker'))
        ]),
        h('div.topbar-links', [
          h('a.topbar-link', {
            href: 'https://github.com/pbrinkmeier/tichy-clicker',
            target: '_blank'
          }, i18n.tr('github')),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('how-to-play');
            }
          }, i18n.tr("how_to_play")),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('about');
            }
          }, i18n.tr("about"))
        ])
      ])
    ]),
    main
  ]);
};
