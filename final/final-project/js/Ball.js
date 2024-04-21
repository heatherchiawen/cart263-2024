class Ball {
    constructor(x, y, size) { 
        this.pos = createVector(x, y); 
        this.size = size
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        this.color = { 
            r: random(0, 255), 
            g: random(0, 255), 
            b: random(0, 255)
        }; 

        this.angle = 0; 
        this.angleOffset = random(1, 5);  
        this.orbit = 0; 
        this.orbitRadius = 200; 

        this.cornerOne; // Top left 
        this.cornerTwo; // Top right 
        this.cornerThree; // Bottom left 
        this.cornerFour; // Bottom right 

        this.top; 
        this.bottom; 
        this.leftSide; 
        this.rightSide; 
    }

    move() {
        this.pos.add(this.vel); 
        if (this.pos < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.vel.mult(-1);
        }
    }

    update() {

    }

    orbiting() {
        this.angle += 0.01; 
        this.orbit = createVector(width/2, height/2); 
        let orbitPosX = this.orbit.x + this.orbitRadius * cos(this.angle * this.angleOffset); 
        let orbitPosY = this.orbit.y + this.orbitRadius * sin(this.angle * this.angleOffset);
        this.pos.lerp(createVector(orbitPosX, orbitPosY), 0.05);
    }

    center() {
        this.pos.lerp(createVector(width/2, height/2), 0.05); 
    }

    square() { 
        this.cornerOne = createVector(width/4, height/4); 
        this.cornerTwo = createVector(width/4 * 3, height/4); 
        this.cornerThree = createVector(width/4, height/4 * 3); 
        this.cornerFour = createVector(width/4 * 3, height/4 * 3); 

        let dOne = p5.Vector.dist(this.cornerOne, this.pos); 
        let dTwo = p5.Vector.dist(this.cornerTwo, this.pos); 
        let dThree = p5.Vector.dist(this.cornerThree, this.pos); 
        let dFour = p5.Vector.dist(this.cornerFour, this.pos); 

        if (dOne < width/4 && dOne < height/4) {
            this.pos.lerp(this.cornerOne, 0.05); 
        }
        if (dTwo < width/4 && dTwo < height/4) {
            this.pos.lerp(this.cornerTwo, 0.05);
        }
        if (dThree < width/4 && dThree < height/4) {
            this.pos.lerp(this.cornerThree, 0.05); 
        }
        if (dFour < width/4 && dFour < height/4) {
            this.pos.lerp(this.cornerFour, 0.05);
        }
    }

    diamond() {
        this.top = createVector(width/2, height/4); 
        this.bottom = createVector(width/2, height/4 * 3); 
        this.leftSide = createVector(width/4, height/2); 
        this.rightSide = createVector(width/4 * 3, height/2); 

        let dOne = p5.Vector.dist(this.top, this.pos); 
        let dTwo = p5.Vector.dist(this.bottom, this.pos); 
        let dThree = p5.Vector.dist(this.leftSide, this.pos); 
        let dFour = p5.Vector.dist(this.rightSide, this.pos); 

        if (dOne < width/4 && dOne < height/4) {
            this.pos.lerp(this.top, 0.05); 
        }
        if (dTwo < width/4 && dTwo < height/4) {
            this.pos.lerp(this.bottom, 0.05);
        }
        if (dThree < width/4 && dThree < height/4) {
            this.pos.lerp(this.leftSide, 0.05); 
        }
        if (dFour < width/4 && dFour < height/4) {
            this.pos.lerp(this.rightSide, 0.05);
        }
    }

    display() {
        noStroke(); 
        fill(this.color.r, this.color.g, this.color.b, 50); 
        ellipse(this.pos.x, this.pos.y, this.size); 
    }
}