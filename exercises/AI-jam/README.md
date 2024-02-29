# Template p5 project

AI Jam - Sound Manipulator 

Heather Chester 

This program explores how hand gestures can be used to manipulate sounds as form of expression. The thumb coordinates set volume and notes of the program. 

I took inspiration from this program from Imogen Heap's NPR Tink Desk performance where they demonstrate their own creation, "Mi.Mu gloves," that offer a more expressive performance with technology. The gloves themeselves are worn and connect to software, that controls various aspects of the music production, from recording, reverb, intrumentals, and many other manipulation techniques. 

After seeing the possibilities of ml5, I thought that the hand recognition could be utilized to create a potentially more acessible, though not as advanced version of Imogen's product and software. I decided to experiment with a few aspects of sound manipulation, like pitch and volume, mapped based on the coordinates of the hand, but anticipate significant areas for improvement. As according to course syllabus, the final project will be a development of one our jams and I am excited to look at the possibilities associated with AI recognition for sound manipulation. 

As for building up this program, I stuggled with identifying and working with keypoints/annotations in order to achieve the functions I was looking for. I started this program with the basic ml5 framework sampled from Pippin Barr's "Bubble-Popper" acitivity and some code from a previous sound based project to build up the sound portions, however,I found it difficult to coordinate the sound class and its predetermined functions with hand annotation and their movements. I tried to experiment with writing out code for each annotation in hopes that I might have each finger indeicate a note to be played, but found that tedious and convoluted. Eventually, I removed the code from the previous project, as it seemed to restricted my uses of a sound synth and moved it out of an array and into my main script, taking only a few lines of code. I further looking into different formatting documentation from various p5 and ml5 sketches, attempting to better understand how to call the annotations, and experimented on my own, seeing what variations were working for me. Eventually, I ended up with a fairly staightforward use of mapping the hand coordinates, however, anticipate further use if for a potential final project. Furthermore, I believe creating a porgram like such with ml5 might open up more opportunities for myself as a programmer and user of the program to experiment with sound expression in various ways. 

"Imogen Heap: NPR Music Tiny Desk Concert," Youtube, NPR Music. June 28, 2019. https://youtu.be/3QtklTXbKUQ?si=0Cdrc8CsZp0WpYBa. 

"Bubble-Popper," GitHub and VS Code, Pippin Barr and Concordia University. Last modified 2022. https://github.com/pippinbarr/cart263/blob/91f72416b264f8c5a74196827b45d0e6fb78b40e/examples/ai/bubble-popper/js/script.js/. 