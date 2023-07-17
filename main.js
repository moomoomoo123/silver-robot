song1 = "";
song2 = "";

status1 = "";
status2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;


function preload() {
    song1 = loadSound("BTS.mp3");
    song2 = loadSound("TWICE.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized!")
}

function draw() {
    image(video, 0, 0, 600, 500);

    status1 = song1.isPlaying();
    status2 = song2.isPlaying();

    fill("#FFBA6E");
    stroke("FFBA6E");

    if (scoreLeftWrist > 0.2) {
        
        circle(leftWristX, leftWristY, 20);
            song2.stop()

        if (status1 == false) {
            song1.play();
            document.getElementById("h").innerHTML = "Playing - Blood, Sweat, and Tears";
        }
    }

    if (scoreRightWrist > 0.2) {
        
        circle(rightWristX, rightWristY, 20);
            song1.stop()

        if (status1 == false) {
            song2.play();
            document.getElementById("h").innerHTML = "Playing - Wallflower";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {

   if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreRightWrist = " + scoreRightWrist + "ScoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + "LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY);
   }
}