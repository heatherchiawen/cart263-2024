/**
 * Slamina Activity
 * Heather Chester
 * 
 */

"use strict";

/**
 * Description of preload
*/
function preload() {
}

const animals = [
    "aardvark",
    "alligator",
    "alpaca",
    "antelope",
    "ape",
    "armadillo",
    "baboon",
    "badger",
    "bat",
    "bear",
    "beaver",
    "bison",
    "boar",
    "buffalo",
    "bull",
    "camel",
    "canary",
    "capybara",
    "cat",
    "chameleon",
    "cheetah",
    "chimpanzee",
    "chinchilla",
    "chipmunk",
    "cougar",
    "cow",
    "coyote",
    "crocodile",
    "crow",
    "deer",
    "dingo",
    "dog",
    "donkey",
    "dromedary",
    "elephant",
    "elk",
    "ewe",
    "ferret",
    "finch",
    "fish",
    "fox",
    "frog",
    "gazelle",
    "gila monster",
    "giraffe",
    "gnu",
    "goat",
    "gopher",
    "gorilla",
    "grizzly bear",
    "ground hog",
    "guinea pig",
    "hamster",
    "hedgehog",
    "hippopotamus",
    "hog",
    "horse",
    "hyena",
    "ibex",
    "iguana",
    "impala",
    "jackal",
    "jaguar",
    "kangaroo",
    "koala",
    "lamb",
    "lemur",
    "leopard",
    "lion",
    "lizard",
    "llama",
    "lynx",
    "mandrill",
    "marmoset",
    "mink",
    "mole",
    "mongoose",
    "monkey",
    "moose",
    "mountain goat",
    "mouse",
    "mule",
    "muskrat",
    "mustang",
    "mynah bird",
    "newt",
    "ocelot",
    "opossum",
    "orangutan",
    "oryx",
    "otter",
    "ox",
    "panda",
    "panther",
    "parakeet",
    "parrot",
    "pig",
    "platypus",
    "polar bear",
    "porcupine",
    "porpoise",
    "prairie dog",
    "puma",
    "rabbit",
    "raccoon",
    "ram",
    "rat",
    "reindeer",
    "reptile",
    "rhinoceros",
    "salamander",
    "seal",
    "sheep",
    "shrew",
    "silver fox",
    "skunk",
    "sloth",
    "snake",
    "squirrel",
    "tapir",
    "tiger",
    "toad",
    "turtle",
    "walrus",
    "warthog",
    "weasel",
    "whale",
    "wildcat",
    "wolf",
    "wolverine",
    "wombat",
    "woodchuck",
    "yak",
    "zebra"
]; 
  
let currentAnimal = ``;
let currentAnswer = ``; 

const voice = new p5.Speech(); // For speech output 
let speechRecognizer = new p5.SpeechRec(); 

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
    background(202, 100, 202);
    // To display answers on canvas and to see if wrong, red and if right green 
    if (currentAnswer === currentAnimal) {
        fill(0, 200, 0);
    }
    else {
        fill(200, 0, 0); 
    }
    textSize(32); 
    textAlign(CENTER, CENTER); 
    text(currentAnswer, width/2, height/2);
}

function mousePressed() {
    // Assign random animal name from animal name array to currentAnimal 
    currentAnimal = random(animals); 
    // Declare reverseAnimal and assign the reverse of currentAnimal to it by using reverseString(currentAnimal);
    let reverseAnimal = reverseString(currentAnimal);  
    // Use speechSynthesizer to speack reverse Animal 
    voice.speak(reverseAnimal); 
}

function handleResult() {
    let guessedAnimal = `what?` // If the program didn't understand the user 
    if (speechRecognizer.resultValue) { // Split method to break up the command into to two parts "i think it is" and the answer 
        let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
        let parts = lowerCaseResult.split(`i think it is `); // remember the space before the actual answer 
        if (parts.length > 1) { // If greater than one the program was able to split the answer into the two parts 
            guessedAnimal = parts[1]; // 1 signifies the the users answer after "I think it is"
        }
    } 
    currentAnswer = guessedAnimal; 
    console.log(currentAnswer); 
}

/**
Reverses the provided string
*/
function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split(``);
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join(``);
    // Return the result
    return result;

// You could also combine all this into:
// return string.split(``).reverse().join(``);
}