class Curves {
    // Class for partciles 
    constructor(pos) { 
        this.pos = pos; 
        this.velocity = createVector(random(-1, 1), random(-1, 1)); 
    }

    move() {
        this.pos.add(this.velocity); 
        this.pos.x = constrain(this.pos.x, 0, width); 
        this.pos.y = constrain(this.pos.y, 0, height); 
    } 

    display() {
        stroke(255);
        strokeWeight(1); 
        point(this.pos.x, this.pos.y);
    }
}