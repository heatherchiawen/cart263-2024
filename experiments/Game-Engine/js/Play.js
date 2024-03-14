class Play extends Phaser.Scene {
    // Game scene, gets called in main script and also... 
    constructor() {
        super({
            key: `play`
        }); 
    }

    // create() basically is the setup function of this class 
    create() {
        console.log("PLat scene created!"); 
        // NOTE: Creating and adding a text object to our scene
        // EXAMPLE: https://phaser.io/examples/v3/view/game-objects/text/basic-text
        // Style object to set what the text will look like 
        let style = {
            fontFamily: `sans-serif`, 
            fontSize: `40px`,
            fill: '#ffffff',
        };
        // String that describes game 
        let gameDescription = `Think of a number... no that's not it.`; 
        // Text object at (x, y, strtingDisplay, style configuration)
        this.gameText = this.add.text(100, 100, gameDescription, style); 
        // Good idae to assign the resulting text object into a property of the scene 
        // To manipulate it later on in program 
    }
    // update() is basically the draw 
    update() {
        console.log("Play scene updated!");
    }
}