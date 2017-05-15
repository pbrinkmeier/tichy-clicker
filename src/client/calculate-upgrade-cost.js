'use strict';

module.exports = function calculateUpgradeCost (upgrade, count) {
  return Math.ceil(upgrade.initialCost * Math.pow(upgrade.costFactor, count));
};
