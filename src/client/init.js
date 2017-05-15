'use strict';

var availableSystems = require('../../resources/systems.json');
var availableUpgrades = require('../../resources/upgrades.json');

module.exports = function init () {
	var systems = {};
  var upgrades = {};
	availableSystems.systems.forEach(function (system) {
		systems[system.key] = 0;
	});
  availableUpgrades.upgrades.forEach(function (upgrade) {
    upgrades[upgrade.key] = 0;
  });

	return {
		counter: 0,
		systems: systems,
    upgrades: upgrades
	};
};
