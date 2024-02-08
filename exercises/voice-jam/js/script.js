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


let data = [ { // Referenced professor Pippin Barr’s “Misheard Dating Profile” simulation to create a data string. See README for citation. 
    question: `What kind of relationship\nare you looking for?`,
    heard: `You said: "Taxing."\nClick once for the next question.`
}, 
{
    question: `What are some of your hobbies?`,
    heard: `You said: "Increasing tuition fees for\nout-of-province and international\nstudents and ensuring public sector\nworkers are not paid a livable wage\nall while making sure there is a\nsurplus of money in my pocket."\nClick once for the next question.`
}, 
{
    question: `What traits do you seek for in your\nideal partner?`,
    heard: `You said: "Deep pockets with a passion\nfor aggravating the masses."\nClick once for the next question.`
}, 
{
    question: `Age is just a number...\nbut what number are you looking for?`,
    heard: `You said: "66...6."\nClick once for the next question.`
}, 
{
    question: `Describe your dream appearance\nfor your potential partner.`,
    heard: `You said: "Pig."\nIt seems like we have a match.\nClick any key to reveal.`
}
];

// To start questions in sequential order
let currentQuestion = 0; // Referenced from professor Pippin Barr’s “Misheard Dating Profile” simulation. See README for citation.  

// Text to appear 
let displayText = ``; // Referenced professor Pippin Barr’s “Re:programming” simulation. See README for citation. 
let currentSpeech = ``; // What is currently being said 

let state = `title`; // Starting state 

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

    if (state === `title`) {
        title(); 
    } else if (state === `simulation`) {
        simulation(); 
    } else if (state === `end`) {
        end(); 
    }

    // Text Settings 
    fill(0);
    textStyle(BOLD);
    textFont(`DotGothic16`);
    textSize(14);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
        askingQuestion();
    } else if (state === `simulation`) {
            askingQuestion(); 
    }
}

function askingQuestion() {
    voice.speak(data[currentQuestion].question);
    displayText = `${data[currentQuestion].question}`;    
}

function handleResult() { 
    // To see if it is detecting speech input 
    if (speechRecognizer.resultValue === true) {
        console.log(speechRecognizer.resultString); 
        currentSpeech = speechRecognizer.resultString; 
        // Displays what is heard 
        displayText = `${data[currentQuestion].heard}`; 
        // Program says what is "heard"
        voice.speak(displayText);
    } 
    // Go to the next question 
    currentQuestion++;
}

function title() {
    displayText = `Looking for your ideal match this Valentines day?\nPlease click anywhere to continue.`; 
    image(heart, width/2 - 200, height/2 - 75, 100, 150); 
    text(displayText, width/2 - 90, height/2); 
}

function simulation() {
    erase(); 
    image(heart, width/2, height/2, 100, 150); 
    image(chatBox, width/2 - 300, height/6, 400); 
    text(displayText, width/2 - 240, height/2 - 135); 
    if (keyIsPressed) {
        state = `ending`; 
    }
}

function ending() {
    erase();
    displayText = `Get that bag I guess…`; 
}