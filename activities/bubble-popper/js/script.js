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
// Bubble 
let bubble = undefined; 

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

    // 
    bubble = {
        x: random(width),
        y: height,
        size: 100, 
        vx: 0, 
        vy: -2
    }
}


/**
 * Description of draw()
*/
function draw() {
    background(0); 

    // Handpose 
    if (predictions.length > 0) {
        let hand = predictions[0]; 
        let index = hand.annotations.indexFinger; 
        let tip = index[3]; 
        let base = index[0]; 
        let tipX = tip[0]; 
        let tipY = tip[1]; 
        let baseX = base[0]; 
        let baseY = base[1]; 

        push();
        noFill(); 
        stroke(255); 
        strokeWeight(5); 
        line(baseX, baseY, tipX, tipY); 
        pop(); 

        push(); 
        noStroke(); 
        fill(255, 0, 0); 
        ellipse(baseX, baseY, 20); 
        pop(); 

        // Check bubble popping 
        let d = dist(tipX, tipY, bubble.x, bubble.y); 
        if  (d< bubble.size/2) {
            bubble.x = random(width); 
            bubble.y = height; 
        }
    }

    // Move the bubble 
    bubble.x += bubble.vx; 
    bubble.y += bubble.vy; 

    if (bubble.y < 0) {
        bubble.x = random(width); 
        bubble.y = height; 
    }

    push();
    fill(0, 100, 200); 
    noStroke(); 
    ellipse(bubble.x, bubble.y, bubble.size); 
    pop(); 

}