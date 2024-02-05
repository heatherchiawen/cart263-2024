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

const toSay = [ `What kind of relationship are you looking for?`, 
    `You said: Taxing`, 
    `What are some of your hobbies?`,
    `You said: Increasing tuition fees for out-of-province and international students and ensuring public sector workers are not paid a livable wage all while making sure there is a surplus of money in my pocket`,
    `What traits do you seek for in your ideal partner?`,
    `You said: Deep pockets with a passion for aggravating the masses`, 
    `Age is just a number... but what number are you looking for?`,
    `You said: 66...6`,
    `Describe your dream appearance for your potential partner`,
    `You said: Privileged cis-het white man who should retire`,
    `Looks like we have found your ideal match! Please click the button below to reveal`
]

let showSubtitle = false; 
// let state = `title`; 

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowHeight, windowWidth); 
    speechRecognizer.onResult = handleResult; // Set up function to use 
    speechRecognizer.continuous = true; 
    speechRecognizer.start(); 

    voice.onStart = speechStarted; 
    voice.onEnd = speechEnded; 
}


/**
 * Description of draw()
*/
function draw() {
    background(230, 181, 223); 

    // if (state === `title`) {
    //     title(); 
    // } else if (state === `simulation`) {
    //     simulation(); 
    // } else if (state === `end`) {
    //     end(); 
    // }

    // Get rid of this when states are done 
    push(); 
    textSize(24); 
    textAlign(CENTER); 
    rectMode(CENTER); // 
    fill(0); 
    text(currentSpeech, width/2, height/2, width - width/10, height/2); 
    pop(); 

    if (showSubtitle) {
        push();
        text(toSay, width/2, height/2, width - width/10, height/4);
        pop();  
    }
}

function mousePressed() {
    let currentChatSpeech = toSay; 

    for (let i = 0; i < toSay.length; i++) {
        // let toSay = toSay[i]; 
        voice.speak(toSay[i]); // Script for customer service rep 
    }
}

function speechStarted() {
    showSubtitle;
}

function speechEnded() {
    !showSubtitle; 
}

function handleResult() {
    currentSpeech = speechRecognizer.resultString; 
    // if (speechRecognizer.resultString.toLowerCase() === `turn the lights on`) {

    // }
}

function title() {
    push(); 
    textSize(24); 
    textAlign(CENTER); 
    rectMode(CENTER); // 
    fill(0); 
    text(`In the spirit of Valentines day, we want find your ideal match. Please click the heart to continue`, width/2, height/2, width - width/10, height/2); 
    pop(); 
}

function simulation() {
    push(); 
    textSize(24); 
    textAlign(CENTER); 
    rectMode(CENTER); // 
    fill(0); 
    text(currentSpeech, width/2, height/2, width - width/10, height/2); 
    pop(); 

    if (showSubtitle) {
        push();
        text(toSay, width/2, height/2, width - width/10, height/4);
        pop();  
    }
}

function end() {
    push(); 
    textSize(24); 
    textAlign(CENTER); 
    rectMode(CENTER); // 
    fill(0); 
    text(`You found a match!`, width/2, height/2, width - width/10, height/2); 
    pop(); 
}