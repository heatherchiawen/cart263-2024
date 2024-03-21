class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        // Clef and ground 
        this.clef = this.add.sprite(100, 100, `clef`); 
        this.ground = this.add.sprite(100, 100, `ground`); 
        
        // Create avatar 
        this.avatar = this.physics.add.sprite(0, 300, `avatar`); 
        this.avatar.setCollideWorldBounds(true);
        // this.avatar.setDisplaySize(150, 150);  // TO MAKE BIGGER 

        // Load animations 
        this.createAvatarAnimations(); 
        this.createDrumAnimations(); 

        // Avatar starts idling   
        this.avatar.play(`idle`); 

        // User key access
        this.cursors = this.input.keyboard.createCursorKeys(); 

        // Event listener with mouse click adds drums with addDrum()
        this.input.on(`pointerdown`, this.addDrum, this); 
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
            repeat: -1 // Loop indefinitely 
        }; 
        this.anims.create(movingAnimationConfig); 

        // Idle avatar, no loops
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

    addDrum(pointer) {
        // Drum created at mouse click position 
        this.drum = this.physics.add.sprite(pointer.x, pointer.y, `drum`); 
        this.drum.setCollideWorldBounds(true); 
        this.drum.setImmovable(true); 
        // this.drum.setDepth(this.avatar.depth - 1); 

        // Drum starts idling 
        this.drum.play(`drumIdle`, true); 

        // Check overlap in avatarJump()
        // this.physics.add.overlap(this.avatar, this.drum, this.checkAvatarJump, null, this);
        this.physics.add.collider(this.avatar, this.drum, this.checkAvatarJump, null, this); 
        // Add a space where the avatar cannot jump below the drum  
    }

    createDrumAnimations() {
        // Playing drums 
        let drumAnimationConfig = {
            key: `drumAnim`, 
            frames: this.anims.generateFrameNumbers(`drum`, {
                start: 0, 
                end: 2
            }), 
            frameRate: 10, 
            repeat: 1 
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

    checkAvatarJump() { 
        if (this.avatar.body.position.y < this.drum.body.position.y) {
            console.log(`Avatar jumped on drum`); 
            this.drum.play(`drumAnim`, true); 
        }
        else {
            this.drum.play(`drumIdle`, true); 
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