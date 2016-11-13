function Bomb(x, y, setter, power) {
  this.x = x;
  this.y = y;
  this.setter = setter;
  this.remainTime = 180;
  this.explosionTime = 25;
  this.power = power;
  this.fireRecord = [];
};

Bomb.prototype.draw = function() {
  if (this.remainTime > 0) {
    drawCircle(this.x * size + size / 2, this.y * size + size / 2, size / 2 - (this.remainTime / 30) % 2, 'black');
  } else {
    this.fireRecord.forEach(function(record) {
      drawRectangle(record.x * size, record.y * size, (record.x + 1) * size, (record.y + 1) * size, '#FE642E');
    });
  }
};

Bomb.prototype.count = function() {
  if (this.remainTime == 0) {
    this.explosion();
  } else {
    this.remainTime--;
  }
};

Bomb.prototype.remove = function() {
  map[this.x][this.y] = undefined;
};

Bomb.prototype.touch = function() {
  this.remainTime = 0;
};

Bomb.prototype.explosion = function() {
  if (this.explosionTime > 0) {
    if (this.fireRecord.length == 0) {
      this.setter.remainBomb++;
      this.fireRecord.push({x: this.x, y: this.y});
      for (var i = 0; i < 4; i++) {
        for (var j = 1; j <= this.power; j++) {
          var x = this.x + move[i][0] * j;
          var y = this.y + move[i][1] * j;
          if (0 <= x && x < rows && 0 <= y && y < cols && map[x][y] != undefined && map[x][y].constructor.name != 'Item') {
            map[x][y].touch();
            break;
          } else if (x < 0 || x >= rows || y < 0 || y >= cols) {
            break;
          } else{
            this.fireRecord.push({x: x, y: y});
          }
        }
      }
    } else {
      this.fireRecord.forEach(function(record) {
        if (map[record.x][record.y] != undefined)
          map[record.x][record.y].touch();
        players.forEach(function(player) {
          if (record.x == player.x && record.y == player.y) {
            var idx = players.indexOf(player);
            players.remove(idx, idx);
          }
        })
      });
    }
  }
  this.explosionTime--;
};
