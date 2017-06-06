'use strict';

var actions = require('../actions.js');
var calculateShopIncome = require('../util/calculate-shop-income.js');
var floorPlaces = require('../util/floor-places.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json').shops;
var systemsShop = shops[0];
var skillsShop = shops[1];

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  var incomePerSecond = calculateShopIncome(systemsShop, state.inventory.systems);
  var incomePerClick = 1 + calculateShopIncome(skillsShop, state.inventory.skills);

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
      h('div.clicker-controls', shops.map(function (shop) {
        var buttonText = shop.buttonText;
        var shopName = shop.name;

        return h('button.clicker-controls-shopbutton', {
          onclick: function () {
            actions.setPage('shop/' + shopName);
          }
        }, buttonText);
      }))
    ])
  ]);
};
