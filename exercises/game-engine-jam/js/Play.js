class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        // Create drum 
        this.drums = this.physics.add.group({
            key: `drum`, 
            immovable: true, 
            quantity: 16, 
        }); 
        this.drums.children.each(function(drum) {
            let x = Phaser.Math.Between(0, this.sys.canvas.width); 
            let y = 100;
            // let y = Phaser.Math.Between(0, this.sys.canvas.height); 
            drum.setPosition(x, y); 
        }, this); 

        // Create avatar 
        this.avatar = this.physics.add.sprite(200, 200, `avatar`); 
        this.avatar.setCollideWorldBounds(true); 

        // Enable collisions 
        // this.physics.add.collider(this.avatar, this.drum); 

        // Check overlap 
        this.physics.add.overlap(this.avatar, this.drum, this.playDrum, null, this); 

        // Call animation 
        this.createAnimations(); 

        // Avatar starts in idle  
        this.avatar.play(`idle`); 

        // User key access
        this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    createAnimations() {
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

        let idleAnimationConfig = {
            key: `idle`, 
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0, 
                end: 0
            }), 
            repeat: 0 
        }; 
        this.anims.create(idleAnimationConfig);
    }

    playDrum(avatar, drum) {
        drum.destroy(); 
    }

    update() {
        this.handleInput();
    }

    handleInput() {
        // Avatar X velocity 
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-100); 
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(100); 
        }
        else {
            this.avatar.setVelocityX(0); 
        }

        // Avatar Y velocity 
        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-100); 
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(100); 
        }
        else {
            this.avatar.setVelocityY(0); 
        }

        // Check if avatar is moving or idle 

        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.avatar.play(`moving`, true); 
        }
        else {
            this.avatar.play(`idle`, true); 
        }
    }
}