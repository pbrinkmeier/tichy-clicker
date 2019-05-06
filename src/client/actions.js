'use strict';

var dispatcher = require('./dispatcher.js');

module.exports = {
  interval: function () {
    dispatcher.dispatch({ type: 'interval' });
  },
  click: function (x, y) {
    dispatcher.dispatch({ type: 'click', x: x, y: y });
  },
  increment: function () {
    dispatcher.dispatch({ type: 'increment' });
  },
  buy: function (shopName, itemKey) {
    dispatcher.dispatch({
      type: 'buy',
      shopName: shopName,
      itemKey: itemKey
    });
  },
  setPage: function (path) {
    dispatcher.dispatch({
      type: 'setPage',
      path: path
    });
  }
};
