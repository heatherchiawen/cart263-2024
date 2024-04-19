class Curves {
    constructor(x, y, a, b, c, d, e, f) {
        this.anchor = createVector(x, y); 
        this.controlOne = createVector(a, b); 
        this.controlTwo = createVector(c, d); 
        this.controlThree = createVector(e, f); 
        // this.controlOne = createVector(random(0, 200), random(0, 200)); 
        // this.controlTwo = createVector(random(0, 200), random(0, 200)); 
        // this.controlThree = createVector(random(0, 200), random(0, 200)); 
        // this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        this.vel = createVector(random(0.5, 1), random(0.5, 1)); 
        this.fallVel = random(5, 1); 
    }
    move() {
        // this.anchor.add(this.vel); 
        // this.controlOne.add(this.vel); 
        // this.controlTwo.add(this.vel); 
        // this.controlThree.add(this.vel); 

        if (this.anchor.x > width || this.controlOne.x > width || this.controlTwo.x > width || this.controlThree.x > width) {
            this.anchor.x.sub(this.vel.x); 
        }
        if (this.anchor.x < 0 || this.controlOne.x < 0 || this.controlTwo.x < 0 || this.controlThree.x < 0) {

            this.ancho.x.add(this.vel.x); 
        } 
        if (this.anchor.y > height || this.controlOne.y > height || this.controlTwo.y > height || this.controlThree.y > height) {
            this.anchor.y.sub(this.vel.y); 
        }
        if (this.anchor.y < 0 || this.controlOne.y < 0 || this.controlTwo.y < 0 || this.controlThree.y < 0) { 
            this.anchor.y.add(this.vel.y); 
        }
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

        // this.controlOne.x -= 1;  
        // this.controlTwo.x -= 1; 
        // this.controlOne.y -= 1; 
        // this.controlTwo.y -= 1;  

        // this.anchor.x -= 1;  
        // this.anchor.y -= 1;  
        // this.controlThree.x += 1;  
        // this.controlThree.y += 1;  

        // this.anchor.y += this.fallVel; 
        // this.controlOne.y += 5; 
        // this.controlTwo.y += 200; 
        // this.controlThree.y += 200;


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