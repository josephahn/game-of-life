$(function() {

  // Constants
  var cellSize = 16;
  var canvasSize = 512;
  var n = canvasSize / cellSize;

  var matrix = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    matrix.push(row);
  }

  // Draw canvas
  var draw = function() {
    var canvas = document.getElementById("world");
    // TODO: remove context from window
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
  var fill = function(x, y) {
    console.log(' >>> filling ' + x + ' ' + y);
    // Note: switch x and y when accessing elements in nested arrays
    if (matrix[y][x]) {
      context.fillStyle = '#000';
      matrix[y][x] = 0;
    } else {
      context.fillStyle = '#00CD00';
      matrix[y][x] = 1;
    }
    context.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 1, cellSize - 1);
  };

  // Count a cell's living neighbors
  var countNeighbors = function(x, y) {
    // check all neighboring cells assuming they are in bounds
    // return count
    var count = 0;
  };

  // Calculate next generation
  var nextGeneration = function() {
    var next = [];
    // loop through all cells
    // countNeighbors
    // if alive / dead... follow rules of game
    return next;

  };

  // Start animation
  var start = function() {
    console.log('start');
    // loop through all living cells
    // calculate next generation board

    // matrix = nextGeneration();
    // clear();
    // draw();
    // setInterval upate
  };

  // Stop animation
  var stop = function() {
    console.log('stop');
  };

  // Clear canvas
  var clear = function() {
    console.log('clear');
    context.clearRect(0, 0, canvasSize, canvasSize);
    // return to default style
    context.fillStyle = '#000';
    draw();
    // new matrix
  };

  // Attach click listeners
  $('body').on('click', '#world', function(e) {

    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var cellX = Math.floor(mouseX / cellSize);
    var cellY = Math.floor(mouseY / cellSize);

    fill(cellX, cellY);
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
