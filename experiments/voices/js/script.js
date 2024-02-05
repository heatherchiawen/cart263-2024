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

let voice = new p5.Speech(); // For output 
let speechRecognizer = new p5.SpeechRec(); // For input, can also add a string inside (with a specific code) for it to detect a specific language 
let currentSpeech = `?`; 
let lightsAreOn = false; 

// let showSubtitle = false; 
// let toSay = `yes`; 

/**
Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight); 
    speechRecognizer.onResult = handleResult; // To tell it to exectute the function when it hears audio commands 
    speechRecognizer.continuous = true; // For the program to continuously listen to speech input 
    speechRecognizer.interimResults = true; // Listens to speech in segments rather than processing evertime there is a pause,,, used for changing background colour in the example 
    speechRecognizer.start(); 

    // Calling the listVoices() method from the p5 library to see all the availible voices
    // console.log(voice.listVoices()); 
    
    // // Calling additional methods for experiments 
    // voice.setPitch(1); 
    // voice.setRate(1); 
    // voice.setVoice(`Superstar`); 

    // // To call text when speaking 
    // voice.onStart = speechStarted; 
    // voice.onEnd = speechEnded; 

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

function draw() {
    background(0); 

    // for interim result example 
    // background(backgroundColor); 

    // Combined voice and action input 
    if (lightsAreOn) {
        background(255); 
    }

    // // From voice input 
    // textAlign(CENTER, CENTER); 
    // textSize(24); 
    // text(currentSpeech, width/2, height/2); 

    // // Code from the voice output 
    // // Booleans triggered by the speechStarted() and speechEnded() functions 
    // if (showSubtitle) {
    //     textSize(18); 
    //     text(toSay, 100, 100); 
    // }
}

// Functions from voice output section 
// function mousePressed() {
//     // To trigger the speech synth
//     voice.speak(toSay); // Words being said 
// }
// function speechStarted() { // For text to show when voice is speaking 
//     showSubtitle = true; 
// }
// function speechEnded() { // For text to not sho wwhen voice is not speaking 
//     showSubtitle = false; 
// }

// Function from voice input section 
function handleResult() { // Function to handle speech commands 
    currentSpeech = speechRecognizer.resultString; 

    // // For interim result example 
    // let words = speechRecognizer.resultString.split(` `); // Lets the result string split what is said into seperate words 
    // backgroundColor = speechRecognizer.resultString;
    // // backgroundColor = words.pop(); // to get the final words 

    // For action and speech recognition example 
    if (speechRecognizer.resultString.toLowerCase() === `turn the lights on`) {
        lightsAreOn = true; 
    }
    else if (speechRecognizer.resultString.toLowerCase() === `turn the lights off`){
        lightsAreOn = false; 
    }

    // // Text string example 
    // if (speechRecognizer.resultString === `I love you`) {
    //     currentSpeech = `You're damn right you do`; 
    // }
    // else {
    //     currentSpeech = `I hate you`; 
    // }
    // // Another example 
    
    // // To see if it is detecting speech input 
    // if (speechRecognizer.resultValue === true) {
    //     console.log(speechRecognizer.resultString); 
    // }
}