/**
Game engine jam - Drummin' Drumsticks 
Heather Chester 

Using Phaser 3, this game allows for users to add drums with clicking their mouse. 
The user is a drumstick, collecting the drums to play, in hopes that they can explore and create some intresting rythms.

While I realize that the README file was not part of the js template .zip folder, I will be detailing the potential of 
this project here to avoid potential file corruption, or anything else that might go wrong.

I created this game in hopes that I might be able to combine my exploration of Phaser 3 with some of my prior 
knowledge of music theory. Although I never played the drums, its an instrument that I decided to focus on in this 
exploration since it's more rhythmic focused.  

The overall aesthetic of project is modelled after a sheet of music. Although all components have not been added, 
there are many possibilities for aesthetic and practical alterations or additions for its potential continuation. 
This might look like more staffs on which the avatar can move along and jump to collect/encounter various 
sounds/objects and other notations kept in a tool bar and accessed by the user's mouse. I could also then change 
the restraints of movement for the avatar to move across the top of the staff and off the page, appearing at the 
beginning of staff below to collect items in a sequential order. 

While building this, I ran into collison issues with the creating the "ground" as a group and then adding a "rest" 
groups with a similar build to act as a barrier for the user, which ended up negating the collision check of the ground. 
I would hope to fix this issue, with either for-loops or an alternative method so that I can create more groups of 
objects that would not be created by the user's mouse and serve other purposes. Some of which, might look like an 
unwarrented pitch change or, the slowing-down or speeding-up the avatars X-velocity, etc. With that in mind, I hope to 
incporate a metronome or a signiture that might corespond with the creation of another character that would chase the 
user according to the tempo or even cause the user rush. 

All that being said, building this game came with its own learning curve. I struggled trying to understand how to 
implement and modify the Phaser 3 examples within my own code to fit my desired game idea. Instead, I opted to refer 
to the course examples for the general build and, the Phaser 3 API documentation and other articles that I found online 
for building certain aspects and general trouble shooting. While I would have liked to refine this code more, I hope that 
in time I can familiarize myself with Phaser 3 and create a more aestheticized and enagaging game. 


Attestations for tools used: 

All images I created myself using piskel, referred to by Pippin Barr's course material. 
https://www.piskelapp.com/p/create/sprite. 

Phaser 3 API documentation referenced for 
https://newdocs.phaser.io/docs/3.80.0/events. 


Attestations for references used:

Barr, Pippin. "Phaser 3 Physics and Collisions," Cart 263, Concordia University, last accessed March 24, 2024.
https://pippinbarr.com/cart263/topics/game-engine/phaser-3-physics-and-collisions.html. 

Barr, Pippin. "Phaser 3 Physics and Movements," Cart 263, Concordia University, last accessed March 24, 2024.
https://pippinbarr.com/cart263/topics/game-engine/phaser-3-physics-and-movement.html. 

Barr, Pippin. "Phaser 3 Setup," Cart 263, Concordia University, last accessed March 24, 2024.
https://pippinbarr.com/cart263/topics/game-engine/phaser-3-setup.html.

Barr, Pippin. "Phaser 3 Sprites," Cart 263, Concordia University, last accessed March 24, 2024.
https://pippinbarr.com/cart263/topics/game-engine/phaser-3-sprites.html. 

Koenig, Mike."Bass Drum Rock Kick," free-loops.com, last accessed March 24, 2024. 
https://free-loops.com/7207-bass-drum-rock-kick.html. 

*/

"use strict";

// Code goes here

let config = {
    type: Phaser.AUTO, 

    width: 800, 
    height: 600, 

    backgroundColor: '#ffffff', 

    physics: {
        default: 'arcade', 
    }, 

    scene: [Boot, Play]
}

let game = new Phaser.Game(config); 