'use strict';

var h = require('virtual-dom/h');
var rainbowSpans = require('./view/rainbow-spans.js');
var textView = require('./view/text-view.js');

module.exports = function render (state) {
  return h('div.tichy-clicker', [
    h('section.topbar', [
      h('div.container', [
        h('h1.topbar-title', [
          rainbowSpans('Tichy-Clicker')
        ]),
        h('div.topbar-links', [
          h('a.topbar-link', {
            href: 'https://github.com/pbrinkmeier/tichy-clicker',
            // The target attribute sets where to open the link, in this case in a new tab
            target: '_blank'
          }, 'GitHub'),
          h('span.topbar-link', 'How to play'),
          h('span.topbar-link', 'About')
        ])
      ])
    ]),
    textView('How to play', 'Click the image in the center to earn commits. To earn more, use them to buy systems, which generate commits over time, or skills, which give you more commits per click. That\'s it, have fun!')
  ]);
};
