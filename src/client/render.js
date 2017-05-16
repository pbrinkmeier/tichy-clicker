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
    h('h1.app-title', 'Tichy-Clicker'),
    h('div.cols', [
      h('div.systems', [
        h('h2.section-header', 'Systems'),
        h('ul.systems-list', systems.map(function (system) {
          var count = state.systems[system.key];
          return h('li.system', [
            h('div.system-name', system.displayText + ' (' + count + ')'),
            h('button.system-buy', {
              onclick: function () {
                dispatcher.dispatch({
                  type: 'buySystem',
                  key: system.key
                });
              }
            }, 'Buy (' + calculateCost(system, count) + 'cm.)')
          ]);
        }))
      ]),
      h('div.clickarea', [
        h('div.clicker', {
          onclick: function () {
            dispatcher.dispatch({ type: 'increment' });
          }
        }),
        h('div.counter', String(roundPlaces(1, state.counter)) + ' commits'),
        h('div.system-gain',
          getSystemGains(systems, state.systems, 1) + '/s ' +
          getUpgradeGains(upgrades, state.upgrades) + '/click'
        )
      ]),
      h('div.upgrades', [
        h('h2.section-header', 'Skills'),
        h('ul.upgrades-list', upgrades.map(function (upgrade) {
          var count = state.upgrades[upgrade.key];

          return h('li.upgrade', [
            h('div.upgrade-name', upgrade.displayText + ' (' + count + ')'),
            h('button.upgrade-buy', {
              onclick: function () {
                dispatcher.dispatch({
                  type: 'buyUpgrade',
                  key: upgrade.key
                });
              }
            }, 'Develop (' + calculateUpgradeCost(upgrade, count) + 'cm.)')
          ]);
        }))
      ])
    ])
  ]);
};
