'use strict';

var add = function (a, b) {
  return a + b;
};

module.exports = function getUpgradeGains (availableUpgrades, upgrades) {
  return (
    availableUpgrades
    .map(function (upgrade) {
      return upgrade.gain * upgrades[upgrade.key];
    })
    .reduce(add, 1)
  );
};
