let entities = [];
class Entity {

    // colour = colour object of the entity
    // d = postition vector in meters
    // v = velocity vector in meters for second
    // a = acceleration vector in meters for second squared
    // m = mass in kilograms
    // f = net force in newtons
    // size = size in pixels

    constructor(size, colour, position, mass) {
        this.colour = colour;
        this.d = position;
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.m = mass
        this.f = createVector(0, 0);
        this.size = size*mass;
        this.mu = 0.1;
        entities.push(this);
    }

    draw() {
        fill(this.colour.getRed(), this.colour.getGreen(), this.colour.getBlue());
        rect(this.d.x*pixelForMeterRatio, this.d.y*pixelForMeterRatio, this.size*pixelForMeterRatio, this.size*pixelForMeterRatio);
    }

    update() {
        this.v.add(this.a);
        this.d.add(this.v);
        this.a.mult(0);
        this.edges();
        this.friction();
    }

    edges() {

        let y = this.d.y*pixelForMeterRatio;
        let x = this.d.x*pixelForMeterRatio;
        let size = this.size*pixelForMeterRatio;

        if (y >= height - size) {
            this.d.y = (height - size)/pixelForMeterRatio;
            this.v.y *= -1
        } else if (y <= 0) {
            this.d.y = 0;
            this.v.y *= -1;
        }

        if (x >= width - size) {
            this.d.x = (width - size)/pixelForMeterRatio;
            this.v.x *= -1
        } else if (x <= 0) {
            this.d.x = 0;
            this.v.x *= -1;
        }

    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.m);
        this.a.add(f);
    }

    friction() {
        let diff = height - (this.d.y+this.size)*pixelForMeterRatio;
        if (diff < 1) {
            
            let f = this.v.copy();
            let normalF = this.m;
            f.normalize();
            f.mult(-1);
            f.setMag(normalF*this.mu);

            this.applyForce(f);

        }
    }

    setPosition(x, y) {
        this.d.x = x;
        this.d.y = y;
    }

    setVelocity(x, y) {
        this.v.x = x;
        this.v.y = y;
    }

    setAcceleration(x, y) {
        this.a.x = x;
        this.a.y = y;
    }

    selfDestruct() {
        let i = entities.indexOf(this);
        entities.splice(i);
    }

}