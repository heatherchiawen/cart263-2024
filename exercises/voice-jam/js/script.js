/**
 * Voice Jam 
 * Heather Chester 
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

// Questions and heard information used in text and speech 
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

// Images 
let heart;
let chatBox;
let pig; 

// Array and amount of hearts that will show up at the ending state 
let heartDrops = []; 
let numHeartDrops = 150; 

/**
 * Description of preload
*/
function preload() {
    heart = loadImage(`assets/images/heart.png`); 
    chatBox = loadImage(`assets/images/chatBox.png`); 
    pig = loadImage(`assets/images/pig.png`); 
}

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight); 
    speechRecognizer.onResult = handleResult; // Sends detected speech to handleResult()
    speechRecognizer.continuous = true; // SpeechRecognizer is continuously on  
    speechRecognizer.start(); 
    setupHearts(); // Sets up heart array for the ending state 
}

/**
 * Description of draw()
*/
function draw() {
    background(230, 181, 223); 

    // To call functions based on what state the program is in 
    if (state === `title`) {
        title(); 
    } else if (state === `simulation`) {
        simulation(); 
    } else if (state === `ending`) {
        ending(); 
    }

    // Default text 
    fill(0);
    textFont(`DotGothic16`);
    textSize(14);
}

function mousePressed() {
    // Porgram asks question as the program switches states and continues in the simulation state 
    if (state === `title`) {
        state = `simulation`;
        askingQuestion();
    } else if (state === `simulation`) {
        askingQuestion(); 
    }
}

function askingQuestion() { // Initiates questions and displays them, called in mousePressed()
    voice.speak(data[currentQuestion].question);
    displayText = `${data[currentQuestion].question}`;    
}

function handleResult() { // To handle speechRecognizer  
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
    // Image and text displays for the title state 
    displayText = `Looking for your ideal match this Valentines day?\nPlease click anywhere to continue.`; 
    image(heart, width/2 - 200, height/2 - 75, 100, 150); 
    text(displayText, width/2 - 90, height/2); 
}

function simulation() {
    erase(); // Erasing images and text from previous state 

    // Image and text displays 
    image(heart, width/2, height/2, 100, 150); 
    image(chatBox, width/2 - 300, height/6, 400); 
    text(displayText, width/2 - 240, height/2 - 135); 

    // If any key is pressed switch to ending state 
    if (keyIsPressed) {
        state = `ending`; 
    }
}

function ending() {
    erase(); // Erasing images and text from previous state 

    // text display 
    textSize(24);
    textAlign(CENTER); 
    text(`Get that bag I guess…`, width/2, height/4); 

    // Pig image display 
    imageMode(CENTER); 
    image(pig, width/2, height/2, 300, 375); 

    // Loop for heart display and moving
    for (let i = 0; i < numHeartDrops; i++) {
        displayHearts(heartDrops[i]); 
    }
}

function setupHearts() { // Sets up hearts display for ending state, called in setup()
    for (let i = 0; i < numHeartDrops; i++) {
        let hearts = createHearts(random(0, width), random(0, height));
        heartDrops.push(hearts);
    }
}

function createHearts(x, y) { // Creating hearts called in setup Function 
    let hearts = {
        x: x, 
        y: y, 
        width: 100,
        height: 150, 
        speed: random(5, 10),
        gravity: 1.05
    };
    return hearts; 
}

function displayHearts(hearts) { // Hearts image display and movement 
    image(heart, hearts.x, hearts.y, hearts.width, hearts.height);
    hearts.y += hearts.speed*hearts.gravity; 
}