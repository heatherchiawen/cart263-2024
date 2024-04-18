class Curves {
    constructor(x, y, a, b, c, d, e, f) { 
        this.anchor = createVector(x, y); 
        this.controlOne = createVector(a, b); 
        this.controlTwo = createVector(c, d); 
        this.controlThree = createVector(e, f); 

        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); 
        // // anchor point 
        // this.x = x; 
        // this.y = y;
        // // second points
        // this.a = a; 
        // this.b = b; 
        // // third points 
        // this.c = c; 
        // this.d = d; 
        // // fourth points 
        // this.e = e; 
        // this.f = f; 

        // this.vx = random(-1, 1); 
        // this.vy = random(-1, 1); 
        // this.va = random(-1, 1); 
        // this.vb = random(-1, 1); 
        // this.vc = random(-1, 1); 
        // this.vd = random(-1, 1); 
        // this.ve = random(-1, 1); 
        // this.vf = random(-1, 1); 
    }

    move() {
        // this.x += this.vx; 
        // this.y += this.vy; 
        // this.a += this.va; 
        // this.b += this.vb; 
        // this.c += this.vc; 
        // this.d += this.vd; 
        // this.e += this.ve; 
        // this.f += this.vf; 

        this.anchor.add(this.vel); 
        this.controlOne.add(this.vel); 
        this.controlTwo.add(this.vel); 
        this.controlThree.add(this.vel); 
    } 

    display() {
        stroke(0);
        strokeWeight(1); 
        noFill(); 
        beginShape()
        vertex(this.anchor.x, this.anchor.y); 
        bezierVertex(this.anchor.x + this.controlOne.x, this.anchor.y + this.controlOne.y, this.anchor.x + this.controlTwo.x, this.anchor.y + this.controlTwo.y, this.anchor.x + this.controlThree.x, this.anchor.y + this.controlThree.y); 
        // vertex(this.x, this.y); 
        // bezierVertex(this.x + this.a, this.y + this.b, this.x + this.c, this.y + this.d, this.x + this.e, this.y + this.f); 
        endShape(); 
    }
}