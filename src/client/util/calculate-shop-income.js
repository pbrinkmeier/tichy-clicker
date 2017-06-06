'use strict';

module.exports = function calculateShopIncome (shop, bought) {
  return (
    shop.items
    .map(function (item) {
      return bought[item.key] * item.income;
    })
    .reduce(sum, 0)
  );
};

function sum (a, b) {
  return a + b;
}
