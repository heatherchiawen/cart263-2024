class Static {
    constructor(pos) { // x, y
        // Sampled setup for class and movement from Pippin Barr's CART 253 
        this.pos = pos; 
        this.velocity = createVector(random(-1, 1), random(-1, 1)); 
        this.maxSpeed = 2; 
        this.maxForce = 0.1; 

        // this.x = x; 
        // this.y = y; 
        // this.vx = 0; 
        // this.vy = 0; 
        // this.speed = 10; 
        // this.jitteriness = 0.1; 
    }

    move() {
        this.pos.add(this.velocity); 
        // let r = random(0, 1); 
        // if (r < this.jitteriness) {
        //     this.vx = random(-this.speed, this.speed); 
        //     this.vy = random(-this.speed, this.speed); 
        // }
        this.pos.x = this.pos.x + this.vx; 
        this.pos.y = this.pos.y + this.vy; 
        this.pos.x = constrain(this.pos.x, 0, width); 
        this.pos.y = constrain(this.pos.y, 0, height); 
        
        // this.x = this.x + this.vx; 
        // this.y = this.y + this.vy; 
        // this.x = constrain(this.x, 0, width); 
        // this.y = constrain(this.y, 0, height); 
    } 

    display() {
        stroke(255);
        strokeWeight(1); 
        point(this.pos.x, this.pos.y); 
        // point(this.x, this.y); 
    }
}