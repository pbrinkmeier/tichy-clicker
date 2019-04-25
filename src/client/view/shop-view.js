'use strict';

var actions = require('../actions.js');
var calculateItemCost = require('../util/calculate-item-cost.js');
var floorPlaces = require('../util/floor-places.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json');

module.exports = function shopView (shopName, state) {
  var shop = shops[shopName];
  var bought = state.inventory[shopName];
  var counter = state.counter;

  return h('section.main.shop', [
    h('div.container', [
      h('div.shop-menu', [
        h('button.shop-menu-button', {
          onclick: function () {
            actions.setPage('clicker');
          }
        }, 'Zurück'),
        h('div.shop-menu-info', String(floorPlaces(counter, 0)) + ' Commits')
      ]),
      h('h2.shop-title', shop.title),
      h('div.shop-description', shop.description),
      h('ul.shop-items', shop.items.map(function (item) {
        var alreadyBought = bought[item.key];
        var cost = calculateItemCost(item, alreadyBought);

        return h('li.shop-item', [
          h('div.shop-item-name', item.displayText + ' (' + alreadyBought + ')'),
          h('div.shop-item-description', item.description),
          h('button.shop-item-buy', {
            disabled: cost > counter,
            onclick: function (e) {
              /* Do not focus the buy buttons after clicking */
              e.target.blur();
              actions.buy(shopName, item.key);
            }
          }, 'Kaufen (' + String(cost) + ' commits)')
        ]);
      }))
    ])
  ]);
};
