noseX = 0;
noseY = 0;
difference = 0;
right_wristX = 0;
left_wristX = 0;

function setup() {
    canvas = createCanvas(500,500);
    canvas.position(550,120);
    video = createCapture(VIDEO);
    video.size(500,500);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = "+noseX+"Nose Y = "+noseY);

        right_wristX = results[0].pose.rightWrist.x;
        left_wristX = results[0].pose.leftWrist.x;
        difference = floor(left_wristX - right_wristX);
        console.log("Right Wrist X = "+right_wristX+", Left Wrist X = "+left_wristX+", Difference = "+difference);
    }
}

function draw() {
    background('#D8F2FF');
    fill('#9b5ef7');
    stroke('#9b5ef7');
    square(noseX,noseY,difference);
    document.getElementById("square_sides").innerHTML = "Width and Height of The Square Will Be "+difference+" Pixels";
}

function preload() {

}

function modelLoaded() {
    console.log("Model Has Been Loaded");
}