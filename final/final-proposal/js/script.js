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
// Setup code for ml5 handPose was sampled from Pippin Barr's bubble-popper activity 
// Handpose variables/ properties
let video = undefined; 
let handpose = undefined; 
let predictions = []; 
let modelName = `Handpose`; 

// Sound variable 
let synth; 

// Static 
let numStatic = 10000; 

let gridSize = 20; 
let points = []; 

let state = `loading`; // Initial loading state 

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 
    userStartAudio(); // Starts audio in the program 

    // Setup code for ml5 handPose was sampled from Pippin Barr's bubble-popper activity 
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
    // Sampled loading state from Pippin Barr's bubble-popper acitivity
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
    // handleResults();
    drawPoints(); 
}

function handleResults() {
    if (predictions.length > 0) {   
        const annotations = predictions[0].annotations; 
        // Positions of thumb and wrist 
        let thumb = annotations.thumb[3];  
        // Maps frequency and volume based on wrist coorindates 
        let pitch = map(thumb[1], 0, width, 71, 48); // Midi notes, in opposite order 
        let volume = map(thumb[0], 0, height, 1, 0); 
        // Setting synth to maps 
        synth.freq(midiToFreq(pitch)); 
        synth.amp(volume); 

        let freq = synth.freq(); 
        let mappedFreq = map(freq, 48, 71, 0, width); 

        for (let i = 0; i < points.length; i++) {
            let p = points[i]; 
            fill(0); 
            point(p.x, p.y); 
        }
    } 
    else {
        synth.amp(0); 
    }
}

function drawPoints() {
    // Display static 
    for (let i = 0; i < numStatic; i++) {
        let x = random(0, width); 
        let y = random(0, height); 
        stroke(255); 
        point(x, y); 
    }

    // for (let i = 0; i < points.length; i++) {
    //     let p = points[i]; 
    //     fill(0); 
    //     point(p.x, p.y); 
    // }
}