'use strict';

var actions = require('../actions.js');
var calculateItemCost = require('../util/calculate-item-cost.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json').shops;

module.exports = function shopView (shopName, state) {
  var shop = shops.find(function (shop) {
    return shop.name === shopName;
  });
  var bought = state.inventory[shopName];
  var counter = state.counter;

  return h('section.main.shop', [
    h('div.container', [
      h('div.shop-menu', [
        h('button.shop-menu-button', {
          onclick: function () {
            actions.setPage('clicker');
          }
        }, 'Back'),
        h('div.shop-menu-info', counter + ' commits')
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
            disabled: cost > state.counter,
            onclick: function () {
              actions.buy(shop.name, item.key);
            }
          }, 'Buy (' + String(cost) + ' commits)')
        ]);
      }))
    ])
  ]);
};
