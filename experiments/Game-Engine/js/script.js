/**
Phaser 3 Game Engine Experiments 
Heather Chester 

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// https://www.piskelapp.com/ is a website to make pixel art 

// Code goes here

let config = {
    type: Phaser.AUTO, 

    width: 800, 
    height: 600,

    physics: {
        default: `arcade`, 
    }, 
    // Boot scene loads and comes first in list of scenes 
    scene: [Boot, Play]
}; 

let game = new Phaser.Game(config); 