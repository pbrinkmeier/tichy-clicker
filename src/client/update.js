'use strict';

var availableSystems = require('../../resources/systems.json');
var calculateCost = require('./calculate-cost.js');
var dispatcher = require('./dispatcher.js');
var getSystemGains = require('./get-system-gains.js');

module.exports = {
	init: function (action, state) {
		window.addEventListener('keydown', function (e) {
			if (e.keyCode === 32) {
				dispatcher.dispatch({
					type: 'increment'
				});
			}
		});
		setInterval(function () {
			dispatcher.dispatch({
				type: 'interval'
			});
		}, 1000 * availableSystems.interval);
	},
	increment: function (action, state) {
		state.counter += 1;
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
		console.log(cost);
		if (cost > state.counter) {
			return;
		}

		state.counter -= cost;
		state.systems[action.key] += 1;
	}
};
