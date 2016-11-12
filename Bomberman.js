function Bomberman(x, y, key, color) {
  this.x = x;
  this.y = y;
  this.key = key;
  this.color = color;
  this.speed = 0.1;
  this.direction = -1;
}

Bomberman.prototype.draw = function() {
  drawCircle(this.x * size, this.y * size, size / 2, this.color);
};

Bomberman.prototype.setDirectionDown = function(direction) {
  this.direction = direction;
}

Bomberman.prototype.setDirectionUp = function(direction) {
  if (this.direction == direction)
    this.direction = -1;
}

Bomberman.prototype.move = function() {
  if (this.direction != -1) {
    if (!this.collision(this.x, this.y, this.direction)) {
      this.x += this.speed * move[this.direction][0];
      this.y += this.speed * move[this.direction][1];

      if (this.direction % 2 == 0) {
        if (this.y < Math.floor(this.y) + 0.5)
          this.y += this.speed;
        else if (this.y > Math.floor(this.y) + 0.5)
          this.y -= this.speed;
      } else {
        if (this.x < Math.floor(this.x) + 0.5)
          this.x += this.speed;
        else if (this.x > Math.floor(this.x) + 0.5)
          this.x -= this.speed;
      }
    }
  }
  this.fixPosition();
};

Bomberman.prototype.fixPosition = function() {
  function fix(val) {
    return Math.round(val * 10) / 10;
  }

  this.x = fix(this.x);
  this.y = fix(this.y);
}

Bomberman.prototype.setBomb = function() {
  map[Math.floor(this.x)][Math.floor(this.y)] = 1;
}

Bomberman.prototype.collision = function(ox, oy, direction) {
  x = Math.floor(ox) + move[direction][0];
  y = Math.floor(oy) + move[direction][1];
  if (direction == 0 && ox > Math.floor(ox) + 0.5)
    return false;
  if (direction == 2 && ox < Math.floor(ox) + 0.5)
    return false;
  if (direction == 1 && oy < Math.floor(oy) + 0.5)
    return false;
  if (direction == 3 && oy > Math.floor(oy) + 0.5)
    return false;
  return !(0 <= x && x < rows && 0 <= y && y < cols && map[x][y] == undefined);
}
