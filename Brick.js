function Brick(x, y) {
  this.x = x;
  this.y = y;
  this.remainTime = 5;
  this.touched = false;
};

Brick.prototype.draw = function() {
  drawRectangle(this.x * size, this.y * size, (this.x + 1) * size, (this.y + 1) * size, 'gray');
};

Brick.prototype.remove = function() {
  if (this.touched) {
    if (this.remainTime == 0)
      map[this.x][this.y] = undefined;
    else
      this.remainTime--;
  }
};

var itemProbability = [0.7, 0.4, 0.3, 0.0]; // 30% 30% 10% 30%
Brick.prototype.touch = function() {
  this.touched = true;
  if (Math.random() > 0.50) {
    var tmp = Math.random();
    for (var i = 0; i < 4; i++)
      if (tmp > itemProbability[i]) {
        map[this.x][this.y] = new Item(this.x, this.y, i + 1);
        break;
      }
  }
};
