// Physics Simulation Engine
// Eric James
// May Wed. 19 2021
//

let pixelForMeterRatio = 0.01;
let forceColour;
let simulating = false;
let setupItems = [];
let canvas;
let settings;
let earthGravityButton;
let frictionButton;

function setup() {
  canvas = createCanvas(0, 0);
  let colour = new Colour(0, 255, 0);
  forceColour = new Colour(255, 0, 0);
  for (let i=0; i<1; i++) {
    colour = new Colour(random(0, 255), random(0, 255), random(0, 255));
    new Entity(1000, colour, createVector(70000, 10000), 6);

  }

  canvas.hide();

  // earth gravity button
  earthGravityButton = createButton("Earth Gravity: Yes");
  earthGravityButton.mousePressed(earthGravity);
  setupItems.push(earthGravityButton);

  // friction button
  frictionButton = createButton("Friction: Yes");
  frictionButton.mousePressed(friction);
  setupItems.push(frictionButton);

  setupItems.push(createButton("Simulate").mousePressed(simulate))

}

function draw() {

  background(0);

  if (simulating) {
    // draw

    //stroke(255);
    //line(width-300, height, width, height-173.205);
    //stroke(0);
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      entity.draw();
    }

    //updates
    for (let entity of entities) {

      // earth gravity
      if (settings.earthGravity) {

        entity.applyForce(createVector(0, 9.8).mult(entity.m));
      }
      entity.update();
    }

    // wind
    if (mouseIsPressed) {

      for (let entity of entities) {
    
        entity.applyForce(createVector(6, 0));
      }

    }
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
