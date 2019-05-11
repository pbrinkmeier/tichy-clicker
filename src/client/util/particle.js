'use strict';

var formatNumber = require('./format-number.js');

function Particle (x, y, velX, velY, accX, accY, colour, value, rainbowMode) {
  return {
    x: x,
    y: y,
    velX: velX,
    velY: velY,
    accX: accX,
    accY: accY,
    colour: colour,
    value: value,
    rainbowMode: rainbowMode
  };
}

Particle.draw = function (ctx, particle) {
  var particleText = '+' + formatNumber(String(particle.value), 1);
  ctx.font = '32px \'Comic Sans MS\', sans-serif';
  ctx.textAlign = 'center';

  if (particle.rainbowMode) {
    for (var i = 0, n = 25; i < n; i++) {
      ctx.fillStyle = 'hsla(' + String((360 / n) * (i + particle.y)) + ', 100%, 50%, ' + String(i / n) + ')';
      ctx.fillText('+' + String(particleText), particle.x, particle.y - n + i);
    }
  } else {
    var posX = particle.x;
    var posY = particle.y;
    // Draw a shadow
    ctx.fillStyle = 'black';
    ctx.fillText(particleText, posX - 1, posY - 1);
    ctx.fillStyle = particle.colour;
    ctx.fillText(particleText, posX, posY);
  }
};

Particle.update = function (f, particle) {
  particle.x += particle.velX * f;
  particle.y += particle.velY * f;
  particle.velX += particle.accX * f;
  particle.velY += particle.accY * f;
};

module.exports = Particle;
