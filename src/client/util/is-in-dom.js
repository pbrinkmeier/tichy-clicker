'use strict';

module.exports = function isInDom (element) {
  var currentElement = element;

  while (currentElement !== null) {
    if (currentElement === document) {
      return true;
    }
    currentElement = currentElement.parentNode;
  }

  return false;
};
