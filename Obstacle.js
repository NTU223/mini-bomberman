function Obstacle(x, y) {
  this.x = x;
  this.y = y;
};

Obstacle.prototype.draw = function() {
  drawRectangle(this.x * size, this.y * size, (this.x + 1) * size, (this.y + 1) * size, 'black');
};

Obstacle.prototype.touch = function() {
  // Do nothing.
};
