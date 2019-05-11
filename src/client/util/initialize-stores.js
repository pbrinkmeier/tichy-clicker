var config = require('../../../resources/config.json');
var shops = require('../../../resources/shops.json');

module.exports = function (state) {
  config.enabledShops.forEach(function (shopName) {
    if (!state.inventory.hasOwnProperty(shopName)) {
      state.inventory[shopName] = {};
    }

    shops[shopName].items.forEach(function (shopItem) {
      if (!state.inventory[shopName].hasOwnProperty(shopItem.key)) {
        state.inventory[shopName][shopItem.key] = 0;
      }
    });
  });
};
