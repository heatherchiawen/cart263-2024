/**
Voices Experiments 
Heather Chester 
*/

"use strict";


/**
Description of preload
*/
function preload() {

}

let voice = new p5.Speech(); 
let speechRecognizer = new p5.SpeechRec(); 

/**
Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight); 
    speechRecognizer.onResult = handleResult; 
    speechRecognizer.start(); 
}

/**
Description of draw()
*/

function handleResult() {
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
    }
}

function mousePressed() {
    voice.speak(`yes`);
}

function draw() {
    background(255); 
}