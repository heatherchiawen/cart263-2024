class Static {
    constructor(x, y) {
        this.x = x; 
        this.y = y; 
        this.vx = 0; 
        this.vy = 0; 
        this.speed = 10; 
        this.jitteriness = 0.1; 
    }

    move() {
        let r = random(0, 1); 
        if (r < this.jitteriness) {
            this.vx = random(-this.speed, this.speed); 
            this.vy = random(-this.speed, this.speed); 
        }
        this.x = this.x + this.vx; 
        this.y = this.y + this.vy; 
        this.x = constrain(this.x, 0, width); 
        this.y = constrain(this.y, 0, height); 
    } 

    display() {
        stroke(255);
        strokeWeight(1); 
        point(this.x, this.y); 
    }
}