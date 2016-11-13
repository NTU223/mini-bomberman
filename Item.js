function Item(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
};

Item.prototype.draw = function() {
  var padding = 2;
  drawRectangle(this.x * size + padding, this.y * size + padding,
    (this.x + 1) * size - padding, (this.y + 1) * size - padding, 'green');
  if (this.type == 1)
    drawCircle(this.x * size + size / 2, this.y * size + size / 2, size / 4, 'black');
  else if (this.type == 2)
    drawCircle(this.x * size + size / 2, this.y * size + size / 2, size / 4, 'yellow');
  else if (this.type == 3)
    drawCircle(this.x * size + size / 2, this.y * size + size / 2, size / 4, 'blue');
};

Item.prototype.remove = function() {
  map[this.x][this.y] = undefined;
};

Item.prototype.touch = function(toucher) {
  this.remove();
  if (toucher != undefined) {
    if (this.type == 1)
      toucher.remainBomb++;
    else if (this.type == 2)
      toucher.bombPower++;
    else if (this.type == 3)
      toucher.addSpeed();
  }
};
