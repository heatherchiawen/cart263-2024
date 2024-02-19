/**
 * Bubble Popper - AI activity 
 * Heather Chester 
 * 
 */

"use strict";

/**
 * Description of preload
*/

// User's webcam 
let video = undefined; 
// Handpose model
let handpose = undefined; 
// Current set of predictions 
let predictions = []; 

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 

    // Access user's webcame 
    video = createCapture(VIDEO); 
    video.hide();

    // Load the handpose model 
    handpose = ml5.handpose(video, {
        fliphorizontal: true
    }, function() {
        console.log(`Model loaded.`); 
    });

    // Listen for predictions 
    handpose.on(`predict`, function(results) {
        console.log(results); 
        predictions = results; 
    }); 
}


/**
 * Description of draw()
*/
function draw() {
    background(0); 

}