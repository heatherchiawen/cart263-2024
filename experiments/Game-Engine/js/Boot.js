class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    // preload() method tells Phaser 3 that we want to preload asset files here 
    preload() {
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/image/load-image
        this.load.image(`wall`, `assets/images/wall.png`);
        
        // How to load a simple spirte sheet using the loader's.spritesheet() method 
        // The parameters are (key, image file, comfiguration of object specfifying the 
        // dimentions of an individual frame via frameWidth and frameHeight, the final frame number (counting from 0))
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/sprite-sheet/load-sprite-sheet
        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            // Animation has 32x32 pixel frames 
            frameWidth: 32, 
            frameHeight: 32, 
            // Our animation has 4 frames, so the final frame number is 3, counting from 0
            endFrame: 3
        }); 
       
       
        // `complete` acts as an event listener to tell the porgram to switch scenes once the asset is loaded
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/loader-events/load-progress
        this.load.on(`complete`, () => {
            this.scene.start(`play`); 
        });
    }

    create() {
        // Adds a loading message to the scene on creation 
        let loadingTextStyle = {
            fontFamily: " sans-serif", 
            fontSize: "40px", 
            fill: "#ffffff", 
            align: "center"
        }; 
        let loadingString = `loading...`
        this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle); 

        // NOTE: Switch to the scene with the key of "play"
        // EXAMPLE: https://phaser.io/examples/v3/view/scenes/change-scene-from-create
        this.scene.start(`play`); 
    }
    update() {

    }
}