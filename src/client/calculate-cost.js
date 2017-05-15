'use strict';

module.exports = function calculateCost (system, count) {
	return Math.ceil(system.initialCost * Math.pow(system.costFactor, count));
};
