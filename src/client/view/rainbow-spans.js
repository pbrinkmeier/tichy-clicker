'use strict';

var h = require('virtual-dom/h');

module.exports = function rainbowSpans (text) {
  var length = text.length;

  return (
    text.split('')
    .map(function (character, index) {
      var hueValue = 360 * (index / length);
      return h('span', {
        style: {
          color: 'hsl(' + String(hueValue) + ',100%,50%)'
        }
      }, character);
    })
  );
};
