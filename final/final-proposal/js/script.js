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

    // Create static/particles
    for (let i = 0; i < field.numParticles; i++) {
        let particle = new Static(); 
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
        particle.update(); 
    }
}

function handleResults() {
    // Check to see if there are any current predictions to display 
    if (predictions.length > 0) {   
        consthandLandmarks = predictions[0].landmarks; 

        for (let i = 0; i < field.particles.length; i++) {
            let particle = field.particles[i]; 
            for (let j = 0; j < handLandmarks.length; j++) {
                const handLandmark = handLandmarks[j]; 

                const d = dist(particle.pos.x, particle.pos.y, handLandmark[0], handLandmark[1]); 
                if (d < 20) {
                    particle.maxSpeed = 50; 
                }
            }
        }
    } 
}