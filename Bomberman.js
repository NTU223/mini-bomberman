function Bomberman(x, y, key, color) {
  this.speed = 100;
  this.scale = 1000;
  this.x = x; // Grid position
  this.y = y;
  this.scaledX = (x + 0.5) * this.scale; // Detail position
  this.scaledY = (y + 0.5) * this.scale;
  this.key = key;
  this.color = color;
  this.direction = -1;
}

Bomberman.prototype.draw = function() {
  var x = this.scaledX / this.scale;
  var y = this.scaledY / this.scale;
  drawCircle(x * size, y * size, size / 2, this.color);
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
    if (!this.collision()) {
      this.scaledX += this.speed * move[this.direction][0];
      this.scaledY += this.speed * move[this.direction][1];
      this.fixPosition();

      if (this.direction % 2 == 0) {
        if (this.scaledY < (this.y + 0.5) * this.scale)
          this.scaledY += this.speed;
        else if (this.scaledY > (this.y + 0.5) * this.scale)
          this.scaledY -= this.speed;
      } else {
        if (this.scaledX < (this.x + 0.5) * this.scale)
          this.scaledX += this.speed;
        else if (this.scaledX > (this.x + 0.5) * this.scale)
          this.scaledX -= this.speed;
      }
      this.fixPosition();
    }
  }
};

Bomberman.prototype.fixPosition = function() {
  this.x = Math.floor(this.scaledX / this.scale);
  this.y = Math.floor(this.scaledY / this.scale);
}

Bomberman.prototype.setBomb = function() {
  map[this.x][this.y] = new Bomb(this.x, this.y);
}

Bomberman.prototype.collision = function() {
  var x = this.x + move[this.direction][0];
  var y = this.y + move[this.direction][1];

  if (this.direction == 0 && this.scaledX > (this.x + 0.5) * this.scale)
    return false;
  if (this.direction == 2 && this.scaledX < (this.x + 0.5) * this.scale)
    return false;
  if (this.direction == 1 && this.scaledY < (this.y + 0.5) * this.scale)
    return false;
  if (this.direction == 3 && this.scaledY > (this.y + 0.5) * this.scale)
    return false;
  return !(0 <= x && x < rows && 0 <= y && y < cols && map[x][y] == undefined);
}
