'use strict';

function Event (x, y, velX, velY, accX, accY, colour, value) {
  return {
    x: x,
    y: y,
    velX: velX,
    velY: velY,
    accX: accX,
    accY: accY,
    ticks: 0
  };
}

Event.image = new Image(16, 16);
Event.image.src = './resources/event.png';

Event.draw = function (ctx, event) {
  ctx.save();
  ctx.translate(event.x, event.y);
  /*
  // Uncomment to show hitbox
  ctx.strokeStyle = 'red';
  ctx.strokeRect(-8, -8, 16, 16);
  */
  ctx.rotate((2 * event.y) * (Math.PI / 180));
  ctx.drawImage(Event.image, -8, -8);
  ctx.restore();
};

Event.update = function (f, event) {
  event.x += event.velX * f;
  event.y += event.velY * f;
  event.velX += event.accX * f;
  event.velY += event.accY * f;
  event.ticks++;
};

module.exports = Event;
