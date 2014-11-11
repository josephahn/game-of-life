$(function() {

  // Constants
  var _started = false;
  var cellSize = 16;
  var canvasSize = 528;
  var n = canvasSize / cellSize;
  var timer;
  var counter = 0;
  var $counter = $('#counter');

  var world = [];

  var canvas = document.getElementById("world");
  var context = canvas.getContext("2d");

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
  var fill = function(r, c) {
    if (world[r][c]) {
      context.fillStyle = '#000';
      world[r][c] = 0;
    } else {
      context.fillStyle = '#00CD00';
      world[r][c] = 1;
    }
    context.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 1, cellSize - 1);
  };

  // Count a cell's living neighbors
  var countNeighbors = function(r, c) {
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
    var next = generate(n, n);
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        var neighbors = countNeighbors(r, c);
        if (world[r][c]) {
          if (neighbors < 2) {
            next[r][c] = 0;
          } else if (neighbors > 3) {
            next[r][c] = 0;
          } else {
            next[r][c] = 1;
          }
        } else {
          if (neighbors === 3) {
            next[r][c] = 1;
          } else {
            next[r][c] = 0;
          }
        }
      }
    }
    return next;

  };

  // Update animation
  var update = function() {
    var newWorld = nextGeneration();
    redraw();
    draw();
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (newWorld[i][j]) {
          fill(i, j);
        }
      }
    }
    world = newWorld;
    counter++;
    $counter.text(counter);
  };

  // Start animation
  var start = function() {
    _started = true;
    update();
    timer = setInterval(update, 400);
  };

  // Stop animation
  var stop = function() {
    _started = false;
    clearInterval(timer);
  };

  // Redraw board
  var redraw = function() {
    context.clearRect(0, 0, canvasSize, canvasSize);
    // return to default style
    context.fillStyle = '#000';
    draw();
    world = generate(n, n);
  }

  // Clear canvas
  var clear = function() {
    redraw();
    counter = 0;
    $counter.text(counter);
  };

  // Attach click listeners
  $('body').on('click', '#world', function(e) {

    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var cellX = Math.floor(mouseX / cellSize);
    var cellY = Math.floor(mouseY / cellSize);

    // Note: switch x and y to work as rows and columns
    fill(cellY, cellX);
  });

  $('body').on('click', 'button[name=start]', function() {
    if (!_started) {
      start();
    }
  });

  $('body').on('click', 'button[name=stop]', function() {
    stop();
  });

  $('body').on('click', 'button[name=clear]', function() {
    clear();
  });

  draw();

  // Initialize with pulsar pattern
  // http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns
  var coordinates = [[18,15],[19,15],[20,15],[18,17],[19,17],[20,17],[17,12],[17,13],[17,14],[17,18],[17,19],[17,20],[18,10],[19,10],[20,10],[22,12],[22,13],[22,14],[22,18],[22,19],[22,20],[18,22],[19,22],[20,22],[15,12],[15,13],[15,14],[12,15],[13,15],[14,15],[12,17],[13,17],[14,17],[15,18],[15,19],[15,20],[10,18],[10,19],[10,20],[12,22],[13,22],[14,22],[12,10],[13,10],[14,10],[10,12],[10,13],[10,14]];
  coordinates.forEach(function(arr) {
    fill(arr[0], arr[1]);
  });

});
