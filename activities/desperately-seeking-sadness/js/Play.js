class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        // Create the avatar 
        this.avatar = this.physics.add.sprite(400, 300, `avatar`); 
        this.avatar.setCollideWorldBounds(true); 

        let x = Math.random() * this.sys.canvas.width; 
        let y = Math.random() * this.sys.canvas.height; 
        this.sadness = this.physics.add.sprite(x, y, `thumbs-down`); 

        this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    update() {
        if (this.cursors.left.isDown) {
            this.avatar.setAngularVelocity(-150); 
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setAngularVelocity(150); 
        }
        else {
            this.avatar.setAngularVelocity(0); 
        }
        
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration); 
        }
        else {
            this.avatar.setAcceleration(0); 
        }
    }
}