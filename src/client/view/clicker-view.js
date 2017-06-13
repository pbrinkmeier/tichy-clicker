'use strict';

var actions = require('../actions.js');
var calculateItemCost = require('../util/calculate-item-cost.js');
var calculateShopIncome = require('../util/calculate-shop-income.js');
var CanvasHook = require('./canvas/canvas-hook.js');
var config = require('../../../resources/config.json');
var floorPlaces = require('../util/floor-places.js');
var h = require('virtual-dom/h');
var Particle = require('../util/particle.js');
var shops = require('../../../resources/shops.json');

var drawHook = new CanvasHook(function (state, ctx, timeDelta) {
  var factor = timeDelta / 1000;
  var w = ctx.canvas.width;
  var h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  state.particles.forEach(function (particle) {
    Particle.draw(ctx, particle);
    Particle.update(factor, particle);
  });
  state.particles = state.particles.filter(function (particle) {
    return particle.y <= 350;
  });
});

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  var incomePerSecond = calculateShopIncome(shops.systems, state.inventory.systems);
  var incomePerClick = 1 + calculateShopIncome(shops.skills, state.inventory.skills);
  drawHook.setState(state);

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', {
        onmousedown: function () {
          actions.increment();
        }
      }, [
        h('canvas', {
          width: 300,
          height: 300,
          drawHook: drawHook
        })
      ]),
      h('div.clicker-counter', String(floorPlaces(counter, 0))),
      h('div.clicker-incomes', [
        h('span.clicker-income', String(floorPlaces(incomePerSecond, 1)) + '/s'),
        h('span.clicker-income', String(floorPlaces(incomePerClick, 1)) + '/click')
      ]),
      h('div.clicker-controls', config.enabledShops.map(function (shopName) {
        var shop = shops[shopName];
        var buttonText = shop.buttonText;
        var availableItems = shop.items.filter(function (item) {
          var alreadyBought = state.inventory[shopName][item.key];
          var cost = calculateItemCost(item, alreadyBought);
          return cost <= state.counter;
        }).length;

        var buttonContent = [
          h('span', buttonText)
        ];
        if (availableItems !== 0) {
          buttonContent.push(h('div.button-notification', String(availableItems)));
        }

        return h('button.clicker-controls-shopbutton', {
          onclick: function () {
            actions.setPage('shop/' + shopName);
          }
        }, buttonContent);
      }))
    ])
  ]);
};
