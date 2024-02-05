# Template p5 project

Where I am keeping notes regarding the voices section of the CART 263 course work 

JSON - java script to define data that we will be using in our program 

javascript objects with: 
{
    "Property names": {
    "objects": ["array", "array"], // Information about the property name 
    }
}
or can be written as: 
[
    "array",
    "array",
    "array"
]

So, a JSON can be written as an object with data in it or an array with data in it

darius.k.corporia is a resource for JSON data 
or there are more online resources, or you could create your own by creating a file that you would save into data, then assets, and title name.json 

To grab the file from another creatorm you would have to click on the "raw" button on GitHub and save it via "Save Page As" to desktop making sure it saves as  JSON. Then, copy it to "assets" and then "data" in your project folder 

To load JSON data, go to p5 reference, use loadJSON(`assets/data/file_name.json`) in preload() with an undefined variable to load it into 

To use data start by: 
let description = tarotData.description; 

See vid by pippin at 26mins for more use 
https://www.youtube.com/watch?v=po6d5FY9jFI 