class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    preload() {
        // Sounds 
        this.load.audio(`drumBeat`, `assets/sounds/drumBeat.wav`); 
        
        // Clef and ground 
        this.load.image(`clef`, `assets/images/clef.png`); 
        this.load.image(`ground`, `assets/images/ground.png`);  

        // Drum 
        this.load.spritesheet(`drum`, `assets/images/drum.png`, {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame: 2
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