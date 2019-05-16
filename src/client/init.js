'use strict';

var config = require('../../resources/config.json');
var shops = require('../../resources/shops.json');

module.exports = function init () {
  return {
    page: 'clicker',
		counter: 0,
    ticks: 0,
    inventory: {},
    particles: [],
    events: [],
    rainbowModeTicks: 0
  };
};
