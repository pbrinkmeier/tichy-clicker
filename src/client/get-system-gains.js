'use strict';

var add = function (a, b) {
	return a + b;
};

module.exports = function (availableSystems, systems, factor) {
	return (
		availableSystems
		.map(function (system) {
			return systems[system.key] * system.gain;
		})
		.reduce(add, 0)
		* factor
	);
};
