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

const MIN_SOUND_DIST = 80; 

let hand = {
    indexTip: {
        x: undefined, 
        y: undefined
    },
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
    soundNote: [60, 62, 64, 65, 67, 69, 71], 
    x: [0, 91, 182, 274, 365, 457, 548], 
    y: [0, 480]
}

let soundPlay = true; 

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
    hand.indexTip.x = annotations.indexFinger[3][0]; 
    hand.indexTip.y = annotations.indexFinger[3][1];  
}

function handleHandResults() { // Maybe do a function that checks the certainty of detection in the program?? in OPTIONS of a program 

    let palmToIndexTipDist = dist(hand.indexTip.x, hand.indexTip.y, hand.palm.x, hand.palm.y); 

    // If hand is detected, sounds.soundsOn() will play sound  
    
    for (let i = 0; i < soundMaker.sound.length; i++) {
       let sounds = soundMaker.sound[i]; 

        // let d = dist(hand.palm.x, hand.palm.y, soundMaker.x[i], soundMaker.y[i])       
        // let noise = map(hand.palm.x, soundMaker.x[0], 640, 0, 480)

        // (hand.palm.x > sounds.x[i]) 
        if (!soundPlay && palmToIndexTipDist > MIN_SOUND_DIST) {
            soundPlay = true; 
            sounds.soundsOn(); 
        }   

    // Use dist and sounds[i] to measure the dist between the hand and the next notes 

    }
}

function handleSound() {
    let palmToIndexTipDist = dist(hand.indexTip.x, hand.indexTip.y, hand.palm.x, hand.palm.y); 

    if (soundPlay && palmToIndexTipDist > MIN_SOUND_DIST) {
        soundPlay = true; 
    }
}