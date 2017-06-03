'use strict';

var actions = require('./actions.js');
var calculateShopIncome = require('./util/calculate-shop-income.js');
var config = require('../../resources/config.json');
var dispatcher = require('./dispatcher.js');
var shops = require('../../resources/shops.json').shops;

var KEYCODE_SPACEBAR = 32;
var KEYCODE_ENTER = 13;

module.exports = {
  init: function (action, state) {
    setInterval(function () {
      actions.interval();
    }, 1000 * config.interval);

    window.addEventListener('keyup', function (e) {
      if (e.keyCode === KEYCODE_SPACEBAR || e.keyCode === KEYCODE_ENTER) {
        actions.increment();
      }
    });

    window.state = state;
  },
  increment: function (action, state) {
    var systemsShop = shops.find(function (shop) {
      return shop.name === 'systems';
    });
    var income = calculateShopIncome(systemsShop, state.inventory.systems);
    state.counter += 1 + income;
  },
  interval: function (action, state) {
    var skillsShop = shops.find(function (shop) {
      return shop.name === 'skills';
    });
    var income = calculateShopIncome(skillsShop, state.inventory.skills);
    state.counter += income * config.interval;
  },
  setPage: function (action, state) {
    state.page = action.path;
  }
  /* TODO: insert buy action */
};
