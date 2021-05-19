// First Project
// Eric James
// Sept. Thrus. 5th 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cannon;
let bullets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cannon = new Cannon();
}

function draw() {
  background(220);
  cannon.display();
  updateBullets();
}

function mouseClicked() {
  cannon.fire();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateBullets() {
  for (let thisBullet of bullets) {
    thisBullet.display();
  }
}

class Cannon {

  constructor() {
    this.x = 75;
    this.y = height-150;
    this.width = 50;
    this.length = 125;
    this.angle = 0;
  }

  display() {
    push(); // save the transmormation matrix
    translate(this.x, this.y);
    fill(0);

    this.angle = atan2(mouseY - this.y, mouseX - this.x);

    rotate(this.angle);
    rect(0, 0-this.width/2, this.length, this.width);
    pop(); // load saved transmormation matrix
  }

  fire() {
    let thisBullet = new Bullet(cannon.x, cannon.y, cannon.width, cannon.angle, 25);

    bullets.push(thisBullet);
  }
}

class Bullet {

  constructor(x, y, d, a, speed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.a = a;
    this.speed = speed;
  }

  display() {
    fill(255, 0, 0);
    this.x += this.speed * cos(this.a);
    this.y += this.speed * sin(this.a);
    circle(this.x, this.y, this.d);
  }
}
