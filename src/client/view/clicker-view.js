'use strict';

var actions = require('../actions.js');
var h = require('virtual-dom/h');
var shops = require('../../../resources/shops.json').shops;

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  var incomePerSecond = null;
  var incomePerClick = null;

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', {
        onclick: function () {
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
