/**
Game engine jam/ ... TBA 
Heather Chester 

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Code goes here

let config = {
    type: Phaser.AUTO, 

    width: 800, 
    height: 600, 

    physics: {
        default: 'arcade', 
    }, 

    scene: [Boot, Play]
}

let game = new Phaser.Game(config); 