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
  if (path[0] === 'clicker') {
    main = clickerView(state);
  } else if (path[0] === 'how-to-play') {
  }

  switch (path[0]) {
    case 'clicker':
      main = clickerView(state);
      break;
    case 'how-to-play':
      main = textView('How to play', 'Click the image in the center to earn commits. To earn more, use them to buy systems, which generate commits over time, or skills, which give you more commits per click. That\'s it, have fun!');
      break;
    case 'about':
      main = textView('About', 'I started this little project in a lecture some time. It is not meant to attack anyone, but if you have any inquiries or feedback, write me an E-Mail to paul (dot) brinkmeier (at) gmail (dot) com or create an issue on GitHub.');
      break;
    case 'shop':
      main = shopView(path[1], state);
      break;
  }

  return h('div.tichy-clicker', [
    h('section.topbar', [
      h('div.container', [
        h('h1.topbar-title', [
          rainbowSpans('Tichy-Clicker')
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
          }, 'How to play'),
          h('span.topbar-link', {
            onclick: function () {
              actions.setPage('about');
            }
          }, 'About')
        ])
      ])
    ]),
    main
  ]);
};
