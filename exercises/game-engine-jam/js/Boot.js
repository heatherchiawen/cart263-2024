class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    preload() {
        // Load assets here 
        // this.load.image(`avatar`, `assets/images/avatar.png`); 

        //Sprite sheet 
        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame:3
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