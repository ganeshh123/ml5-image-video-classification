let canvasDOM;
let canvasMain;
let canvasMainWidth;
let canvasMainHeight;

let mode = 0;

let img;
let video;

let mobilenet;

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
    background(0, 0, 0);

    textSize(64);
    fill(255);

    if (mode == 0) {
        video = createCapture(VIDEO);
        video.hide();
        label = "Please wait, connecting...";
        mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
    }

    if (mode == 1) {
        label = "Please wait, connecting...";
    }
}

function draw() {

    background(0);
    fill(255);
    text(label, 100, 700);

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
    background(0, 0, 0);
    label = "Please wait, connecting...";
    mode = 1;
    dropzone = rect(112, 0, 800, 600);
    dropzone.fill(255);
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
        mobilenet = ml5.imageClassifier('MobileNet', img, modelReady);
    }
}

function modelReady() {
    console.log('Model Ready');

    if (mode == 0) {
        label = 'Place object in camera view';
        mobilenet.classify(gotResults);
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        result = results[0].label;
        prob = results[0].confidence;
        label = "Result: " + label + " with a probability of " + prob;
        console.log(label);

        if (mode == 0) {
            mobilenet.classify(gotResults);
        }

    }

}