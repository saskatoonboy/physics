class Colour {
    
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    getRed() {
        return this.red;
    }
    getGreen() {
        return this.green;
    }
    getBlue() {
        return this.blue;
    }

    random() {
        this.red = random(100, 255);
        this.green = random(100, 255);
        this.blue = random(100, 255);
    }

}