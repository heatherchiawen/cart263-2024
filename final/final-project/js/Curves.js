class Curves {
    constructor(x, y, a, b, c, d, e, f) { 
        // first point/ first anchor point 
        this.x = x; 
        this.y = y; 
        // second points in vertex 
        this.a = a; 
        this.b = b; 
        // third points 
        this.c = c; 
        this.d = d; 
        // fourth points 
        this.e = e; 
        this.f = f; 

        // this.velocity = createVector(random(-1, 1), random(-1, 1)); 
        // this.vel = createVector(); //ADD
    }

    move() {
        // this.x.add(this.vel); 
        // this.x.add(this.vel); 
        this.x = constrain(this.x, 0, width); 
        this.y = constrain(this.y, 0, height); 
    } 

    display() {
        stroke(0);
        strokeWeight(1); 
        noFill(); 
        beginShape()
        // anchor point 
        vertex(this.x, this.y); 
        //coordinates for bezier curves 
        // bezierVertex(this.a, this.b, this.c, this.d, this.e, this.f); // THIS ONE CREATES LONGER LINES 
        bezierVertex(this.x + this.a, this.y + this.b, this.x + this.c, this.y + this.d, this.x + this.e, this.y + this.f); 
        endShape(); 
    }
}