class circMaker {
  constructor(degrees, speed) {
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

    this.dispX = random(-1, 1);
    this.dispY = random(-1, 1);

    this.skewX = noise(this.x * noiseScale, this.y * noiseScale);
    this.skewY = noise(this.x * noiseScale, this.y * noiseScale);

    //this.c = colourPallette[round(random(0, colourPallette.length - 1))];
    this.c1 = random(0, 255);
    this.c2 = random(0, 255);
    this.c3 = random(0, 255);
  }
  display() {
    //stroke(this.c);
    stroke(this.c1, this.c2, this.c3);
    strokeWeight(2);
    noFill();

    push();
    beginShape();

    //Draw
    for (var i = 0; i < 180; i++) {
      this.waveR = wave[i] * 180;
      this.waveX = this.waveR * sin(i);
      this.waveY = this.waveR * cos(i);

      vertex(
        (this.w + this.waveX) * this.size,
        (this.h + this.waveY) * this.size
      );
    }

    //Move
    this.x += this.dirX * this.skewX;
    this.y += this.dirY * this.skewY;
    translate(this.x, this.y);

    endShape();
    pop();

    //If visuals off screen -> give random position on screen
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }
}
