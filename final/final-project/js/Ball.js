class Ball {
    constructor(x, y) { 
        this.pos = createVector(x, y); 
        this.size = 300; 
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        // this.color = { 
        //     r: random(0, 255), 
        //     g: random(0, 255), 
        //     b: random(0, 255)
        // }; 
        this.color = random(0, 255); 
        
        this.gravity = 0.1;
        this.center = 0; 
        this.pull = 0; 
        
        this.jitter = 0.1; 
        this.growRate = 0.5; 
        this.minSize = 5;
        this.maxSize = 600; 

        this.angle = 0; 
        this.angleOffset = random(1, 5);  
        this.orbit = 0; 
        this.orbitRadius = 200; 

        this.orbitOn = false; 
        this.centerOn = false; 
        this.gravityOn = false; 
        this.jitterOn = false; 
        this.shrinkOn = false; 
        this.growOn = false; 
    }

    move() {
        this.pos.add(this.vel); 
        if (this.pos < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.vel.mult(-1);
        }
    }

    update() {
        if (this.orbitOn === true) { // index 
            this.orbit(); 
        }
        else if (this.centerOn === true) {
            this.center(); 
        }
        else if (this.gravityOn === true) {
            this.gravity(); 
        }
        else if (this.jitterOn === true) { // open hand
            this.jitter(); 
        }
        else if (this.shrinkOn === true) { // pinky
            this.shrink(); 
        }
        else if (this.growOn === true) { // thumb
            this.grow(); 
        }
    }

    orbit() {
        this.angle += 0.01; 
        this.orbit = createVector(mouseX, mouseY); 
        let orbitPosX = this.orbit.x + this.orbitRadius * cos(this.angle * this.angleOffset); 
        let orbitPosY = this.orbit.y + this.orbitRadius * sin(this.angle * this.angleOffset);
        this.pos.lerp(createVector(orbitPosX, orbitPosY), 0.05); 
    }

    center() {
        this.center = createVector(width/2, height/2); 
        this.pull = p5.Vector.sub(this.center, this.pos); 
        this.pull.setMag(0.05); 
        this.vel.add(this.pull); 
    }

    gravity() {
        this.vel.y += this.gravity; 
        this.pos.y += this.vel.y; 
        if (this.pos.y > height) {
            this.vel.y = -this.vel.y; 
        }
    }
    
    jitter() {
        let r = random(0, 1); 
        if (r < this.jitter) {
            this.pos.add(random(-100, 100)); 
        }
    }

    grow() {
        this.size += this.growRate; 
        if (this.size > this.maxSize) {
            this.growRate = 0; 
        }
    }

    shrink() {
        this.size -= this.growRate; 
        if (this.size < 1) {
            this.growRate = 0; 
        }
    }

    display() {
        noStroke(); 
        // fill(this.color.r, this.color.g, this.color.b, 50); 
        fill(this.color, 50); 
        ellipse(this.pos.x, this.pos.y, this.size); 
    }
}