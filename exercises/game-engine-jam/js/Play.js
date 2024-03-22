class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        // Title 
        let style = {
            fontFamily: `sans-serif`, 
            fontSize: `40px`, 
            fill: `#000000`
        }; 
        let gameDescription = `Drummin' Drumsticks`; 
        this.gameText = this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/4, gameDescription, style); 
        this.gameText.setOrigin(0.5); 

        // Sounds 
        this.drumBeat = this.sound.add(`drumBeat`, {loop: false}); 

        // Clef 
        this.clef = this.add.sprite(10, this.sys.canvas.height/2, `clef`); 

        // Ground 
        this.createGround(); 

        // Create avatar 
        this.avatar = this.physics.add.sprite(0, this.sys.canvas.height/2 - 50, `avatar`); 
        this.avatar.setCollideWorldBounds(true);
        this.avatar.setGravityY(300); 

        // Collider so that the avatar stays on the ground 
        this.physics.add.collider(this.avatar, this.groundGroup); 
        
        // Load animations 
        this.createAvatarAnimations(); 

        // Avatar starts idling   
        this.avatar.play(`idle`); 

        // User key access
        this.cursors = this.input.keyboard.createCursorKeys(); 

        // // Event listener with mouse click adds drums with addDrum()
        this.input.on(`pointerdown`, this.addDrum, this); 
    }

    createGround() {
        // Lines that define the ground, created in a group 
        // WIth a collsion check with the avatar in create() 
        this.groundGroup = this.physics.add.group({
            key: `ground`, 
            immovable: true, 
            quantity: 32 
        }); 
        let x = 0; // So that the tiles line up next to each other 
        this.groundGroup.children.each(function(ground) {
            x += 32;  
            let y = this.sys.canvas.height/2; 
            ground.setPosition(x, y); 
        }, this); 
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

        // Check overlap in avatarJump()
        this.physics.add.collider(this.avatar, this.drum, this.checkAvatarJump, null, this); 
    }

    checkAvatarJump(avatar, item) { 
        // Plays drum sound, then is destroyed 
        this.sound.play(`drumBeat`); 
        item.destroy(); 
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

        // Check if avatar is moving or idle 
        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.avatar.play(`moving`, true); 
        }
        else {
            this.avatar.play(`idle`, true); 
        }
    }
}