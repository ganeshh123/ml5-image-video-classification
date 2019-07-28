let canvasDOM;
let canvasMain;
let canvasMainWidth;
let canvasMainHeight;
let img;
let mode = 0;
let video;
let label = '';
let mobilenet
let result = '';
let prob;


function setup() {
    canvasDOM = document.getElementById('canvasMain');
    canvasMainWidth = canvasDOM.offsetWidth;
    canvasMainHeight = canvasDOM.offsetHeight;


    canvasMain = createCanvas(canvasMainWidth, canvasMainHeight);
    canvasMain.parent('canvasMain');
    canvasMain.drop(gotFile);
    background(0, 0, 0);

    if (mode == 0) {
        video = createCapture(VIDEO);
        video.hide();
        label = "Please wait, connecting...";
        mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
    }
}

function draw() {

    if (mode == 0) {
        image(video, 112, 0, 800, 600);
        text(label, 100, 700);
    }

    if (mode == 1) {
        textSize(64);
        text('DRAG AN IMAGE HERE', 100, 700);
        fill(255);
        if (img) {
            image(img, 112, 0, 800, 600);
        }
    }

}

function toggleImage() {
    video.hide();
    clear();
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
    mobilenet.classify(gotResults);

    if (mode == 0) {
        label = 'Place object in camera view';
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        result = results[0].label;
        prob = results[0].confidence;
        label = "Result: " + label + " with a probability of " + prob;

        if (mode == 0) {
            mobilenet.classify(gotResults);
        }

    }

}