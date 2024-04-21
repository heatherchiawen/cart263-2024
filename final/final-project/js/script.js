/**
 * Final Project - Gestured Sounds 
 * Heather Chester 
 * 
 * For my final, I created this sound visualizing program with an array of ellipses, ml5 handpose, and p5.js. 
 * In this program, the ball class contains 20 ellipses with an in-class oscillator that produces specific sounds 
 * simultaneously with events that respond to four hand poses. Please see README for a full overview of the building 
 * process and challenges. 
 * 
 * Attestations (see README and additional comments):
 * 
 * Barr, Pippin. “Bubble-Popper," GitHub and VS Code, Concordia University. Last modified 2022. 
 * https://github.com/pippinbarr/cart263/blob/91f72416b264f8c5a74196827b45d0e6fb78b40e/examples/ai/bubble-popper/js/script.js/.
 * 
 * Barr, Pippin. "ml5.js: Handpose," in "AI Learning Materials," CART 263 - Creative Computation II - Winter 2024. Last accessed April 21, 2024. 
 * https://pippinbarr.com/cart263/topics/ai/ml5js-handpose.html. 
 * 
 * Yu, Faith. “Lecture 6 - orbit,” p5.js Sketches. Last accessed April 21, 2024. 
 * https://editor.p5js.org/faithyu/sketches/S14D5MSUb.  
 * 
 * 2sman, “odd or even,” p5js Sketches. Last accessed April 21, 2024. 
 * https://editor.p5js.org/2sman/sketches/BJcff_nnW. 
/**
 * Description of preload
*/

"use strict";

// Setup for ml5 handpose, sampled from Pippin Barr's bubble-popper activity
let video; 
let handpose; 
let predictions = []; 
let modelName = `Handpose`; 

// Ball class 
let field = {
    balls: [], 
    numBalls: 20
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
        flipHorizontal: true 
    }, function() {
        console.log(`Model loaded.`); 
        state = `simulation`; 
    }); 
    // Listens to presdictions 
    handpose.on(`predict`, function(results) {
        console.log(results); 
        predictions = results;  
    });

    // Setup Balls 
    for (let i = 0; i < field.numBalls; i++) {
        let x = random(0, width); 
        let y = random(0, height); 
        let size = i * random(1, 10); 
        let ball = new Ball(x, y, size); 
        field.balls.push(ball); 
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
    text(`Loading ${modelName}...\n\nExplore the program by using lifting\nyour thumb, index, pinky, or open palm`, width/2, height/2); 
    pop(); 
}

function simulation() {
    background(0); 
    // User webcam display, sampled from Pippin Barr's bubble-popper activity
    const flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0, width, height); 

    // Initial display and movement for ball class 
    for (let i = 0; i < field.balls.length; i++) {
        let ball = field.balls[i]; 
        ball.display(); 
        ball.move(); 
    }

    // Check for new predictions 
    handleResults();
}

function handleResults() {
    // Prediction setup sampled from Pippin Barr's bubble-popper activity
    if (predictions.length > 0) {
        const annotations = predictions[0].annotations; 
        handShown(annotations); 
    }
}

function handShown(annotations) {
    // Annotations for fingers 
    let thumbTipY = annotations.thumb[3][1]; 
    let indexTipY = annotations.indexFinger[3][1];
    let middleTipY = annotations.middleFinger[3][1]; 
    let ringTipY = annotations.ringFinger[3][1]; 
    let pinkyTipY = annotations.pinky[3][1];  

    for (let i = 0; i < field.balls.length; i++) {
        let ball = field.balls[i]; 
        // If there are predictions, then amp turns on  
        ball.synth.amp(1, 0.1, 0.7); 
        // If all fingers are above the thumb, ellipses orbit and prgram plays 60 Hz
        if (indexTipY < thumbTipY && middleTipY < thumbTipY && ringTipY < thumbTipY && pinkyTipY < thumbTipY) {
            console.log("open hand");
            ball.orbiting();
            ball.synth.freq(60); 
        }
        // If thumb is above other fingers, ellipses move to square formation and prgram plays 120 Hz
        else if (thumbTipY < indexTipY && thumbTipY < middleTipY && thumbTipY < ringTipY && thumbTipY < pinkyTipY) {
            console.log("thumb");
            ball.square(); 
            ball.synth.freq(120); 
        }
        // If index is above all other fingers, ellipses move to center and prgram plays 180 Hz
        else if (indexTipY < thumbTipY && indexTipY < middleTipY && indexTipY < ringTipY && indexTipY < pinkyTipY) {
            console.log("index");
            ball.center(); 
            ball.synth.freq(180); 
        }
        // If pinky is above all other fingers. ellipses move in X-formation 
        else if (pinkyTipY < thumbTipY && pinkyTipY < indexTipY && pinkyTipY < middleTipY && pinkyTipY < ringTipY) {
            console.log("pinky");

            // X formation 
            let scopeX = i * width/20 
            let scopeYOne = (20 - i) * height/20;
            let scopeYTwo = i * height/20; 

            // Sorting array by odd and even, sampled from 2sman, “odd or even,” p5js sketches 
            if (i % 2 === 0) {
                ball.pos.lerp(createVector(scopeX, scopeYOne), 0.05); 
            }
            else {
                ball.pos.lerp(createVector(scopeX, scopeYTwo), 0.05); 
            }
            ball.synth.freq(240); 
        } 
    }
}