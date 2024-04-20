class Ball {
    constructor(x, y) { 
        this.pos = createVector(x, y); 
        // this.size = createVector(random(100, 300), random(100, 300)); 
        this.size = createVector(300, 300); 
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        this.gravity = 0.1;
        this.center = 0; 
        this.pull = 0; 
        this.cornerOne = 0; // Top left 
        this.cornerTwo = 0; // Top right 
        this.cornerThree = 0; // Bottom left 
        this.cornerFour = 0; // Bottom right 
        this.jitter = 0.1; 
        this.growRate = 0.25; 
        this.minSize = 5;
        this.maxSize = 600; 

        this.reachedCorner = false; 
    }
    move() {
        this.pos.add(this.vel); 
        if (this.pos < - 20|| this.pos.x > width + 20 || this.pos.y < - 20|| this.pos.height + 20 ) {
            this.vel.mult(-1);
        }
    }
    update() {
        // center
        // this.center = createVector(width/2, height/2); 
        // this.pull = p5.Vector.sub(this.center, this.pos); 
        // this.pull.setMag(0.01); 
        // this.vel.add(this.pull); 

        // gravity 
        // this.vel.y += this.gravity; 
        // this.pos.y += this.vel.y; 
        // if (this.pos.y > height) {
        //     this.vel.y = -this.vel.y; 
        // }

        // Jitter 
        // let r = random(0, 1); 
        // if (r < this.jitter) {
        //     this.pos.add(random(-100, 100)); 
        // }

        // Grow 
        // this.size.x += this.growRate; 
        // this.size.y += this.growRate; 
        // if (this.size.x > this.maxSize || this.size.y > this.maxSize) {
        //     this.growRate = 0; 
        // }

        // Shrink 
        // this.size.x -= this.growRate; 
        // this.size.y -= this.growRate; 
        // if (this.size.x < 1 || this.size.y < 1) {
        //     this.growRate = 0; 
        // }

        // Orbit 
        
    }
    square() { // FIXXXXX THIS WHY DOES IT KEEP MOVING SO MUCH MAYBE CREATE THE CHECK IN THE MAIN SCRIPT 
        this.cornerOne = createVector(width/4, height/4); 
        this.cornerTwo = createVector(width/4 + width/2, height/4); 
        this.cornerThree = createVector(width/4, height/4 + height/2); 
        this.cornerFour = createVector(width/4 + width/2, height/4 + height/2); 

        let dOne = p5.Vector.dist(this.cornerOne, this.pos); 
        let dTwo = p5.Vector.dist(this.cornerTwo, this.pos); 
        let dThree = p5.Vector.dist(this.cornerThree, this.pos); 
        let dFour = p5.Vector.dist(this.cornerFour, this.pos); 

        if (!this.reachedCorner) {
            if (dOne < width/2 && dOne < height/2) {
                this.pull = p5.Vector.sub(this.cornerOne, this.pos); 
            }
            if (dTwo < width/2 && dTwo < height/2) {
                this.pull = p5.Vector.sub(this.cornerTwo, this.pos); 
            }
            if (dThree < width/2 && dThree < height/2) {
                this.pull = p5.Vector.sub(this.cornerThree, this.pos); 
            }
            if (dFour < width/2 && dFour < height/2) {
                this.pull = p5.Vector.sub(this.cornerFour, this.pos); 
            }
            this.pull.setMag(0.01);
            this.vel.add(this.pull); 
        } 
        // else if (dOne < 50 || dTwo < 50 || dThree < 50 || dFour < 50) {
        //     this.pull.set(0, 0); 
        // }
        // this.vel.add(this.pull);
    }
    display() {
        stroke(255);
        strokeWeight(1); 
        noFill(); 
        ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y); 
    }
}