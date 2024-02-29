/**
 * AI Jam - 
 * Heather Chester 
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/

// Handpose variables/ properties
let video = undefined; 
let handpose = undefined; 
let predictions = []; 
let modelName = `Handpose`; 

// Sound variables 
let synth; 
let reverb; 
// let reverbAmt = 0.5; 

let state = `loading`; // Initial loading state 

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 
    userStartAudio(); // Starts audio in the program 

    // User video 
    video = createCapture(VIDEO); 
    video.hide(); 

    // Ml5 setup 
    handpose = ml5.handpose(video, {
        fliphorizontal: true 
    }, function() {
        console.log(`Model loaded.`); 
        state = `simulation`; 
    }); 
    // Listens to presdictions 
    handpose.on(`predict`, function(results) {
        console.log(results); 
        predictions = results;  
    });

    // Setup sounds 
    synth = new p5.Oscillator(); 
    synth.setType(`sine`); 
    synth.amp(0); 
    synth.start(); 
    reverb = new p5.Reverb(); 
    synth.connect(reverb); 
    // reverb.amp(0.5); 
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
    text(`Loading ${modelName}...`, width/2, height/2); 
    pop(); 
}

function simulation() {
    // User webcam display 
    const flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0, width, height); 

    // Check for new predictions 
    handleResults(); 
}

function handleResults() {
    if (predictions.length > 0) {   
    const annotations = predictions[0].annotations; 

    // Positions of thumb and wrist 
    let thumb = annotations.thumb[3]; 
    let wrist = annotations.wrist[0]; 

    // Maps frequency and volume based on wrist coorindates 
    let pitch = map(thumb[1], 0, width, 71, 48); // Midi notes, in opposite order 
    let volume = map(thumb[0], 0, height, 1, 0); 
    // Setting synth to maps 
    synth.freq(midiToFreq(pitch)); 
    synth.amp(volume); 

    // Reverb based on wrist coordinates 
    let reverbAmount = map(wrist[2], -100, 100, 0, 1); 

    reverb.amp(reverbAmount); 

    } else {
        synth.amp(0); 
        reverb.amp(0); 
    }
}