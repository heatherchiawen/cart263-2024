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

        // For thumbs-down 
        let x = Math.random() * this.sys.canvas.width; 
        let y = Math.random() * this.sys.canvas.height; 
        this.sadness = this.physics.add.sprite(x, y, `thumbs-down`); 

        // Thumbs-up group
        this.happiness = this.physics.add.group({
            key: `thumbs-up`, 
            quantity: 120, 
            bounceX: 0.5, 
            bounceY: 0.5, 
            colliedrWorldBounds: true, 
            dragX: 50, 
            dragY: 50
        }); 
        Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds); 

        // Checks for overlap/collide with avatar and sadness/ avatar and happiness 
        this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this); 
        this.physics.add.collider(this.avatar, this.happiness); 
        this.physics.add.collider(this.happiness, this.happiness); 

        // Thumbs-down over-lap check with getSad()
        this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this); 

        // Activates the users keys in update()
        this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    getSad(avatar, sadness) {
        // Thumbs-down appears at random position 
        let x = Math.random() * this.sys.canvas.width; 
        let y = Math.random() * this.sys.canvas.height; 
        this.sadness.setPosition(x, y); 
    }

    update() {
        // Conditionals for the users keyboard to control the velocity of the avatar 
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