var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

function drawRectangle(x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.rect(y1, x1, y2 - y1, x2 - x1);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
  ctx.stroke();
}

function drawCircle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(y, x, r, 0, 2*Math.PI);
  ctx.lineWidth = 1;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
}
