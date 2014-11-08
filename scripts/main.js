$(function() {

  // Constants
  var cellSize = 16;
  var canvasSize = 512;

  // Draw canvas
  var draw = function() {
    var canvas = document.getElementById("world");
    var context = window.context = canvas.getContext("2d");

    context.fillRect(0, 0, canvasSize, canvasSize);

    for (var x = 0.5; x < canvasSize; x += cellSize) {
      context.moveTo(x, 0);
      context.lineTo(x, canvasSize);
    }

    for (var y = 0.5; y < canvasSize; y += cellSize) {
      context.moveTo(0, y);
      context.lineTo(canvasSize, y);
    }

    context.strokeStyle = '#474747';
    context.stroke();
  };

  // Fill in cell
  var fill = function(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };

  // Start animation
  var start = function() {
    console.log('start');
  };

  // Stop animation
  var stop = function() {
    console.log('stop');
  };

  // Clear canvas
  var clear = function() {
    console.log('clear');
  };

  // Attach click listeners
  $('body').on('click', '#world', function(e) {

    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var cellX = Math.floor(mouseX / cellSize);
    var cellY = Math.floor(mouseY / cellSize);

    fill(cellX, cellY, "#00CD00");
  });

  $('body').on('click', 'button[name=start]', function() {
    start();
  });

  $('body').on('click', 'button[name=stop]', function() {
    stop();
  });

  $('body').on('click', 'button[name=clear]', function() {
    clear()
  });

  draw();

});
