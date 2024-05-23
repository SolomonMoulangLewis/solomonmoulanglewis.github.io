const colorPalettes = {
  thunderstorm: ['#4B0082', '#800080', '#9370DB', '#8A2BE2', '#9400D3', '#9932CC'],
  drizzle: ['#4682B4', '#87CEEB', '#B0C4DE', '#AFEEEE', '#ADD8E6', '#6495ED'],
  rain: ['#00CED1', '#5F9EA0', '#4682B4', '#B0E0E6', '#87CEFA', '#4682B4'],
  snow: ['#E0FFFF', '#AFEEEE', '#ADD8E6', '#F0F8FF', '#E6E6FA', '#B0E0E6'],
  atmosphere: ['#696969', '#A9A9A9', '#808080', '#D3D3D3', '#C0C0C0', '#778899'],
  clear: ['#FFD700', '#FFA500', '#FF6347', '#FF4500', '#FFDAB9', '#FFFACD'],
  clouds: ['#D3D3D3', '#A9A9A9', '#778899', '#B0C4DE', '#696969', '#808080']
};

class circMaker {
  constructor(degrees, speed, weatherType) {
    this.x = random(width);
    this.y = random(height);
    this.w = random(0, 100);
    this.h = random(0, 100);

    this.waveX = 0;
    this.waveY = 0;
    this.waveR = 0;

    this.size = random(0.5, 2);

    this.dir = radians(degrees);
    this.dirX = cos(this.dir) * speed;
    this.dirY = sin(this.dir) * speed;

    this.skewX = noise(this.x * noiseScale, this.y * noiseScale);
    this.skewY = noise(this.x * noiseScale, this.y * noiseScale);

    // Use the weatherType to select the color palette
    let palette = colorPalettes[weatherType.toLowerCase()] || colorPalettes.clear;
    this.c = palette[Math.floor(random(palette.length))];
  }

  display() {
    stroke(this.c);
    strokeWeight(2);
    noFill();

    push();
    translate(this.x, this.y);
    beginShape();

    // Draw
    for (var i = 0; i < 180; i++) {
      this.waveR = wave[i] * 180;
      this.waveX = this.waveR * sin(i);
      this.waveY = this.waveR * cos(i);

      vertex((this.w + this.waveX) * this.size, (this.h + this.waveY) * this.size);
    }

    endShape();
    pop();

    // Move
    this.x += this.dirX * this.skewX;
    this.y += this.dirY * this.skewY;

    // If visuals off screen -> give random position on screen
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }
}
