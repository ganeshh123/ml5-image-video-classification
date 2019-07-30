let canvasDOM; // The Canvas Div from the HTML Page
let canvasMain; // The p5 canvas
let canvasMainWidth; // The width of the p5 canvas
let canvasMainHeight; // The height of the p5 canvas

let mode = 0; // The current mode, 0 = video, 1 = image

let img; // The temporary image to analyse
let video; // The video feed to analyse

let videoclassifier; // The ml5 model to analyse the video
let imageclassifier; // The ml5 model to analyse the image

let label = ''; // The text to be displayed in the UI
let result = ' '; // The result of the ml5 analysis
let prob = ''; // The probability of the result of the ml5 analysis


function setup() {
    canvasDOM = document.getElementById('canvasMain'); // Get the Canvas div
    canvasMainWidth = canvasDOM.offsetWidth; // Set width of canvas
    canvasMainHeight = canvasDOM.offsetHeight; // Set height of canvas


    canvasMain = createCanvas(canvasMainWidth, canvasMainHeight); // Draw the canvas
    canvasMain.parent('canvasMain'); // Place it in the div
    canvasMain.drop(gotFile); // Set the function to be run on drag-drop
    background(255); // Make the background white

    textSize(28); // Set the text size
    fill(0); // Set the text colour

    if (mode == 0) { // When in video mode..
        video = createCapture(VIDEO); // Set video to be the webcam feed
        video.hide(); // And hide it
        label = "Please wait, connecting..."; // Set the message to tell the user the model is loading
        videoclassifier = ml5.imageClassifier('MobileNet', video, modelReady); // Create an imageclassifier model using MobileNet, feeding it the videom and running modelReady on completion
    }

}

function draw() {

    background(255);
    fill(0);
    text(label, 112, 630);

    if (mode == 0) {
        text('ALLOW CAMERA ACCESS', 300, 300);
        image(video, 112, 0, 800, 600);
    }

    if (mode == 1) {
        if (img) {
            image(img, 112, 0, 800, 600);
        } else {
            fill(0);
            text('DROP AN IMAGE HERE', 300, 300);
        }
    }

}

function toggleImage() {
    mode = 1;
    label = "Drag and Drop an Image Here";
    video.hide();
    clear();
    videoclassifier = null;
    background(255);
    mode = 1;
    imageclassifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function toggleCamera() {
    clear();
    background(0, 0, 0);
    label = "Please wait, connecting...";
    mode = 0;
    video = createCapture(VIDEO);
    video.hide();
    videoclassifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function gotFile(file) {
    mode = 1;
    video.hide();
    img = createImg(file.data).hide();
    label = 'Analysing, please wait';
    imageclassifier = ml5.imageClassifier('MobileNet', modelLoaded);
    if (img) {
        imageclassifier.predict(img, gotImageResults);
    }
}

function modelReady() {
    console.log(' Video Model Ready');

    label = 'Place object in camera view';
    videoclassifier.classify(gotVideoResults);
}

function modelLoaded() {
    console.log('Image Model Ready');
    if (img) {
        imageclassifier.predict(img, gotImageResults);
    }
}

function gotVideoResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        result = getName(results[0].label);
        prob = getPercentage(results[0].confidence);
        label = result + " with a probability of " + prob + "%";

        if (mode == 0) {
            setTimeout(function() {
                videoclassifier.classify(gotVideoResults);
            }, 500);
        }

    }

}

function gotImageResults(error, results) {
    if (error) {
        console.error(error);
        result = getName(results[0].label);
        prob = getPercentage(results[0].confidence);
        label = result + " with a probability of " + prob + "%";
    } else {
        result = getName(results[0].label);
        prob = getPercentage(results[0].confidence);
        label = result + " with a probability of " + prob + "%";

    }
}

function getName(input) {
    var result = input.split(",", 1);
    var string = result[0];
    var output = string.charAt(0).toUpperCase() + string.slice(1);
    return output;
}

function getPercentage(input) {
    var result = input * 100;
    var output = result.toFixed(2);
    return output;
}