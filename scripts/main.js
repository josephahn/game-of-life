$(function() {

  // Constants
  var cellSize = 16;
  var canvasSize = 512;
  var n = canvasSize / cellSize;

  var world = [];

  // Generate new matrix
  var generate = function(m, n) {
    var matrix = [];
    for (var i = 0; i < m; i++) {
      var row = [];
      for (var j = 0; j < n; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return matrix;
  };

  world = generate(n, n);

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
    console.log(' >>> filling ' + y + ' ' + x);
    // Note: switch x and y when accessing elements in nested arrays
    if (world[y][x]) {
      context.fillStyle = '#000';
      world[y][x] = 0;
    } else {
      context.fillStyle = '#00CD00';
      world[y][x] = 1;
    }
    context.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 1, cellSize - 1);
  };

  // Count a cell's living neighbors
  var countNeighbors = window.countNeighbors = function(r, c) {
    var count = 0;
    var rOptions = [r-1, r, r+1];
    var cOptions = [c-1, c, c+1];

    for (var i = 0; i < rOptions.length; i++) {
      var row = rOptions[i];
      for (var j = 0; j < cOptions.length; j++) {
        var col = cOptions[j];
        // check to see if row and column in bounds
        if ((row >= 0 && row < n) && (col >= 0 && col < n)) {
          // the cell itself cannot be its own neighbor
          if (!(rOptions[i] === r && cOptions[j] === c) && world[rOptions[i]][cOptions[j]]) {
            count++;
          }
        }
      }
    }

    return count;
  };

  // Calculate next generation
  var nextGeneration = function() {
    var next = [];
    // loop through all cells
    // countNeighbors
    // if alive / dead... follow rules of game
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        countNeighbors(r, c);
      }
    }
    return next;

  };

  // Start animation
  var start = function() {
    console.log('start');
    var newWorld = nextGeneration();
    clear();
    draw();
    console.log(newWorld);
    // loop through newWorld & fill in living
    // world = newWorld;
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
    world = generate(n, n);
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
  window.world = world;

});
