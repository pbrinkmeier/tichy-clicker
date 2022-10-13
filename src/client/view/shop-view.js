'use strict';

var actions = require('../actions.js');
var i18n = require('../util/i18n')
var calculateItemCost = require('../util/calculate-item-cost.js');
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
        }, i18n.tr('back')),
        h('div.shop-menu-info', i18n.tr("num_commits", counter))
      ]),
      h('h2.shop-title', i18n.tr("shop_title_" + shopName)),
      h('div.shop-description', i18n.tr("shop_description_" + shopName)),
      h('ul.shop-items', shop.map(function (item) {
        var alreadyBought = bought[item.key];
        var cost = calculateItemCost(item, alreadyBought);

        return h('li.shop-item', [
          h('div.shop-item-name', i18n.tr("shop_item_text_" + item.key, alreadyBought)),
          h('div.shop-item-description', i18n.tr("shop_item_description_" + item.key)),
          h('button.shop-item-buy', {
            disabled: cost > counter,
            onclick: function (e) {
              /* Do not focus the buy buttons after clicking */
              e.target.blur();
              actions.buy(shopName, item.key);
            }
          }, i18n.tr('buy', cost))
        ]);
      }))
    ])
  ]);
};
