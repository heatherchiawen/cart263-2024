class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        this.avatar = this.add.sprite(200, 200, `avatar`); 
        // this.avatar.setColliderWorldBounds(true); 

        // Moving the avatar 
        let movingAnimationConfig = {
            key: `moving`, 
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0, 
                end: 3
            }), 
            frameRate: 10, 
            repeat: -1 // Positive numbers play that many loops, -1 plays the loop indefinitely 
        }; 
        this.anims.create(movingAnimationConfig); 
        this.avatar.play(`moving`); 

    }

    update() {

    }
}