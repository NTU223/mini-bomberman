function Bomb(x, y) {
  this.x = x;
  this.y = y;
};

Bomb.prototype.draw = function() {
  drawCircle(this.x * size + size / 2, this.y * size + size / 2, size / 2, 'black');
};