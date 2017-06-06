'use strict';

var actions = require('../actions.js');
var calculateShopIncome = require('../util/calculate-shop-income.js');
var config = require('../../../resources/config.json');
var floorPlaces = require('../util/floor-places.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json');

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  var incomePerSecond = calculateShopIncome(shops.systems, state.inventory.systems);
  var incomePerClick = 1 + calculateShopIncome(shops.skills, state.inventory.skills);

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', {
        onmousedown: function () {
          actions.increment();
        }
      }, []),
      h('div.clicker-counter', String(floorPlaces(counter, 0))),
      h('div.clicker-incomes', [
        h('span.clicker-income', String(floorPlaces(incomePerSecond, 1)) + '/s'),
        h('span.clicker-income', String(floorPlaces(incomePerClick, 1)) + '/click')
      ]),
      h('div.clicker-controls', config.enabledShops.map(function (shopName) {
        var shop = shops[shopName];
        var buttonText = shop.buttonText;

        return h('button.clicker-controls-shopbutton', {
          onclick: function () {
            actions.setPage('shop/' + shopName);
          }
        }, buttonText);
      }))
    ])
  ]);
};
