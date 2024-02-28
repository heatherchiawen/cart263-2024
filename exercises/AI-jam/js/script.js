/**
 * Title of Project
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

let hand; // For storing hand values in order to detect where it is on the canvas 
// Use dist and sounds[i] to measure the dist between the hand and the next notes 

let soundMaker = {
    sound: [], 
    numSound: 7, 
    soundNote: [60, 62, 64, 65, 67, 69, 71], 
    soundXCoordinates: [0, 91, 182, 274, 365, 457, 548]
}

let state = `loading`; // Initial loading state 
let modelName = `Handpose`; 

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 
    userStartAudio(); // Starts audio in the program 

    video = createCapture(VIDEO); 
    video.hide(); 

    handpose = ml5.handpose(video, {
        fliphorizontal: true 
    }, function() {
        console.log(`Model loaded.`); 
        state = `simulation`; 
    }); 

    handpose.on(`predict`, function(results) {
        console.log(results); 
        predictions = results;  
    });

    // For setting up Sounds class 
    for (let i = 0; i < soundMaker.numSound; i++) {
        let x = soundMaker.soundXCoordinates[i];
        let y = height; 
        let sounds = new Sounds(x, y); 
        let note = soundMaker.soundNote[i]; 
        sounds.oscillator.freq(midiToFreq(note)); 
        soundMaker.sound.push(sounds);  
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
    if (predictions.length > 0) {
        let results = predictions[0]; 
        handleResults(results);
    }

    for (let i = 0; i < soundMaker.sound.length; i++) {
        let sounds = soundMaker.sound[i]; 
        sounds.display(); 
        
    //     let baseX = base[0];
    //     if (baseX > soundMaker.soundXCoordinates[i]) {
    //         sounds.soundsOn(); 
    //     }
    }
}

function handleResults(results) { // Maybe do a function that checks the certainty of detection in the program?? in OPTIONS of a program 
    // If hand is detected, sounds.soundsOn() will play sound  
    for (let i = 0; i < soundMaker.sound.length; i++) {
        let sounds = soundMaker.sound[i]; 
        sounds.soundsOn(); 

    // For storing hand values in order to detect where it is on the canvas 
    // Use dist and sounds[i] to measure the dist between the hand and the next notes 

    }
}