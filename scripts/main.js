$(function() {
  var canvas = document.getElementById("world");
  var context = canvas.getContext("2d");

  context.fillRect(0, 0, 512, 512);

  for (var x = 0.5; x < 512; x += 16) {
    context.moveTo(x, 0);
    context.lineTo(x, 512);
  }

  for (var y = 0.5; y < 512; y += 16) {
    context.moveTo(0, y);
    context.lineTo(512, y);
  }

  context.strokeStyle = '#474747';
  context.stroke();

});