class Ball {
    constructor(x, y) { 
        this.pos = createVector(x, y); 
        this.size = createVector(random(5, 20), random(5, 20)); 
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        this.gravity = 0.1;
        this.center = 0; 
        this.pull = 0; 
        this.cornerOne = 0; // Top left 
        this.cornerTwo = 0; // Top right 
        this.cornerThree = 0; // Bottom left 
        this.cornerFour = 0; // Bottom right 

        this.reachedCorner = false; 
    }
    move() {
        this.pos.add(this.vel); 
        if (this.pos < - 20|| this.pos.x > width + 20 || this.pos.y < - 20|| this.pos.height + 20 ) {
            this.vel.mult(-1);
        }
    }
    update() {
        // THIS WORKS FOR DRAGGING CIRCLES TO CENTER 
        // this.center = createVector(width/2, height/2); 
        // this.pull = p5.Vector.sub(this.center, this.pos); 
        // this.pull.setMag(0.01); 
        // this.vel.add(this.pull); 

        // Gravity bounce 
        // this.vel.y += this.gravity; 
        // this.pos.y += this.vel.y; 
        // if (this.pos.y > height) {
        //     this.vel.y = -this.vel.y; 
        // }
    }
    square() {
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
            this.pull.setMag(0.05); 
            this.vel.add(this.pull);
        }

        // if (this.pos.x === this.cornerOne.x && this.pos.y === this.cornerOne.y ||
        //     this.pos.x === this.cornerTwo.x && this.pos.y === this.cornerTwo.y ||
        //     this.pos.x === this.cornerThree.x && this.pos.y === this.cornerThree.y || 
        //     this.pos.x === this.cornerFour.x && this.pos.y === this.corner.y) {
        //         this.vel.set(0, 0);
        // }
    }
    display() {
        stroke(255);
        strokeWeight(1); 
        noFill(); 
        ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y); 
    }
}