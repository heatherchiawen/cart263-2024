class Curves {
    constructor(x, y, a, b, c, d, e, f) { 
        // anchor point 
        this.x = x; 
        this.y = y; 
        // second points
        this.a = a; 
        this.b = b; 
        // third points 
        this.c = c; 
        this.d = d; 
        // fourth points 
        this.e = e; 
        this.f = f; 

        // this.vx = random(-1, 1); 
        // this.vy = random(-1, 1); 
        // this.va = random(-1, 1); 
        // this.vb = random(-1, 1); 
        // this.vc = random(-1, 1); 
        // this.vd = random(-1, 1); 
        // this.ve = random(-1, 1); 
        // this.vf = random(-1, 1); 

        this.vx = 0; 
        this.vy = 0; 
        this.va = 0; 
        this.vb = 0; 
        this.vc = 0; 
        this.vd = 0; 
        this.ve = 0; 
        this.vf = 0; 
        this.speed = 1; 
    }

    move() {
        if (this.x < 0 && this.y < 0 && this.a < 0 && this.b < 0 && this.c < 0 && this.d < 0 && this.e < 0 && this.f < 0) {
            this.x += this.speed; 
            this.y += this.speed; 
            this.a += this.speed; 
            this.b += this.speed; 
            this.c += this.speed; 
            this.d += this.speed; 
            this.e += this.speed; 
            this.f += this.speed; 

        } if (this.x > width && this.y > width && this.a > width && this.b > width && this.c > width && this.d > width && this.e > width && this.f > width &&
            this.x > height && this.y > height && this.a > height && this.b > height && this.c > height && this.d > height && this.e > height && this.f > height) {
                this.x -= this.speed; 
                this.y -= this.speed; 
                this.a -= this.speed; 
                this.b -= this.speed; 
                this.c -= this.speed; 
                this.d -= this.speed; 
                this.e -= this.speed; 
                this.f -= this.speed; 
        }
        
        // else {
        //     this.x += this.vx; 
        //     this.y += this.vy; 
        //     this.a += this.va; 
        //     this.b += this.vb; 
        //     this.c += this.vc; 
        //     this.d += this.vd; 
        //     this.e += this.ve; 
        //     this.f += this.vf; 
        // }
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