class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        // Clef 
        this.clef = this.add.sprite(10, this.sys.canvas.height/2, `clef`); 

        // Ground 
        this.createGround(); 

        // Create avatar 
        this.avatar = this.physics.add.sprite(0, this.sys.canvas.height/2 - 50, `avatar`); 
        this.avatar.setCollideWorldBounds(true);
        // this.avatar.setDisplaySize(150, 150);  // TO MAKE BIGGER 
        this.avatar.setGravityY(100); 

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

    createGround() {
        let numTiles = Math.floor(this.sys.canvas.width/32);  
        this.groundGroup = this.physics.add.group({
            key: `ground`, 
            immovable: true, 
            quantity: numTiles 
        }); 
        let x = 0; 
        this.groundGroup.children.each(function(ground) {
            x += 32;  
            let y = this.sys.canvas.height/2; 
            ground.setPosition(x, y); 
        }, this); 

        this.physics.add.collider(this.avatar, this.groundGroup); 

        // // this.physics.add.collider(this.avatar, this.groundGroup); 
        // this.groundTiles = []; 
        // let numTiles = Math.floor(this.sys.canvas.width/32); 

        // for (let i = 0; i < numTiles; i++) {
        //     this.ground = this.physics.add.sprite(i * 32, this.sys.canvas.height/2, `ground`); 
        // }
    }

    groundCheck() {
        console.log(`on the ground`); 
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
        this.physics.add.collider(this.avatar, this.drum, this.checkAvatarJump, null, this); 
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

        // // Avatar Y velocity 
        // if (this.cursors.up.isDown) {
        //     this.avatar.setVelocityY(-100); 
        // }
        // else if (this.cursors.down.isDown) {
        //     this.avatar.setVelocityY(100); 
        // }
        // else {
        //     this.avatar.setVelocityY(0); 
        // }

        // Check if avatar is moving or idle 
        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.avatar.play(`moving`, true); 
        }
        else {
            this.avatar.play(`idle`, true); 
        }
    }
}