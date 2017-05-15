'use strict';

var h = require('virtual-dom/h');

var calculateCost = require('./calculate-cost.js');
var dispatcher = require('./dispatcher.js');
var getSystemGains = require('./get-system-gains.js');
var availableSystems = require('../../resources/systems.json');

module.exports = function render (state) {
	return h('div', [
		h('div', availableSystems.systems.map(function (system) {
			return h('div', [
				h('span', system.displayText + ' x' + state.systems[system.key] + ' (' + calculateCost(system, state.systems[system.key]) + ')'),
				h('button', {
					onclick: function () {
						dispatcher.dispatch({
							type: 'buySystem',
							key: system.key
						});
					}
				}, '+')
			]);
		})),
		h('img', {
			onclick: function () {
				dispatcher.dispatch({
					type: 'increment'
				});
			},
			src: './resources/ma_walter_tichy.png'
		}),
		h('h2', String(Math.floor(state.counter * 10) / 10) + ' commits'),
		h('h5', String(getSystemGains(availableSystems.systems, state.systems, 1)) + ' per sec')
	]);
};
