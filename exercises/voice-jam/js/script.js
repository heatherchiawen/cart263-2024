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

let currentSpeech = ``; // What is currently being said 
let displayText = ``; 
let displayQuestion = false; 

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

    if (displayQuestion === true) {
        push();
        fill(255);
        textStyle(BOLD);
        textFont(`Helvetica`);
        textSize(24);
        let question = data[currentQuestion].question;
        text(question, 100, 100);
        pop();
    }
    displayProfile();
}

function mousePressed() {
    displayQuestion === true; 
    voice.speak(data[currentQuestion].question);
}

function handleResult() { 
    // To see if it is detecting speech input 
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
        currentSpeech = speechRecognizer.resultString; 
        // Program says what is "heard"
        voice.speak(`Did you say:${data[currentQuestion].heard}?`);
        // Add something that displays the heard answer with a function? Maybe look into how to preperly use callbacks??
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
}
  
  /**
  Displays the current state of the dating profile
  */
  function displayProfile() {
    push();
    fill(255);
    textFont(`Courier`);
    textSize(18);
    // A header
    let dataString = `Your answers:\n\n\n`;
    // Loop through the data array to display the categories and answers
    for (let i = 0; i < data.length; i++) {
      // Add the current category and answer to our string to display
      dataString += `${data[i].question}:\n\n\n`;
    }
    // Display the string
    text(dataString, 100, 200);
    pop();
  }