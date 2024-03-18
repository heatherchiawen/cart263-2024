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

        // Adding the avatar in the same way as Boot, but providing the key of the sprite sheet
        this.avatar = this.add.sprite(200, 200, `avatar`); 

        // this.createAnimation(); 

        // Removed for physics lesson 
        // // Avatar starts out as "idle"
        // this.avatar.play(`idle`); 

        // Parameters specfifies the number of pixels per second the avatar should move at 
        // EXAMPLE: https://phaser.io/examples/v3/view/physics/arcade/simple-body
        // this.avatar.setVelocityX(100); 
        // Playing moving animation instead of idle 
        // this.avatar.play(`moving`); 
        
        // Avatar isn't moving to begin with any more 
        this.avatar.play(`idle`); 

        // Create an easy way to acess the arrow keys and space bat using the keyboards
        // input system's .createCursorKeys() method 
        
        this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    // Removed for physics lesson 
    // createAnimation() {
    //     // Here we create an animation we will play when the avatar is moving in game 
    //     // Created using the animation system of Phaser 3, via this.anims and used in .create()
    //     // EXAMPLE: https://phaser.io/examples/v3/view/loader/sprite-sheet/load-sprite-sheet
    //     let movingAnimationConfig = { 
    //         // Animation key nused when playing the sprite animation 
    //         key: `moving`, 
    //         frames: this.anims.generateFrameNumbers(`avatar`, {
    //             // Plays from first frame 
    //             start: 0, 
    //             // Last frame 
    //             end: 3
    //         }), 
    //         // The frame rate this animation should play at 
    //         frameRate: 30,
    //         // Hoe many times to repeat the animation 
    //         // 0 means not to play at all 
    //         // Any positive number (e.g. 3) means to play that many loops (e.g. three times)
    //         // -1 means to loop infinitely 
    //         repeat: -1
    //     }

    //     this.anims.create(movingAnimationConfig); 

    //     // Configuration an idle animation 
    //     let ideleAnimationConfig = {
    //         // Different animation key 
    //         key: `idle`, 
    //         frames: this.anims.generateFrameNumbers(`avatar`, {
    //             // Only using 0, so the frames styart and end there 
    //             start: 0, 
    //             end: 0
    //         }), 
    //         // No need to specify a frame rate for somthing that doesn't animate 
    //         repeat: 0
    //     };
    //     this.anims.create(idleAnimationConfig); 
    // }


    // update() is basically the draw 
    update() {
        console.log("Play scene updated!");
        this.handleInput(); 
    }

    handleInput() {
        // Checks to see which keys are pressed and sets the velocity of the avatar sprite accordingly 
        // EXAMPLE: https://phaser.io/examples/v3/view/input/keyboard/cursor-keys
        // X velocity 
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-100); 
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(100); 
        }
        else {
            // If neither left or right are pressed, stop moving X 
            this.avatar.setVelocityX(0); 
        }

        // Y velocity 
        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(100); 
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(100); 
        }
        else {
            // If neither up or down are pressed, stop moving on y 
            this.avatar.setVelocityY(0); 
        }

        // If either x or y elocity isn't zero, the avatar is moving 
        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !==0) {
            // We include a second argument of "true" to tell the animation system to 
            // ignore this instruction if the animation is already playing which 
            // avoids having the animation constantly interrupted as the player moves 
            // DOCS: https://newdocs.phaser.io/docs/3.53.1/Phaser.GameObjects.Sprite#play
            this.avatar.play(`moving`, true); 
        }
        // Otherwise it's not moving 
        else {
            this.avatar.play(`idle`, true); 
        }
    }
}