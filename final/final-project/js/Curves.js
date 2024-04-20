class Curves {
    constructor(x, y) { 
        this.anchor = createVector(x, y); 
        this.controlOne = createVector(random(0, 200), random(0, 200)); 
        this.controlTwo = createVector(random(0, 200), random(0, 200)); 
        this.controlThree = createVector(random(0, 200), random(0, 200)); 
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        
        this.gravity = 0.1;
    }
    move() {
        this.anchor.add(this.vel); 
        this.controlOne.add(this.vel); 
        this.controlTwo.add(this.vel); 
        this.controlThree.add(this.vel); 

        if (this.anchor.x < -200 || this.anchor.x > width + 200 || this.anchor.y < -200 || this.anchor.y > height + 200 || 
            this.controlOne.x < -200 || this.controlOne.x > width + 200 || this.controlOne.y < -200 || this.controlOne.y > height + 200 || 
            this.controlTwo.x < -200 || this.controlTwo.x > width + 200 || this.controlTwo.y < -200 || this.controlTwo.y > height + 200||
            this.controlThree.x < -200 || this.controlThree.x > width + 200|| this.controlThree.y < -200 || this.controlThree.y > height + 200) {
                this.vel.mult(-1);
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

        this.vel.y += this.gravity; 
        this.anchor.y += this.vel.y; 
        // if (this.anchor.y > height) {
        //     this.vel.y = -this.vel.y; 
        // }
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