/**
 * Final Project Prototype - Particle Board 
 * Heather Chester
 * 
 * For my final project, I propose working with ml5 handpose and p5.js to create a sound visualizing program. 
 * This prototype operates by using the ml5 handpose model to detect where sounds are mapped on the canvas. 
 * The program then analyzes the sound output and move static (or particles) accordingly. 
 * 
 * Please see "Final Project Propsal" file for my written propsal and more information. 
 */

"use strict";

/**
 * Description of preload
*/
// Setup code for ml5 handPose was sampled from Pippin Barr's bubble-popper activity 
let video = undefined; 
let handpose = undefined; 
let predictions = []; 
let modelName = `Handpose`; 

// Global variables for sounds 
let fft; 
let synth; 
let pitchValue = 0; 

// For creating the static class 
let field = { 
    particles: [], 
    numParticles: 10000
}; 

// Initial loading state
let state = `loading`;  

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

    // Tint to better see particle movement 
    fill(0, 0, 0, 100); 
    rect(0, 0, width, height); 

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

       // Moving particles based on sound output
       checkParticles(); 
    } 
    else {
        synth.amp(0); 
    }
}

function checkParticles() {

    for (let i = 0; i < field.particles.length; i++) {
        let particle = field.particles[i]; 
        // Groups particles if pitch exeeds threshold 
        let pitchThreshold = 60; 
        if (pitchValue > pitchThreshold) {
            // Particles are pulled towards the center
            let center = createVector(width/2, height/2);  
            let pull = p5.Vector.sub(center, particle.pos); 
            pull.setMag(1); 
            particle.velocity.add(pull); 
        }
    } 
}