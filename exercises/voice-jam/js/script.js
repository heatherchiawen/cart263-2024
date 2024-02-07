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

let currentQuestion = 0; 
let displayText = ``; 

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

    // This should be stored in the simulation state 
    // displayQuestion(); 
    // displayHeardAnswer(); 

    text(displayText, width/2, height/2); 
    // Add in ending state with loading in images in preload 
}

function mousePressed() {
    // Move this to another state? Add the code to switch between states 
    // Maybe have the heart ask the questions? 
    voice.speak(data[currentQuestion].question);
    // displayQuestion(); 
}

function handleResult() { 
    // To see if it is detecting speech input 
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
        currentSpeech = speechRecognizer.resultString; 
        // Program says what is "heard"
        voice.speak(`You said:${data[currentQuestion].heard}`);
        // Add something that displays the heard answer with a function? Maybe look into how to preperly use callbacks??
        // displayHeardAnswer(); 
        displayText = `${data[currentQuestion].heard}`; 
    } 
    // Go to the next question 
    currentQuestion++;
    // If last question then stop listening
    if (currentQuestion >= data.length) {
        voice.removeCallback(`result`); 
    }
}

function displayQuestion() {
    // Make sure our current question is still valid
    if (currentQuestion < data.length) {
      // If so, display the question
      push();
      fill(255);
      textStyle(BOLD);
      textFont(`Helvetica`);
      textSize(24);
      let question = data[currentQuestion].question;
      text(question, 100, 100);
      pop();
    }
}

function displayHeardAnswer() {
    if (currentQuestion < data.length) {
    push();
    fill(0);
    textFont(`Courier`);
    textSize(14);
    text(`${data[currentQuestion].heard}`, 120, 230); 
    pop(); 
    }
}

// function title() {
//     push(); 
//     fill(255);
//     textStyle(BOLD);
//     textFont(`Helvetica`);
//     textSize(24);
//     text(`In the spirit of Valentines day, we want find your ideal match. Please click the heart to continue`, 100, 50); 
//     pop(); 
// }

// function simulation() {
    // displayProfile();
    // displayInfo(); 
// }

// function ending() {
//     push(); 
//     fill(255);
//     textStyle(BOLD);
//     textFont(`Helvetica`);
//     textSize(24);
//     text(`Get that bag I guess…`, width/2, height/0.5); 
//     pop(); 
// }