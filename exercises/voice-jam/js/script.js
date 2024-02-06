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

    // // To call text when speaking 
    // voice.onStart = speechStarted; 
    // voice.onEnd = speechEnded; 
}


/**
 * Description of draw()
*/
function draw() {
    background(230, 181, 223); 

    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation(); 
    }

    // displayQuestion(); 
    // displayProfile();

//     if (showSubtitle) {
//         textSize(18); 
//         text(??, 100, 100); 
//     }
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}

function handleResult() { 
    // To see if it is detecting speech input 
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
    } 
    // Program says what is "heard"
    voice.speak(data[currentQuestion].heard);
    // Go to the next question 
    currentQuestion++;
    // // If last question then stop listening // this sound be an else if statement ???
    // if (currentQuestion >= data.length) {
    //     voice.removeCallback(`result`); 
    // }
}

function title() {
    push();
     textSize(24); 
     fill(200, 100, 100);
     textAlign(CENTER, CENTER);
     text('In the spirit of Valentines day, we want find your ideal match. Please click the heart to continue', width/2, height/2);
     pop();
}

function simulation() {
    voice.speak(data[currentQuestion].question); 

}

function displayQuestion() { // Copied from misheard-dating-profile code by Pippin 
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

function displayProfile() { // Copied from misheard-dating-profile code by Pippin 
    push();
    fill(255);
    textFont(`Courier`);
    textSize(18);
    // A header
    let dataString = `Dating profile\n\n`;
    // Loop through the data array to display the categories and answers
    for (let i = 0; i < data.length; i++) {
      // Add the current category and answer to our string to display
      dataString += `${data[i].category}: ${data[i].answer}\n`;
    }
    // Display the string
    text(dataString, 100, 200);
    pop();
  }

function speechStarted() { // For text to show when voice is speaking 
    showSubtitle = true; 
}
function speechEnded() { // For text to not sho wwhen voice is not speaking 
    showSubtitle = false; 
}