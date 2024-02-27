/**
 * Title of Project
 * Heather Chester 
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/

let video = undefined; 
let handpose = undefined; 
let predictions = []; 

function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(640, 480); 

    video = createCapture(VIDEO); 
    video.hide(); 

    handpose = ml5.handpose(video, {
        fliphorizontal: true 
    }, function() {
        console.log(`Model loaded.`); 
    }); 

    handpose.on(`predict`, function(results) {
        console.log(results); 
        predictions = results;  
    });


}

// function handleResults(err, results) { // function for if hands are detected 

// }


/**
 * Description of draw()
*/
function draw() {
    background(0); 

    image(video, 0, 0, width, height); 

}