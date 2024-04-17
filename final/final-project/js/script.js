/**
 * Final Project - Particle Board 
 * Heather Chester 
 * 
 * Summary 
 * 
 * Maybe put the handposes in a class (if it works)
 * 
 * Work in seprate parts 
 * Start out with the particle class and mouse pressed 
 * 
 * 
 * Goals: create different hand poses, connect specfic frequencies to hand poses, 
 * maybe that'll make the sound better????, if not find a method that does make it better 
 * connect frequencies to vector-based movement 
 * 
 *

"use strict";

/**
 * Description of preload
*/

// Setup for ml5 handpose, sampled from Pippin Barr's bubble-popper activity
let video = undefined; 
let handpose = undefined; 
let predictions = []; 
let modelName = `Handpose`; 

// Global variables for sounds 
let fft; 
let synth; 
let pitchValue = 0; 

// For creating the static class 
// let field = {
//     particles: [], 
//     numParticles: 10000
// }; 

// For creating the curve class 
let field = {
    curves: [], 
    numCurves: 10
}; 

// Initial loading state 
// let state = `loading`; 


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
    // video = createCapture(VIDEO); 
    // video.hide(); 

    // // Ml5 setup 
    // handpose = ml5.handpose(video, {
    //     fliphorizontal: true 
    // }, function() {
    //     console.log(`Model loaded.`); 
    //     state = `simulation`; 
    // }); 
    // // Listens to presdictions 
    // handpose.on(`predict`, function(results) {
    //     console.log(results); 
    //     predictions = results;  
    // });

    // Setup sounds
    synth = new p5.Oscillator(); 
    synth.setType(`sine`); 
    synth.amp(0); 
    synth.start();  
    fft = new p5.FFT(); 

    // Setup curves 
    for (let i = 0; i < field.numCurves; i++) {
        // let pos = createVector(random(0, width), random(0, width)); // ADD 
        let x = random(width); 
        let y = random(height); 
        let curve = new Curves(x, y); 
        field.curves.push(curve); 
    }
}

/**
 * Description of draw()
*/
function draw() {
    // if (state === `loading`) {
    //     loading(); 
    // }
    // else if (state === `simulation`) {
    //     simulation(); 
    // }

    background(255); 
    simulation(); 
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
    // User webcam display HANDPOSE 
    // const flippedVideo = ml5.flipImage(video);
    // image(flippedVideo, 0, 0, width, height); 

    // Check for new predictions HANDPOSE 
    // handleResults();

    // Curves 
    for (let i = 0; i < field.curves.length; i++) {
        let curve = field.curves[i]; 
        curve.display(); 
        // curve.move(); 
    }
}

function handleResults() {
    
}

function mousePressed() {

}