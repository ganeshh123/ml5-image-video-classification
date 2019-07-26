var canvasMain;
var canvasMainWidth;
var canvasMainHeight;




function setup() {
    canvasMain = document.getElementById('canvasMain');
    canvasMainWidth = canvasMain.offsetWidth;
    canvasMainHeight = canvasMain.offsetHeight;


    var canvasMain = createCanvas(canvasMainWidth, canvasMainHeight);
    canvasMain.parent('canvasMain');
    background(0, 0, 0);

    //video = createCapture(VIDEO);
    //video.hide();
    background(0);
}

function draw() {
    //image(video, 112, 0, 800, 600);
    fill(255);
    rect(112, 0, 800, 600);
}