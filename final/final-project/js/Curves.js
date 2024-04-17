class Curves {
    // Class for partciles 
    constructor(x, y) { 
        this.x = x; 
        this.y = y; 
        // this.pos = pos; 
        this.offSet = random(-50, 50); 

        // this.velocity = createVector(random(-1, 1), random(-1, 1)); 
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
        beginShape()
        // vertex(this.pos.x, this.pos.y); 
        // bezierVertex(this.pos.x + this.offSet, this.pos.y + this.offSet, this.pos.x + this.offSet, this.pos.y + this.offSet, this.pos.x + this.offSet, this.pos.y + this.offSet);
          
        // anchor point 
        vertex(this.x, this.y); 
        //coordinates for bezier curves 
        // bezierVertex(this.x + this.offSet, this.y + this.offSet, this.x + this.offSet, this.y + this.offSet, this.x + this.offSet, this.y + this.offSet); 
        bezierVertex(this.x + 80, this.y + 0, this.x + 80, this.y + 75, this.x + 30, this.y + 75); 
        endShape(); 
    }
}