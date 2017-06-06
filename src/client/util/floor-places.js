'use strict';

module.exports = function floorPlaces (x, places) {
  var f = Math.pow(10, places);
  return Math.floor(x * f) / f;
};
