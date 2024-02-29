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

let hand = {
    palm: {
        x: undefined, 
        y: undefined 
    }
}

// For storing hand values in order to detect where it is on the canvas 
// // Use dist and sounds[i] to measure the dist between the hand and the next notes 

let soundMaker = {
    sound: [], 
    numSound: 7, 
    soundNote: [60], // , 62, 64, 65, 67, 69, 71
    x: [0, 91, 182, 274, 365, 457, 548], 
    y: [0, 480]
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
        let x = soundMaker.x[i];
        let y = 0; 
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
        // let hand = predictions[0]; 
        updateData(); 
        handleHandResults();
    }

    for (let i = 0; i < soundMaker.sound.length; i++) {
        let sounds = soundMaker.sound[i]; 
        sounds.display(); 
    }
}

function updateData() {
    // Annotated data in the predictions 
    const annotations = predictions[0].annotations; 

    // Relevant positions of the palm 
    hand.palm.x = annotations.palmBase[0]; 
    hand.palm.y = annotations.palmBase[0];
}

function handleHandResults() { // Maybe do a function that checks the certainty of detection in the program?? in OPTIONS of a program 

    // maps volume on a scale of 0-1 along the length of the canvas 
    // let volume = map(hand.palm.x, 0, 640, 0, 1); 
    let pitch = map(hand.palm.y, 0, 480, 0, 1); 

    for (let i = 0; i < soundMaker.sound.length; i++) {
       let sounds = soundMaker.sound[i]; 

    //    sounds.oscillator.freq(pitch);
    //    sounds.oscillator.setVolume(volume);
       sounds.soundsOn(); 
    }
}