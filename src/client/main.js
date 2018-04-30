'use strict';

var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

var dispatcher = require('./dispatcher.js');
var init = require('./init.js');
var render = require('./render.js');
var update = require('./update.js');

var defaults = init();

var stored = JSON.parse(window.localStorage.getItem('store') || "{}");
var state = Object.assign(defaults, stored);

dispatcher.register(function (action) {
  if (action.type in update) {
    update[action.type](action, state);
    localStorage.setItem('store', JSON.stringify(state));

    rerender();
  } else {
    console.log('Unrecognized action', action);
  }
});

var tree = render(state);
var rootNode = createElement(tree);
document.body.appendChild(rootNode);

dispatcher.dispatch({ type: 'init' });

function rerender () {
  var newTree = render(state);
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}
