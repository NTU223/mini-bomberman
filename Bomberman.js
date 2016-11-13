var speedList = [10, 12, 15, 20];

function Bomberman(x, y, key, color) {
  this.speedIndex = 0;
  this.speed = 10;
  this.scale = 120;
  this.x = x; // Grid position
  this.y = y;
  this.scaledX = (x + 0.5) * this.scale; // Detail position
  this.scaledY = (y + 0.5) * this.scale;
  this.key = key;
  this.color = color;
  this.direction = -1;
  this.bombPower = 2;
  this.remainBomb = 2;
};

Bomberman.prototype.draw = function() {
  var x = this.scaledX / this.scale;
  var y = this.scaledY / this.scale;
  drawCircle(x * size, y * size, size / 2, this.color);
};

Bomberman.prototype.setDirectionDown = function(direction) {
  this.direction = direction;
};

Bomberman.prototype.setDirectionUp = function(direction) {
  if (this.direction == direction)
    this.direction = -1;
};

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
      if (map[this.x][this.y] != undefined && map[this.x][this.y].constructor.name == 'Item')
        map[this.x][this.y].touch(this);
    }
  }
};

Bomberman.prototype.fixPosition = function() {
  this.x = Math.floor(this.scaledX / this.scale);
  this.y = Math.floor(this.scaledY / this.scale);
};

Bomberman.prototype.setBomb = function() {
  if (this.remainBomb > 0 && map[this.x][this.y] == undefined) {
    var bomb = new Bomb(this.x, this.y, this, this.bombPower);
    map[this.x][this.y] = bomb;
    bombs.push(bomb);
    this.remainBomb--;
  }
};

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
  return !(0 <= x && x < rows && 0 <= y && y < cols && (map[x][y] == undefined || map[x][y].constructor.name == 'Item'));
};

Bomberman.prototype.addSpeed = function() {
  if (this.speedIndex < 3)
    this.speed = speedList[++this.speedIndex];
  this.scaledX = Math.round((this.scaledX % this.scale) / this.speed) * this.speed + this.scaledX - this.scaledX % this.scale;
  this.scaledY = Math.round((this.scaledY % this.scale) / this.speed) * this.speed + this.scaledY - this.scaledY % this.scale;
}
