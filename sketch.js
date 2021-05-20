// Physics Simulation Engine
// Eric James
// May Wed. 19 2021
//

let pixelForMeterRatio = 0.01;
let forceColour;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let colour = new Colour(0, 255, 0);
  forceColour = new Colour(255, 0, 0);
  for (let i=1; i<20; i++) {
    colour = new Colour(random(0, 255), random(0, 255), random(0, 255));
    new Entity(1000, colour, createVector(random(0, 50)*1000, random(0, 50)*1000), floor(random(1,10)));

  }
}

function draw() {

  background(255);

  // draw
  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    entity.draw();
  }

  //updates
  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    entity.applyForce(createVector(0, 9.8).mult(entity.m));
    entity.update();
  }
  if (mouseIsPressed) {

    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      entity.applyForce(createVector(6, 0));
    }

  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
