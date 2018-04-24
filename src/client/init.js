'use strict';

var config = require('../../resources/config.json');
var shops = require('../../resources/shops.json');

module.exports = function init () {
  var inventory = {};

  config.enabledShops.forEach(function (shopName) {
    var shopInventory = {};

    shops[shopName].items.forEach(function (item) {
      shopInventory[item.key] = 0;
    });

    inventory[shopName] = shopInventory;
  });

	var defaults = {
    page: 'clicker',
		counter: 0,
    ticks: 0,
    inventory: inventory,
    particles: []
	};

  var stored = JSON.parse(localStorage.getItem('store') || "{}");

  return Object.assign(defaults, stored);
};
