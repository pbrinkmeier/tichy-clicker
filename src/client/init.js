'use strict';

var availableSystems = require('../../resources/systems.json');

module.exports = function init () {
	var systems = {};
	availableSystems.systems.forEach(function (system) {
		systems[system.key] = 0;
	});

	return {
		counter: 0,
		systems: systems
	};
};
