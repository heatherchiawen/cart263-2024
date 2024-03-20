class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        // Create drum group 
        this.drums = this.physics.add.group({
            key: `drum`, 
            immovable: true, 
            quantity: 16, 
            colliderWorldBounds: true
        }); 
        this.drums.children.each(function(drum) {
            let x = Phaser.Math.Between(0, this.sys.canvas.width); 
            let y = 100; 
            drum.setPosition(x, y); 
        }, this); 

        // Create avatar 
        this.avatar = this.physics.add.sprite(200, 200, `avatar`); 
        this.avatar.setCollideWorldBounds(true); 

        // Check overlap 
        this.physics.add.collider(this.avatar, this.drum, this.checkAvatarJump, null, this); 

        // Call animations 
        this.createAvatarAnimations(); 
        this.createDrumAnimations(); 

        // Avatar and drum starts in idle  
        this.avatar.play(`idle`); 
        this.drum.play(`drumIdle`); 

        // User key access
        this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    createAvatarAnimations() {
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

        // Idle avatar 
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

    createDrumAnimations() {
        // Playing drums 
        let drumAnimationConfig = {
            key: `drumAnim`, 
            frames: this.anims.generateFrameNumbers(`drum`, {
                start: 0, 
                end: 1
            }), 
            frameRate: 10, 
            repeat: -1 
        }
        this.anims.create(drumAnimationConfig); 

        // Idle drums 
        let idleDrumAnimationConfig = {
            key: `drumIdle`, 
            frames: this.anims.generateFrameNumbers(`drum`, {
                start: 0, 
                end: 0
            }), 
            repeat: 0
        }
        this.anims.create(idleDrumAnimationConfig); 
    }

    checkAvatarJump(avatar, drum) {
        if (avatar.body.bottom < drum.body.top + 5) {
            console.log(`Avatar jumped on drum`); 
            // drum.anims.play(`drumAnim`, true); 
        }
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