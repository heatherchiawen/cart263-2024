/**
 * Final Project - Particle Board 
 * Heather Chester 
 * 
 * Summary 
 * 
 * 

/**
 * Description of preload
*/

"use strict";

// Setup for ml5 handpose, sampled from Pippin Barr's bubble-popper activity
let video = undefined; 
let handpose = undefined; 
let predictions = []; 
let modelName = `Handpose`; 

// Global variables for sounds 
let fft; 
let synth; 
let pitchValue = 0; 

let field = {
    balls: [], 
    numBalls: 40
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

    // Set up Balls 
    for (let i = 0; i < field.numBalls; i++) {
        let x = random(0, width); 
        let y = random(0, height); 
        let ball = new Ball(x, y); 
        field.balls.push(ball); 
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

    // pitchValue = map(mouseX, 0, width, 48, 71); 
    // if (mouseIsPressed === true) {
    //     synth.freq(midiToFreq(pitchValue)); 
    //     synth.amp(1); 
    // } else (
    //     synth.amp(0)
    // )

    for (let i = 0; i < field.balls.length; i++) {
        let ball = field.balls[i]; 
        ball.display(); 
        ball.move(); 
        if (mouseIsPressed === true) {
            ball.update(); 
            // ball.square(); 
        }     
    }
}

function handleResults() {
    // HANDPOSE PREDICTIONS 
}

// function mousePressed() {
//     for (let i = 0; i < field.balls.length; i++) {
//         let ball = field.balls[i]; 
//             let d = dist(mouseX, mouseY, ball.pos.x, ball.pos.y)
//             if (d < ball.size/2) {
//                 field.balls.splice(i, 1); 
//                 break; 
//         }    
//     }    
// }