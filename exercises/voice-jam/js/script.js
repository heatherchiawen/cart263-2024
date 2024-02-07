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
    category: `Relationship`,
    question: `What kind of relationship are you looking for?`,
    heard: `Taxing`
}, 
{
    category: `Hobbies`,
    question: `What are some of your hobbies?`,
    heard: `Increasing tuition fees for out-of-province and international students and ensuring public sector workers are not paid a livable wage all while making sure there is a surplus of money in my pocket`
}, 
{
    category: `Traits`,
    question: `What traits do you seek for in your ideal partner?`,
    heard: `Deep pockets with a passion for aggravating the masses`
}, 
{
    category: `Age`,
    question: `Age is just a number... but what number are you looking for?`,
    heard: `66...6`
}, 
{
    category: `Looks`, 
    question: `Describe your dream appearance for your potential partner`,
    heard: `Privileged cis-het white man who should retire`
}
];

let currentQuestion = 0; 
let currentAnswer = false; 

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
    displayProfile();
    // displayInfo(); 
    displayQuestion(); 
    // displayHeardAnswer(); 

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
        displayHeardAnswer(); 
    } 
    // Go to the next question 
    currentQuestion++;
    // If last question then stop listening
    if (currentQuestion >= data.length) {
        voice.removeCallback(`result`); 
    }
}

function displayInfo() {
    push(); 
    fill(255);
    textStyle(BOLD);
    textFont(`Helvetica`);
    textSize(24);
    text(`click for next question`, 100, 50); 
    pop(); 

    // if voice has said the heard of the current question, then, display the heard below the answers 
}

function displayProfile() {
    push();
    fill(255);
    textFont(`Courier`);
    textSize(18);
    // Loop through the data array to display the categories and answers
    let dataStringCategory;
    for (let i = 0; i < data.length; i++) {
      // Question display 
      dataStringCategory += `${data[i].category}:\n\n\n`;
      noLoop(); 
    }
    // Display the string
    text(dataStringCategory, 100, 200);
    pop();
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
    // Maybe create a variable that is true or false and if its true then the new answer is revealed 
    let dataStringHeard; 
    // for (let i = 0; i < data.length; i++) {
    //     dataStringHeard += `${data[i].heard}\n\n\n\n`; 
    //     noLoop(); 
    // }
    if (currentQuestion < data.length) {
        push();
        fill(0);
        textFont(`Courier`);
        textSize(14);
        dataStringHeard += `${data[currentQuestion].heard}`; 
        text(dataStringHeard, 120, 230); 
        pop(); 
    }
}