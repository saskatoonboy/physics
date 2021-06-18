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
let selector;
let createEntityButton;
let selectedObj = 0;
let massInput;
let positionXInput;
let positionYInput;
let velocityInput;
let velocityDegInput;
let accelerationInput;
let accelerationDegInput;

function setup() {
  canvas = createCanvas(windowWidth-300, windowHeight-100);
  canvas.class("inline");

  let div = createDiv();
  div.class("main-div")

  // earth gravity button
  earthGravityButton = createButton("Earth Gravity: Yes");
  earthGravityButton.mousePressed(earthGravity);
  earthGravityButton.class("inline")
  earthGravityButton.parent(div);
  setupItems.push(earthGravityButton);

  // friction button
  frictionButton = createButton("Friction: Yes");
  frictionButton.mousePressed(friction);
  frictionButton.class("inline")
  frictionButton.parent(div);
  setupItems.push(frictionButton);

  setupItems.push(createButton("Simulate").mousePressed(simulate).class("inline").parent(div))

  createEntityButton = createButton("Create Object");
  createEntityButton.mousePressed(createEntity);
  createEntityButton.class("inline");
  createEntityButton.parent(div);
  setupItems.push(createEntityButton);

  let velocityDiv = createDiv();
  velocityDiv.parent(div);
  velocityDiv.class("text-div")
  let velocityText = createP("Velocity: ");
  velocityText.parent(velocityDiv);

  velocityInput = createInput();
  velocityInput.size(120);
  velocityInput.parent(velocityDiv);
  velocityInput.changed(modifyObject);

  velocityDegInput = createInput();
  velocityDegInput.size(30);
  velocityDegInput.parent(velocityDiv);
  velocityDegInput.changed(modifyObject);

  let accelerationDiv = createDiv();
  accelerationDiv.parent(div);
  accelerationDiv.class("text-div")
  let accelerationText = createP("Acceleration: ");
  accelerationText.parent(accelerationDiv);

  accelerationInput = createInput();
  accelerationInput.size(120);
  accelerationInput.parent(accelerationDiv);
  accelerationInput.changed(modifyObject);

  accelerationDegInput = createInput();
  accelerationDegInput.size(30);
  accelerationDegInput.parent(accelerationDiv);
  accelerationDegInput.changed(modifyObject);

  let postitionDiv = createDiv();
  postitionDiv.parent(div);
  postitionDiv.class("text-div")
  let postitionText = createP("Postition: ");
  postitionText.parent(postitionDiv);

  positionXInput = createInput();
  positionXInput.size(75);
  positionXInput.parent(postitionDiv);
  positionXInput.changed(modifyObject);

  positionYInput = createInput();
  positionYInput.size(75);
  positionYInput.parent(postitionDiv);
  positionYInput.changed(modifyObject);

  let massDiv = createDiv();
  massDiv.parent(div);
  massDiv.class("text-div")
  let massText = createP("Mass: ");
  massText.parent(massDiv);

  massInput = createInput();
  massInput.parent(massDiv);
  massInput.changed(modifyObject);




  // selector = createSelect();
  // selector.option("obj 1");
  // selector.option("obj 2");
  // selector.option("obj 3");
  // selector.option("obj 4");
  // selector.option("obj 5");
  // selector.selected("obj 1");
  // selector.parent(div);
  // setupItems.push(selector);

}

function draw() {

  background(0);

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    entity.draw();
  }

  if (simulating) {

    //updates
    for (let entity of entities) {

      // earth gravity
      if (settings.earthGravity) {

        entity.applyForce(createVector(0, 9.8).mult(entity.m));
      }

      if (selectedObj > 0) {
        updateObject()
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

function updateObject() {

  let entity = entities[selectedObj-1];

  massInput.value(entity.m);
  velocityInput.value(entity.v.mag());
  velocityDegInput.value(degrees(entity.v.heading())*-1);
  accelerationInput.value(entity.a.mag());
  accelerationDegInput.value(degrees(entity.a.heading())*-1);
  positionXInput.value(entity.d.x);
  positionYInput.value(entity.d.y*-1+height/pixelForMeterRatio);

}

function mousePressed() {

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    if (collidePointCircle(mouseX, mouseY, entity.d.x*pixelForMeterRatio, entity.d.y*pixelForMeterRatio, entity.size*pixelForMeterRatio)) {

      selectedObj = i+1;
      updateObject();

    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth-100, windowHeight-100);
}

function modifyObject() {

  let entity = entities[selectedObj-1];

  entity.m = parseInt(massInput.value());
  entity.v.x = 1;
  entity.v.setMag(parseInt(velocityInput.value())*-1);
  entity.v.setHeading(radians(parseInt(velocityDegInput.value()))*-1);
  entity.a.x = 1;
  entity.a.setMag(parseInt(velocityInput.value())*-1);
  entity.a.setHeading(radians(parseInt(velocityDegInput.value()))*-1);
  entity.d.x = parseInt(positionXInput.value());
  entity.d.y = parseInt(positionYInput.value()*-1+height/pixelForMeterRatio);

}
