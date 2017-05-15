'use strict';

var h = require('virtual-dom/h');

var availableSystems = require('../../resources/systems.json');
var availableUpgrades = require('../../resources/upgrades.json');
var calculateCost = require('./calculate-cost.js');
var dispatcher = require('./dispatcher.js');
var getSystemGains = require('./get-system-gains.js');
var roundPlaces = require('./round-places.js');

var systems = availableSystems.systems;
var upgrades = availableUpgrades.upgrades;

module.exports = function render (state) {
	return h('div.container', [
		h('div.systems', [
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
      h('div.system-gain', getSystemGains(systems, state.systems, 1) + '/s')
    ]),
		h('div.upgrades', [
      h('ul.upgrades-list', upgrades.map(function (upgrade) {
        return h('li.upgrade', [
          h('div.upgrade-name', upgrade.displayText),
          h('button.upgrade-buy', 'Develop')
        ]);
      }))
    ])
	]);
};
