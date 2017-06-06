'use strict';

var actions = require('../actions.js');
var calculateShopIncome = require('../util/calculate-shop-income.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json').shops;
var systemsShop = shops[0];
var skillsShop = shops[1];

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  // TODO
  var incomePerSecond = calculateShopIncome(systemsShop, state.inventory.systems);
  var incomePerClick = calculateShopIncome(skillsShop, state.inventory.skills);

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', {
        onmousedown: function () {
          actions.increment();
        }
      }, []),
      h('div.clicker-counter', String(counter)),
      h('div.clicker-incomes', [
        h('span.clicker-income', String(incomePerSecond) + '/s'),
        h('span.clicker-income', String(incomePerClick) + '/click')
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
