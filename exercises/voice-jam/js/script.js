/**
 * Voice Jam 
 * Heather Chester 
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let heart;
let chatBox;

/**
 * Description of preload
*/
function preload() {
    heart = loadImage(`assets/images/heart.png`); 
    chatBox = loadImage(`assets/images/chatBox.png`); 
}

let data = [ {
    question: `What kind of relationship are you looking for?`,
    heard: `Taxing`
}, 
{
    question: `What are some of your hobbies?`,
    heard: `Increasing tuition fees for out-of-province and international students and ensuring public sector workers are not paid a livable wage all while making sure there is a surplus of money in my pocket`
}, 
{
    question: `What traits do you seek for in your ideal partner?`,
    heard: `Deep pockets with a passion for aggravating the masses`
}, 
{
    question: `Age is just a number... but what number are you looking for?`,
    heard: `66...6`
}, 
{
    question: `Describe your dream appearance for your potential partner`,
    heard: `Privileged cis-het white man who should retire`
}
];

let currentQuestion = 0; // To start questions in sequential order 

let displayText = ``; // Text to appear
let currentSpeech = ``; // What is currently being said 

let voice = new p5.Speech(); // Speech synthesizer 
let speechRecognizer = new p5.SpeechRec(); // Speech Recognizer 

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight); 
    speechRecognizer.onResult = handleResult; 
    speechRecognizer.continuous = true; 
    speechRecognizer.start(); 
}

/**
 * Description of draw()
*/
function draw() {
    background(230, 181, 223); 

    // Add in title state with loading in images in preload 
    image(heart, width/2, height/2, 100, 150); 
    image(chatBox, width/2 - 300, height/6, 400); 

    fill(0);
    textStyle(BOLD);
    textFont(`DotGothic16`);
    textSize(14);
    text(displayText, width/2 - 240, height/2 - 100); 

    // Add in ending state with loading in images in preload 
}

function mousePressed() {
    voice.speak(data[currentQuestion].question);
    displayText = `${data[currentQuestion].question}`; 
}

function handleResult() { 
    // To see if it is detecting speech input 
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
        currentSpeech = speechRecognizer.resultString; // Keep to see if I can add an option if the user says no the the answer 
        // Program says what is "heard"
        voice.speak(`You said:${data[currentQuestion].heard}, is that correct?`);
        // Displays what is heard 
        displayText = `You said: "${data[currentQuestion].heard}"`; 
    } 
    // Go to the next question 
    currentQuestion++;
    // If last question then stop listening
    if (currentQuestion >= data.length) {
        voice.removeCallback(`result`); 
    }
}

// function title() {
// }

// function simulation() {
// }

// function ending() {
//     displayText = `Get that bag I guess…`; 
// }