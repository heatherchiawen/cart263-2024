class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        }); 
    }

    create() {
        let loadingTextStyle = {
            fontFamily: " sans-serif", 
            fontSize: "40px", 
            fill: "#ffffff", 
            align: "center"
        }; 
        let loadingString = `loading...`
        this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle); 
    }
    update() {

    }
}