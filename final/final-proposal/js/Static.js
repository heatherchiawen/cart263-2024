class Static {
    constructor() {
        this.pos = createVector(random(width), random(height)); 
        this.velocity = p5.Vector.random2D(); 
        this.acceleration = createVector(); 
        this.maxSpeed = 4; 
        this.maxForce = 0.1; 
    }
    update() {
        this.velocity.add(this.acceleration); 
        this.velocity.limit(this.maxSpeed); 
        this.pos.add(this.velocity); 
        this.acceleration.mult(0); 
        this.edges(); 
    }


   
    edges() {
        // handles endges 
        if (this.pos.x > width) {
            this.pos.x = 0; 
        }
        if (this.pos.x < 0) {
            this.pos.x = width; 
        }
        if (this.pos.y > height) {
            this.pos.y = 0; 
        }
        if (this.pos.y < 0) {
            this.pos.y = height; 
        }

        // convert to screen space 
    }

    display() {
        stroke(255);
        strokeWeight(5); 
        point(this.pos.x, this.pos.y); 
    }
}