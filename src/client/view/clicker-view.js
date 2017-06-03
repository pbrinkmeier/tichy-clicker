'use strict';

var h = require('virtual-dom/h');

module.exports = function clickerView (state) {
  // Convention: create a variable for every value that the view depends on
  var counter = null;
  var incomePerSecond = null;
  var incomePerClick = null;

  return h('section.main.clicker', [
    h('div.container', [
      h('div.clicker-clickarea', []),
      h('div.clicker-counter', String(counter)),
      h('div.clicker-incomes', [
        h('span.clicker-income', String(incomePerSecond) + '/s'),
        h('span.clicker-income', String(incomePerClick) + '/click')
      ]),
      h('div.clicker-controls', [
        h('button.clicker-controls-shopbutton', 'Buy systems'),
        h('button.clicker-controls-shopbutton', 'Develop skills')
      ])
    ])
  ]);
};
