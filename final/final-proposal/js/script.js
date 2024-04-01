/**
 * Final Project Proposal - TBA 
 * Heather Chester
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/

let video = undefined; 
let handpose = undefined; 
let predictions = []; 
let modelName = `Handpose`; 

// Sound variable 
// let synth; 

let state = `loading`; 

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 
    // userstartAudio(); 

    // User video 
    video = createCapture(VIDEO); 
    video.hide(); 

    // ml5 setup 
    handpose = ml5.handpose(video, {
        fliphorizontal: true
    }, function() {
        console.log(`Model loaded.`); 
        state = `simulation`;' '
    }); 

    // Listens to predcitions 
    handpose.on(`predcit`, function(results) {
        console.log(results); 
        predictions = results; 
    }); 

    // Set up sounds 
    // synth = new p5.Oscillator(); 
    // synth.setType(`sine`); 
    // synth.amp(0); 
    // synth.start(); 
}


/**
 * Description of draw()
*/
function draw() {
    if (state === `loading`) {
        loading(); 
    }
    else if (state === `simulation`) {
        simulation(); 
    }
}

function loading() {
    background(255); 

    push();
    textSize(32); 
    textStyle(BOLD); 
    textAlign(CENTER, CENTER); 
    text(`loading ${modelName}...`, width/2, height/2);  
    pop(); 
}

function simulation() {
    const flippedVideo = ml5.flipImage(video); 
    image(flippedVideo, 0, 0, width, height); 

    handleResults(); 
}

function handleResults() {
    if (predictions.length > 0) {
        const annotations = predictions[0]. annotations; 
        // Positions of thumb and wrist 
        let thumb = annotations.thumb[3];  
        // Maps frequency and volume based on wrist coorindates 
        let pitch = map(thumb[1], 0, width, 71, 48); // Midi notes, in opposite order 
        let volume = map(thumb[0], 0, height, 1, 0); 
        // Setting synth to maps 
        synth.freq(midiToFreq(pitch)); 
        synth.amp(volume); 
    } 
    else {
        synth.amp(0); 
    }
}