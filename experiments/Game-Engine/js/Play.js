class Play extends Phaser.Scene {
    // Game scene, gets called in main script and also... 
    constructor() {
        super({
            key: `play`
        }); 
    }

    // create() basically is the setup function of this class 
    create() {
        // // From overview and setup notes 
        // console.log("PLat scene created!"); 
        // // NOTE: Creating and adding a text object to our scene
        // // EXAMPLE: https://phaser.io/examples/v3/view/game-objects/text/basic-text
        // // Style object to set what the text will look like 
        // let style = {
        //     fontFamily: `sans-serif`, 
        //     fontSize: `40px`,
        //     fill: '#ffffff',
        // };
        // // String that describes game 
        // let gameDescription = `Think of a number... no that's not it.`; 
        // // Text object at (x, y, strtingDisplay, style configuration)
        // this.gameText = this.add.text(100, 100, gameDescription, style); 
        // // Good idae to assign the resulting text object into a property of the scene 
        // // To manipulate it later on in program 

        // // From sprite notes 
        // Parameters for adding sprite are (x, y, image key)
        // Assigns the new sprite into a property of the scene in case we want to manipulate it later on 
        // EXAMPLE: https://phaser.io/examples/v3/view/loader/image/load-image
        this.wall = this.add.sprite(100, 100, `wall`); 

        // Colour (setTint()) is probably not going to work since I drew it in black 
        // HEXADEMICAL colour notation, but written with a 0x in front of the colour code instead of a #
        // EXAMPLE: https://phaser.io/examples/v3/view/display/tint/single-color-tint
        this.wall.setTint(0xdd3333); 
    }
    // update() is basically the draw 
    update() {
        console.log("Play scene updated!");
    }
}