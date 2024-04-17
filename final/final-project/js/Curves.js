class Curves {
    // Class for partciles 
    constructor(x, y) { 
        this.x = x; 
        this.y = y; 
        // this.pos = pos; 
        this.offSet = random(-100, 100); 
        this.velocity = createVector(random(-1, 1), random(-1, 1)); 
    }

    move() {
        this.pos.add(this.velocity); 
        this.pos.x = constrain(this.pos.x, 0, width); 
        this.pos.y = constrain(this.pos.y, 0, height); 
    } 

    display() {
        stroke(0);
        strokeWeight(1); 

        noFill(); 
        beginShape(); 
        vertex(this.x, this.y); 
        bezierVertex(this.x + this.offSet, this.y + this.offSet, this.x + this.offSet, this.y + this.offSet, this.x + this.offSet, this.y + this.offSet); 
        endShape(); 
    }
}