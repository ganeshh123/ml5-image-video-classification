let canvasDOM;
let canvasMain;
let canvasMainWidth;
let canvasMainHeight;

let mode = 0;

let img;
let video;

let videoclassifier;
let imageclassifier;

let label = '';
let result = ' ';
let prob;


function setup() {
    canvasDOM = document.getElementById('canvasMain');
    canvasMainWidth = canvasDOM.offsetWidth;
    canvasMainHeight = canvasDOM.offsetHeight;


    canvasMain = createCanvas(canvasMainWidth, canvasMainHeight);
    canvasMain.parent('canvasMain');
    canvasMain.drop(gotFile);
    background(255);

    textSize(28);
    fill(0);

    if (mode == 0) {
        video = createCapture(VIDEO);
        video.hide();
        label = "Please wait, connecting...";
        videoclassifier = ml5.imageClassifier('MobileNet', video, modelReady);
    }

    if (mode == 1) {
        label = "Please wait, connecting...";
    }
}

function draw() {

    background(255);
    fill(0);
    text(label, 10, 700);

    if (mode == 0) {
        image(video, 112, 0, 800, 600);
    }

    if (mode == 1) {
        if (img) {
            image(img, 112, 0, 800, 600);
        }
    }

}

function toggleImage() {
    video.hide();
    clear();
    mobilenet = null;
    background(255);
    label = "Drag and Drop an Image Here";
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
}

function gotFile(file) {
    mode = 1;
    video.hide();
    img = createImg(file.data).hide();
    if (img) {
        imageclassifier = ml5.imageClassifier('MobileNet', img, modelReady);
    }
}

function modelReady() {
    console.log(' Video Model Ready');

    label = 'Place object in camera view';
    videoclassifier.classify(gotVideoResults);
}

function modelLoaded() {
    console.log('Image Model Ready');
    label = 'Analysing Image';
    imageclassifier.predict(img, gotImageResults);

}

function gotVideoResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        result = results[0].label;
        prob = results[0].confidence;
        label = "Result: " + result + " with a probability of " + prob;
        console.log(label);

        if (mode == 0) {
            mobilenet.classify(gotResults);
        }

    }

}

function gotImageResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        result = results[0].label;
        prob = results[0].confidence;
        label = "Result: " + result + " with a probability of " + prob;
        console.log(label);

    }
}