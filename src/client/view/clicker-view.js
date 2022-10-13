'use strict';

var actions = require('../actions.js');
var i18n = require('../util/i18n')
var calculateItemCost = require('../util/calculate-item-cost.js');
var calculateShopIncome = require('../util/calculate-shop-income.js');
var CanvasHook = require('./canvas/canvas-hook.js');
var config = require('../../../resources/config.json');
var h = require('virtual-dom/h');
var Event = require('../util/event.js');
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
  state.events.forEach(function (event) {
    Event.draw(ctx, event);
    Event.update(factor, event);
  });

  state.particles = state.particles.filter(function (particle) {
    return particle.y <= 350;
  });
  state.events = state.events.filter(function (event) {
    return event.y <= 350;
  });
});

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = state.counter;
  var incomePerSecond = calculateShopIncome(shops.systems, state.inventory.systems);
  var incomePerClick = 1 + calculateShopIncome(shops.skills, state.inventory.skills);
  var rainbowModeSeconds = state.rainbowModeTicks / config.ticksPerSecond;
  drawHook.setState(state);

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', {
        onmousedown: function (ev) {
          var rect = ev.target.getBoundingClientRect();
          actions.click(ev.clientX - rect.left, ev.clientY - rect.top);
        }
      }, [
        h('canvas', {
          width: 300,
          height: 300,
          drawHook: drawHook
        })
      ]),
      h('div.clicker-counter', [
        String(i18n.formatNumber(counter, 0)) + ' ',
        h('span.clicker-counter-label', 'Commits')
      ]),
      h('div.clicker-incomes', [
        h('span.clicker-income', String(i18n.formatNumber(incomePerSecond, 1)) + i18n.tr('per_second')),
        ' · ',
        (function () {
          var elBase = 'span.clicker-income';
          var formattedIncome = String(i18n.formatNumber((rainbowModeSeconds === 0 ? 1 : 2) * incomePerClick, 0)) + i18n.tr('per_click');

          if (rainbowModeSeconds === 0) {
            return h(elBase,  formattedIncome);
          }

          return h(elBase + '.-rainbowmode', { attributes: { 'data-seconds': Math.ceil(rainbowModeSeconds) } }, formattedIncome);
        })(),
      ]),
      h('div.clicker-controls', config.enabledShops.map(function (shopName) {
        var shop = shops[shopName];
        // Find all available items
        var availableItems = shop.filter(function (item) {
          var alreadyBought = state.inventory[shopName][item.key];
          var cost = calculateItemCost(item, alreadyBought);
          return cost <= state.counter;
        });

        // This is an array of all the children of the button element
        var buttonContent = [
          h('span', i18n.tr("shop_button_" + shopName))
        ];
        // If there are items in the shop that are buyable, show a notification bubble
        if (availableItems.length !== 0) {
          buttonContent.push(h('div.button-notification', String(availableItems.length)));
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
