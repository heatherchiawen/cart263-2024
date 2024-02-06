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

let currentChatSpeech = ``; // Current speech for the bot 
let currentSpeech = ``; // What is currently being said 

let endSpeech = `Looks like we have found your ideal match! Please click the button below to reveal`; 

let data = [ {
    category: `Relationship`,
    question: `What kind of relationship are you looking for?`,
    answer: ` `, 
    heard: `You said: Taxing`
}, 
{
    category: `Hobbies`,
    question: `What are some of your hobbies?`,
    answer: ` `, 
    heard: `You said: Increasing tuition fees for out-of-province and international students and ensuring public sector workers are not paid a livable wage all while making sure there is a surplus of money in my pocket`
}, 
{
    category: `Traits`,
    question: `What traits do you seek for in your ideal partner?`,
    answer: ` `, 
    heard: `You said: Deep pockets with a passion for aggravating the masses`
}, 
{
    category: `Age`,
    question: `Age is just a number... but what number are you looking for?`,
    answer: ` `, 
    heard: `You said: 66...6`
}, 
{
    category: `Looks`, 
    question: `Describe your dream appearance for your potential partner`,
    answer: ` `, 
    heard: `You said: Privileged cis-het white man who should retire`,
}
];

let currentQuestion = 0; 

let showSubtitle = false; 
// let state = `title`; 

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowHeight, windowWidth); 
    speechRecognizer.onResult = handleResult; // Set up function to use 
    speechRecognizer.start(); 
    speechRecognizer.continuous = true; 

    // if (speechRecognizer) {
    //     speechRecognizer.start(); 
    //     speechRecognizer.addCallback(`result`, handleResult); 
    // }

    // // To call text when speaking 
    // voice.onStart = speechStarted; 
    // voice.onEnd = speechEnded; 
}


/**
 * Description of draw()
*/
function draw() {
    background(230, 181, 223); 

    displayQuestion(); 
    displayProfile();
}

function mousePressed() {
    voice.speak(data[currentQuestion].question); 
    // Add something that waits for the user to answer 
}

function handleResult() { 
   // If program detects sound  
   if (speechRecognizer.resultValue) {
    // Then repeat what is "heard"
    data[currentQuestion].answer = data[currentQuestion.heard]; 
    // Then move on to the next question 
   }
    // Go to the next question 
    currentQuestion++; 
    // If last question then stop listening // this sound be an else if statement ???
    if (currentQuestion >= data.length) {
        voice.removeCallback(`result`); 
    }
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