'use strict';

function CanvasHook (drawFn) {
  this.setState(null);
  this.setDrawFn(drawFn);
}

CanvasHook.prototype.setState = function (state) {
  this.state = state;
};

CanvasHook.prototype.getState = function () {
  return this.state;
};

CanvasHook.prototype.setDrawFn = function (drawFn) {
  this.drawFn = drawFn;
};

CanvasHook.prototype.getDrawFn = function () {
  return this.drawFn;
};

CanvasHook.prototype.hook = function (canvas) {
  var drawingContext = canvas.getContext('2d');
  var state = this.getState();
  var drawFn = this.getDrawFn();
  var lastRunTime = 0;
  window.requestAnimationFrame(renderLoop);

  function renderLoop (currentTime) {
    var timeDelta = currentTime - lastRunTime;
    lastRunTime = currentTime;
    drawFn(state, drawingContext, timeDelta);
    
    // Only keep drawing if the canvas is still in the page
    if (canvas.parentNode !== null) {
      window.requestAnimationFrame(renderLoop);
    }
  }
};

module.exports = CanvasHook;
