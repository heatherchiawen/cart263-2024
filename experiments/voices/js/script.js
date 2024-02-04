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

// For no plans on changing the speech synthesizer object user "const" and assign it to the new p5 speech object 
// const speechSynthesizer = new p5.Speech(); 

let voice = new p5.Speech(); 
let speechRecognizer = new p5.SpeechRec(); 

let showSubtitle = false; 
let toSay = `yes`; 

/**
Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight); 
    speechRecognizer.onResult = handleResult; 
    speechRecognizer.start(); 

    // Calling the listVoices() method from the p5 library to see all the availible voices
    // console.log(voice.listVoices()); 
    
    // Calling additional methods for experiments 
    voice.setPitch(1); 
    voice.setRate(1); 
    voice.setVoice(`Superstar`); 

    // To call text when speaking 
    voice.onStart = speechStarted; 
    voice.onEnd = speechEnded; 

    // Alternative way: 
    // voice.onStart = () => {
        //showSubtitle = true; 
    //}
    // voice.onEnd = () => {
        //showSubtitle = false;
    //} 
}

/**
Description of draw()
*/

function handleResult() {
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
    }
}

function draw() {
    background(255); 

    // Booleans triggered by the speechStarted() and speechEnded() functions 
    if (showSubtitle) {
        textSize(18); 
        text(toSay, 100, 100); 
    }
}

function mousePressed() {
    // To trigger the speech synth
    voice.speak(toSay); // Words being said 
}

function speechStarted() { // For text to show when voice is speaking 
    showSubtitle = true; 
}

function speechEnded() { // For text to not sho wwhen voice is not speaking 
    showSubtitle = false; 
}