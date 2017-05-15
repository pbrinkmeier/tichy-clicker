'use strict';

module.exports = function roundPlaces (places, x) {
  return Math.round(x * Math.pow(10, places)) / Math.pow(10, places);
};
