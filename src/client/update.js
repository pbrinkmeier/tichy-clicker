'use strict';

var availableSystems = require('../../resources/systems.json');
var availableUpgrades = require('../../resources/upgrades.json');
var calculateCost = require('./calculate-cost.js');
var calculateUpgradeCost = require('./calculate-upgrade-cost.js');
var dispatcher = require('./dispatcher.js');
var getSystemGains = require('./get-system-gains.js');
var getUpgradeGains = require('./get-upgrade-gains.js');

module.exports = {
  init: function (action, state) {
    setInterval(function () {
      dispatcher.dispatch({
        type: 'interval'
      });
    }, 1000 * availableSystems.interval);
  },
  increment: function (action, state) {
    var gains = getUpgradeGains(availableUpgrades.upgrades, state.upgrades);
    state.counter += gains;
  },
  interval: function (action, state) {
    var gains = getSystemGains(availableSystems.systems, state.systems, availableSystems.interval);
    state.counter += gains;
  },
  buySystem: function (action, state) {
    var system = availableSystems.systems.find(function (system) {
      return system.key === action.key;
    });
    var cost = calculateCost(system, state.systems[action.key]);
    if (cost > state.counter) {
      return;
    }

    state.counter -= cost;
    state.systems[action.key] += 1;
  },
  buyUpgrade: function (action, state) {
    var upgrade = availableUpgrades.upgrades.find(function (upgrade) {
      return upgrade.key === action.key;
    });
    var cost = calculateUpgradeCost(upgrade, state.upgrades[upgrade.key]);
    if (cost > state.counter) {
      return;
    }

    state.counter -= cost;
    state.upgrades[upgrade.key] += 1;
  }
};
