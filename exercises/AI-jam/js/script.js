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

let soundMaker = {
    sound: [], 
    numSound: 10, 
    soundNote: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
}

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 

    video = createCapture(VIDEO); 
    video.hide(); 

    handpose = ml5.handpose(video, {
        fliphorizontal: true 
    }, function() {
        console.log(`Model loaded.`); 
    }); 

    handpose.on(`predict`, function(results) {
        console.log(results); 
        predictions = results;  
    });

    // For setting up Sounds class 
    for (let i = 0; i < soundMaker.numSound; i++) {
        let x = 640; 
        let y = 480; 
        let sounds = new Sounds(x, y); 
        let soundNote = soundMaker.soundNote[i]; 
        sounds.oscillator.freq(midiToFreq(soundNote)); 
        soundMaker.sound.push(sounds);  
    }
}

function handleResults(err, results) { // function for if hands are detected 
    // If hand is detected, sounds.soundsOn() will play sound 
    for (let i = 0; i < soundMaker.sound.length; i++) {
        let sounds = soundMaker.sound[i]; 
        sounds.soundsOn(); 
    }
}


/**
 * Description of draw()
*/
function draw() {
    background(0); 

    image(video, 0, 0, width, height); 

}