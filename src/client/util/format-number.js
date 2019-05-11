'use strict';

var THOUSAND_DELIM = '.';
var DECIMAL_DELIM = ',';

module.exports = function formatNumber (n, decimalPlaces) {
  var decimals = decimalPlaces > 0 ? DECIMAL_DELIM + String(Math.floor(n * Math.pow(10, decimalPlaces)) % Math.pow(10, decimalPlaces)) : '';
  var wholeNums = String(Math.floor(n));
  var wholeNumsWithDelim = '';

  while (wholeNums.length > 3) {
    wholeNumsWithDelim = THOUSAND_DELIM + wholeNums.slice(-3) + wholeNumsWithDelim;
    wholeNums = wholeNums.slice(0, -3);
  }
  wholeNumsWithDelim = wholeNums + wholeNumsWithDelim;

  return wholeNumsWithDelim + decimals;
};
