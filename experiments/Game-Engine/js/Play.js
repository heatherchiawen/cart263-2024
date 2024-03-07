class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        }); 
    }

    create() {
        console.log("PLat scene created!"); 
    }
    update() {
        console.log("Play scene updated!");
    }
}