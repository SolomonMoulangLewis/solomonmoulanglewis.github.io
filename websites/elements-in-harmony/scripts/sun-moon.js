class SunMoon {
  constructor() {
    this.sunS = width / 3;
    this.sunNoise = 0;
  }
  drawSunMoon(fft) {
    this.sunNoise = fft;

    push();
    noStroke();
    //use argument to set fill based on sunset/sunrise
    fill("silver");
    ellipse(
      width / 2,
      height / 2,
      this.sunS + this.sunNoise,
      this.sunS + this.sunNoise
    );
    pop();
  }
}
