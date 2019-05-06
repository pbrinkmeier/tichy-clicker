'use strict';

var floorPlaces = require('./floor-places.js');

function Event (x, y, velX, velY, accX, accY, colour, value) {
  return {
    x: x,
    y: y,
    velX: velX,
    velY: velY,
    accX: accX,
    accY: accY
  };
}

Event.draw = function (ctx, event) {
  ctx.fillStyle = 'black';
  ctx.fillRect(event.x, event.y, 20, 20);
};

Event.update = function (f, event) {
  event.x += event.velX * f;
  event.y += event.velY * f;
  event.velX += event.accX * f;
  event.velY += event.accY * f;
};

module.exports = Event;
