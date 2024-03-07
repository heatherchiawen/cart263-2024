class Play extends Phaser.Scene {
    // Game scene, gets called in main script and also... 
    constructor() {
        super({
            key: `play`
        }); 
    }

    // create() basically is the setup function of this class 
    create() {
        console.log("PLat scene created!"); 

        let style = {
            fontFamily: `sans-serif`, 
            fontSize: `40px`,
            fill: '#ffffff',
        };

        let gameDescription = `Thikn of a number... no that's not it.`; 

        this.gameText = this.add.text(100, 100, gameDescription, style); 
    }
    // update() is basically the draw 
    update() {
        console.log("Play scene updated!");
    }
}