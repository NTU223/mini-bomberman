function Brick(x, y) {
  this.x = x;
  this.y = y;
};

Brick.prototype.draw = function() {
  drawRectangle(this.x * size, this.y * size, (this.x + 1) * size, (this.y + 1) * size, 'gray');
};

Brick.prototype.remove = function() {
  map[this.x][this.y] = undefined;
};

Brick.prototype.touch = function() {
  this.remove();
};
