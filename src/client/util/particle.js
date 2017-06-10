'use strict';

var floorPlaces = require('./floor-places.js');

function Particle (x, y, velX, velY, accX, accY, colour, value) {
  return {
    x: x,
    y: y,
    velX: velX,
    velY: velY,
    accX: accX,
    accY: accY,
    colour: colour,
    value: value
  };
}

Particle.draw = function (ctx, particle) {
  var particleText = '+' + floorPlaces(String(particle.value), 1);
  ctx.font = '32px \'Comic Sans MS\', sans-serif';
  // Rainbow particles for when the time has come
  /*
  for (var i = 0, n = 25; i < n; i++) {
    ctx.fillStyle = 'hsla(' + String((360 / n) * (i + particle.y)) + ', 100%, 50%, ' + String(i / n) + ')';
    ctx.fillText('+' + String(particle.value), particle.x, particle.y - n + i);
  }
  */
  // The text should be centered at the position
  var measurements = ctx.measureText(particleText);
  var posX = particle.x - measurements.width / 2;
  var posY = particle.y;
  // Draw a shadow
  ctx.fillStyle = 'black';
  ctx.fillText(particleText, posX - 1, posY - 1);
  ctx.fillStyle = particle.colour;
  ctx.fillText(particleText, posX, posY);
};

Particle.update = function (f, particle) {
  particle.x += particle.velX * f;
  particle.y += particle.velY * f;
  particle.velX += particle.accX * f;
  particle.velY += particle.accY * f;
};

module.exports = Particle;
