class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    preload() {
        // Load assets here 

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