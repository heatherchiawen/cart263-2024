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
        let pos = createVector(random(0, width), random(0, height)); 
        let particle = new Static(pos); 
        // let x = random(0, width); 
        // let y = random(0, height); 
        // let particle = new Static(x, y); 
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

    // Display and movement of particles without hand recognition 
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

       // Analyzes sound output for checkParticles()
       let spectrum = fft.analyze(); 
       checkParticles(spectrum); 
    } 
    else {
        synth.amp(0); 
    }
}

function checkParticles() {

    for (let i = 0; i < field.particles.length; i++) {
        let particle = field.particles[i]; 

        // fft data to control particle movement 
        // let speedMultiplier = map(spectrum[500], 0, 255, 0.5, 2); 
        // let jitterMultiplier = map (spectrum[500], 0, 255, 0.05, 0.2); 
        // particle.speed = particle.speed * speedMultiplier; 
        // particle.jitteriness = particle.jitteriness * jitterMultiplier; 

        // Groups particles if pitch exeeds threshold 
        let pitchThreshold = 60; 
        if (pitchValue > pitchThreshold) {
            // Particles move towards the center of the canvas
            // With vectors and partcile velocity 
            let center = createVector(width/2, height/2);  
            let pull = p5.Vector.sub(center, particle.pos); 
            pull.setMag(1); 
            particle.velocity.add(pull); 

            // let pull = p5.Vector.sub(center, createVector(particle.x, particle.y)); 
            // pull.setMag(1); 
            // particle.vx += pull.x; 
            // particle.vy += pull.y; 
        }
    } 
}