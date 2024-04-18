class Curves {
    constructor(x, y, a, b, c, d, e, f) { 
        this.anchor = createVector(x, y); 
        this.controlOne = createVector(a, b); 
        this.controlTwo = createVector(c, d); 
        this.controlThree = createVector(e, f); 

        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
    }
    move() {
        this.anchor.add(this.vel); 
        this.controlOne.add(this.vel); 
        this.controlTwo.add(this.vel); 
        this.controlThree.add(this.vel); 
    } 
    update() {
        // Something that allows for the curves to jump randomly 
        // maybe add an option that will check the distance between the vectors
        
        // OR something that will straight out the curves 
        // OR SOMTHING THAT WILL MAKE THE CURVES CURL UP 
        // OR SOMETHING THAT WILL MAKE THE CURVES SPLIT  

        // OPTION FOR HOLDING ON TO CURVE STRANDS 
        // this.anchor.x = mouseX; 
        // this.controlOne.x = mouseX; 
        // this.controlTwo.x = mouseX; 
        // this.controlThree.x = mouseX; 

        // this.anchor.y = mouseY; 
        // this.controlOne.y = mouseY; 
        // this.controlTwo.y = mouseY; 
        // this.controlThree.y = mouseY;
    }
    display() {
        stroke(0);
        strokeWeight(1); 
        noFill(); 
        beginShape()
        vertex(this.anchor.x, this.anchor.y); 
        bezierVertex(this.anchor.x + this.controlOne.x, this.anchor.y + this.controlOne.y, this.anchor.x + this.controlTwo.x, this.anchor.y + this.controlTwo.y, this.anchor.x + this.controlThree.x, this.anchor.y + this.controlThree.y); 
        endShape(); 
    }
}