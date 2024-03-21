class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    preload() {
        // Clef and ground 
        this.load.image(`clef`, `assets/images/clef.png`); 
        // this.load.image(`ground`, `assets/images/ground.png`);  
        this.load.spritesheet(`ground`, `assets/images/ground.png`, {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame: 0
        }); 

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