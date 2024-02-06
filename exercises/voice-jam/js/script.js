/**
 * Voice Jam 
 * Heather Chester 
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let voice = new p5.Speech(); // Speech synthesizer 
let speechRecognizer = new p5.SpeechRec(); // Speech Recognizer 

let currentSpeech = ``; // What is currently being said 

let endSpeech = `Looks like we have found your ideal match! Please click the button below to reveal`; 

let data = [ {
    category: `Relationship`,
    question: `What kind of relationship are you looking for?`,
    heard: `You said: Taxing`
}, 
{
    category: `Hobbies`,
    question: `What are some of your hobbies?`,
    heard: `You said: Increasing tuition fees for out-of-province and international students and ensuring public sector workers are not paid a livable wage all while making sure there is a surplus of money in my pocket`
}, 
{
    category: `Traits`,
    question: `What traits do you seek for in your ideal partner?`,
    heard: `You said: Deep pockets with a passion for aggravating the masses`
}, 
{
    category: `Age`,
    question: `Age is just a number... but what number are you looking for?`,
    heard: `You said: 66...6`
}, 
{
    category: `Looks`, 
    question: `Describe your dream appearance for your potential partner`,
    heard: `You said: Privileged cis-het white man who should retire`,
}
];

let currentQuestion = 0; 

let showSubtitle = false; 
let state = `title`; 

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight); 
    speechRecognizer.onResult = handleResult; 
    speechRecognizer.continuous = true; 
    speechRecognizer.start(); 

    // To call text when speaking 
    voice.onStart = speechStarted; 
    voice.onEnd = speechEnded; 
}


/**
 * Description of draw()
*/
function draw() {
    background(230, 181, 223); 

    if (showSubtitle) {
        push(); 
        fill(255); 
        textStyle(BOLD);
        textFont(`Helvetica`);
        textSize(24);
        text(data[currentQuestion].question, 100, 200); 
        pop(); 
    }

    displayInfo(); 
}

function displayInfo() {
    push(); 
    fill(255);
    textStyle(BOLD);
    textFont(`Helvetica`);
    textSize(24);
    text(`click for next question`, 100, 50); 
    pop(); 

}

function mousePressed() {
    voice.speak(data[currentQuestion].question); 
}

function handleResult() { 
    // To see if it is detecting speech input 
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
    } 
    // Program says what is "heard"
    voice.speak(data[currentQuestion].heard);
    // And displays it 


    // Go to the next question 
    currentQuestion++;
    // If last question then stop listening // this sound be an else if statement ???
    if (currentQuestion >= data.length) {
        voice.removeCallback(`result`); 
    }
}

function speechStarted() { // For text to show when voice is speaking 
    showSubtitle = true; 
}
function speechEnded() { // For text to not sho wwhen voice is not speaking 
    showSubtitle = false; 
}