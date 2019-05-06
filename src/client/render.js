'use strict';

var actions = require('./actions.js');
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
      main = textView('Wie man spielt', 'Klicken Sie auf das Bild, um Commits zu erhalten. Eignen Sie sich neue Fähigkeiten an, um mehr Commits pro Klick zu bekommen. Kaufen Sie Systeme für ein stetiges Einkommen. Das war\'s, haben Sie viel Spaß!');
      break;
    case 'about':
      main = textView('Über', 'Dieses Projekt habe ich in einer Vorlesung begonnen. Es soll niemanden angreifen; falls Sie Fragen oder Vorschläge haben, schreiben Sie mir doch einen E-Brief an paul (Punkt) brinkmeier (Bei) gmail (Punkt) com.');
      break;
    case 'shop':
      main = shopView(path[1], state);
      break;
  }

  return h('div.tichy-clicker', [
    h('section.topbar', [
      h('div.container', [
        h('h1.topbar-title', [
          rainbowSpans('Tichy-Klicker')
        ]),
        h('div.topbar-links', [
          h('a.topbar-link', {
            href: 'https://github.com/pbrinkmeier/tichy-clicker',
            target: '_blank'
          }, 'GitHub'),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('how-to-play');
            }
          }, 'Wie man spielt'),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('about');
            }
          }, 'Über')
        ])
      ])
    ]),
    main
  ]);
};
