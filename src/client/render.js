'use strict';

var h = require('virtual-dom/h');

var availableSystems = require('../../resources/systems.json');
var availableUpgrades = require('../../resources/upgrades.json');
var calculateCost = require('./calculate-cost.js');
var calculateUpgradeCost = require('./calculate-upgrade-cost.js');
var dispatcher = require('./dispatcher.js');
var getSystemGains = require('./get-system-gains.js');
var getUpgradeGains = require('./get-upgrade-gains.js');
var roundPlaces = require('./round-places.js');

var systems = availableSystems.systems;
var upgrades = availableUpgrades.upgrades;

module.exports = function render (state) {
  return h('div.container', [
    h('h1.app-title', 'Tichy-Clicker'.split('').map(function (character, index, array) {
      return h('span', {
        style: {
          color: 'hsl(' + (index / array.length) * 360 + ',100%,50%)'
        },
      }, character);
    })),
    h('div.cols', [
      h('div.systems', [
        h('h2.section-header', 'Systems'),
        h('p.section-intro', 'Generate commits over time'),
        h('ul.systems-list', systems.map(function (system) {
          var count = state.systems[system.key];
          var cost = calculateCost(system, count);

          return h('li.system', [
            h('div.system-name', system.displayText + ' (' + count + ')'),
            h('div.system-desc', 'Generates ' +  system.gain + ' commits per second'),
            h('button.system-buy', {
              onclick: function (e) {
                // Unfocus the button, so that the spacebar does not yield more buys
                e.target.blur();

                dispatcher.dispatch({
                  type: 'buySystem',
                  key: system.key
                });
              },
              disabled: cost > state.counter
            }, 'Buy (' + cost + 'cm.)')
          ]);
        }))
      ]),
      h('div.clickarea', [
        h('div.clicker', {
          onclick: function () {
            dispatcher.dispatch({ type: 'increment' });
          }
        }),
        h('div.counter', String(roundPlaces(0, state.counter)) + ' commits'),
        h('div.system-gain',
          roundPlaces(1, getSystemGains(systems, state.systems, 1)) + '/s ' +
          getUpgradeGains(upgrades, state.upgrades) + '/click'
        ),
        h('p.section-intro.spacebar-hint', 'Instead of clicking the picture, you can use the spacebar')
      ]),
      h('div.upgrades', [
        h('h2.section-header', 'Skills'),
        h('p.section-intro', 'Generate more commits per click'),
        h('ul.upgrades-list', upgrades.map(function (upgrade) {
          var count = state.upgrades[upgrade.key];
          var cost = calculateUpgradeCost(upgrade, count);

          return h('li.upgrade', [
            h('div.upgrade-name', upgrade.displayText + ' (' + count + ')'),
            h('div.upgrade-desc', 'Generates ' + upgrade.gain + ' commit(s) per click'),
            h('button.upgrade-buy', {
              onclick: function (e) {
                // Unfocus the button, so that the spacebar does not yield more buys
                e.target.blur();

                dispatcher.dispatch({
                  type: 'buyUpgrade',
                  key: upgrade.key
                });
              },
              disabled: cost > state.counter
            }, 'Develop (' + cost + 'cm.)')
          ]);
        }))
      ])
    ])
  ]);
};
