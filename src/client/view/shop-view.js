'use strict';

var calculateItemCost = require('../util/calculate-item-cost.js');
var h = require('virtual-dom/h');

module.exports = function shopView (state) {
  var shopName = 'systems';
  var shop = {
    title: 'Systems',
    description: 'Generate commits over time',
    items: [
      {
        key: 'maven',
        name: 'Install Maven',
        description: 'Generates 0.2 commits per second',
        initialCost: 10,
        costFactor: 1.1,
        income: 0.2
      },
      {
        key: 'uml',
        name: 'Draw an UML diagram',
        description: 'Generates 1 commit per second',
        initialCost: 100,
        costFactor: 1.2,
        income: 1
      },
      {
        key: 'test',
        name: 'Just a test item',
        description: 'Lorem ipsum dolor sit amet',
        initialCost: 42,
        costFactor: 4.2,
        income: 42
      }
    ]
  };
  var bought = {
    maven: 6,
    uml: 2,
    test: 42
  };
  var counter = null;

  return h('section.main.shop', [
    h('div.container', [
      h('div.shop-menu', [
        h('button.shop-menu-button', 'Back'),
        h('div.shop-menu-info', counter + ' commits')
      ]),
      h('h2.shop-title', shop.title),
      h('div.shop-description', shop.description),
      h('ul.shop-items', shop.items.map(function (item) {
        var alreadyBought = bought[item.key];
        var cost = calculateItemCost(item, alreadyBought);

        return h('li.shop-item', [
          h('div.shop-item-name', item.name + ' (' + alreadyBought + ')'),
          h('div.shop-item-description', item.description),
          h('button.shop-item-buy', 'Buy (' + String(cost) + ' commits)')
        ]);
      }))
    ])
  ]);
};
