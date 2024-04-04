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

let fft; 
let synth; 
let pitchValue = 0; 

// For creating the static class 
let field = { 
    particles: [], 
    numParticles: 10000
}; 

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
    fft = new p5.FFT(); 

    // Setup static/particles
    for (let i = 0; i < field.numParticles; i++) {
        let x = random(0, width); 
        let y = random(0, height); 
        let particle = new Static(x, y); 
        field.particles.push(particle); 
    }
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
    handleResults();

    for (let i = 0; i < field.particles.length; i++) {
        let particle = field.particles[i]; 
        particle.display(); 
        particle.move(); 
    }
}

function handleResults() {
    // Check to see if there are any current predictions to display 
    if (predictions.length > 0) {   
       const annotations = predictions[0].annotations; 
       // Positions of thumb determines pitch (frequency) 
       let thumb = annotations.thumb[3]; 
       // Based on mapped coordinates
       pitchValue = map(thumb[1], 0, width, 71, 48); 
       // Setting frequency to map
       synth.freq(midiToFreq(pitchValue)); 
       synth.amp(1); 
    } 
    else {
        synth.amp(0); 
    }
}

function checkParticles() {
    let spectrum = fft.analyze(); 
}