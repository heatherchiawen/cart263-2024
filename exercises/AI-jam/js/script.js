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

let hand; 
let synth; 

let soundMaker = {
    sound: [], 
    numSound: 5, 
    soundNote: [60, 62, 64, 65, 67]  // 69, 71
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

    // // For setting up Sounds class 
    // for (let i = 0; i < soundMaker.numSound; i++) {
    //     let x = 0;
    //     let y = 0; 
    //     let sounds = new Sounds(x, y); 
    //     let note = soundMaker.soundNote[i]; 
    //     sounds.oscillator.freq(midiToFreq(note)); 
    //     soundMaker.sound.push(sounds);  
    // }

    // Set up sounds 
    synth = new p5.Oscillator(); 
    synth.setType(`sine`); 
    synth.amp(0); 
    synth.start(); 
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
        updateData(); 
        // handleHandResults();
}

function updateData() {
    // Annotated data in the predictions 
    // const annotations = predictions[0].annotations; 

    if (predictions.length > 0) {
   
    const annotations = predictions[0].annotations; 

    let thumb = annotations.thumb[3]; 
    // let wrist = annotations.wrist[0]; 

    let pitch = map(thumb[1], 0, 480, 60, 72); 
    let volume = map(thumb[0], 0, 640, 0, 1); 

    synth.freq(midiToFreq(pitch)); 
    synth.amp(volume); 

    } else {
        synth.amp(0); 
    }
}

function handleHandResults() { // Maybe do a function that checks the certainty of detection in the program?? in OPTIONS of a program

    // for (let i = 0; i < soundMaker.sound.length; i++) {
    //    let sounds = soundMaker.sound[i]; 
    
    //    sounds.soundsOn(); 
    // }
}