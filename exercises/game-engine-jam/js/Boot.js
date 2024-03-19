class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    preload() {
        // Load assets here 
        // Drum 
        this.load.spritesheet(`drum`, `assets/images/drum.png`, {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame: 1
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