let clouds = [];
let cloudDensity = 50;
let windDir = 0;

let windSpeed = 0.01;

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-holder');
  
  windSpeed = random(0.1, 0.5);

  //create clouds
  for(let i = 0; i < cloudDensity; i++){
    clouds.push(new cloudMaker(windDir, windSpeed));
  }
}

function draw(){
  /* background(50, 89, 100); */
  clear();
  for (let i = 0; i < clouds.length; i++){
    /* noFill(); */
    fill(255, 255, 255, 10);
    noStroke();
    clouds[i].move();
    clouds[i].display();
  }
  /* noFill(); */
}

class cloudMaker{
  constructor(degrees, speed){
    this.x = random(width);
    this.y = random(height);
    this.w = random(50,200);
    this.h = random(50,200);

    this.degX = cos(degrees*(PI/180)) * speed;
    this.degY = sin(degrees*(PI/180)) * speed;

    this.speed = speed;
  }

  move(){
    this.x += random(-this.speed, this.speed) + this.degX;
    this.y += random(-this.speed, this.speed) + this.degY;
  }

  display(){
    ellipse(this.x, this.y, this.w, this.h);
    if (this.x <= -this.w || this.x >= width && this.y <= -this.h || this.y >= height){

      //Update X
      if (Math.sign(this.degX) == 1) {
        this.x = random(0, width/3);
      } else if (Math.sign(this.degX) == -1) {
        this.x = random(width/3, width);
      }
      //Update Y
      if (Math.sign(this.degY) == 1) {
        this.y = random(0, width/3);
      } else if (Math.sign(this.degY) == -1) {
        this.y = random(width/3, width);
      }

      //this.x = random(width);
      //this.y = random(height);
    }
  }
}