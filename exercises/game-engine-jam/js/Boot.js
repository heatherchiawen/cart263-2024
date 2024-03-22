class Boot extends Phaser.Scene { 
    constructor() {
        super({
            key: `boot`
        }); 
    }

    preload() {
        // Sounds 
        this.load.audio(`drumBeat`, `assets/sounds/drumBeat.wav`); 
        
        // Clef, ground, and rest images  
        this.load.image(`clef`, `assets/images/clef.png`); 
        this.load.image(`ground`, `assets/images/ground.png`);  
        this.load.image(`rest`, `assets/images/rest.png`); 

        // Drum 
        this.load.spritesheet(`drum`, `assets/images/drum.png`, {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame: 0
        });
        
        // Avatar 
        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame: 3
        }); 

        // After Boot loads, triggers play 
        this.load.on(`complete`, () => {
            this.scene.start(`play`); 
        }); 
    }

    create() {

    }

    update() {

    }
}