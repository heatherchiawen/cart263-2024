class Sounds {
    constructor(x, y) {
        this.x = x; 
        this.y = y; 

        // Oscillator 
        this.oscillator = new p5.Oscillator();
        this.ev = new p5.Envelope(); 
        this.env.setADSR(0.1, 0.1, 1, 0.5); 
        this.oscillator.amp(this.env); 
        this.oscillator.start(); 
        this.oscillator.fade(); 
        this.oscillator.setType(); 
    }
    soundsOn() {
        // Checks to see if hands are detected in the main program 
        // Play sound
        this.env.play(); 
    }
}