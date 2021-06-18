
class Settings {

    constructor() {
        this.earthGravity = true;
        this.friction = true;
    }

}

settings = new Settings();

function earthGravity() {

    settings.earthGravity = !settings.earthGravity;

    if (settings.earthGravity) {
        earthGravityButton.html("Earth Gravity: Yes");
    } else {
        earthGravityButton.html("Earth Gravity: No");
    }

}

function friction() {

    settings.friction = !settings.friction;

    if (settings.friction) {
        frictionButton.html("Friction: Yes");
    } else {
        frictionButton.html("Friction: No");
    }

}

function simulate() {

  simulating = true;
  for (let setupItem of setupItems) {
    setupItem.hide();
  }

}

function createEntity() {

    new Entity(500, new Colour(random(255), random(255), random(255)), createVector(10000, 10000), 10);
    selectedObj = entities.length;
    updateObject();

}