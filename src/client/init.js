'use strict';

var shops = require('../../resources/shops.json').shops;

module.exports = function init () {
  var inventory = {};

  shops.forEach(function (shop) {
    var shopInventory = {};

    shop.items.forEach(function (item) {
      shopInventory[item.key] = 0;
    });

    inventory[shop.name] = shopInventory;
  });

	return {
    page: 'clicker',
		counter: 0,
    inventory: inventory
	};
};
