var canvasDOM;
var canvasMain;
var canvasMainWidth;
var canvasMainHeight;
var img;
var mode = 0;
var video;


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
    }

    background(0);

}

function draw() {

    if (mode == 0) {
        image(video, 112, 0, 800, 600);
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
    mode = 1;
    dropzone = rect(112, 0, 800, 600);
    dropzone.fill(255);
}

function toggleCamera() {
    clear();
    background(0, 0, 0);
    mode = 0;
    video = createCapture(VIDEO);
    video.hide();
}

function gotFile(file) {
    mode = 1;
    video.hide();
    img = createImg(file.data).hide();
    img.resize(800, 0);
}