'use strict';

module.exports = function calculateItemCost (item, alreadyBought) {
  return Math.ceil(item.initialCost * Math.pow(item.costFactor, alreadyBought));
};
