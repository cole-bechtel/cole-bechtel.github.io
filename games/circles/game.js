var sounds = {};

var circle1 = {
    x: null,
    y: -35
};

var circle2 = {
    x: null,
    y: -235
};

var player = {
    x: 200,
    color: null
};
var scene = 0;
var secondplace = 0;
var thirdplace = 0;
var speed = 1;
var lanes = [40, 120, 200, 280, 360];
var time = 0;
var highscore = 0;
var select = [200, 200];


function setup() {
    createCanvas(400, 400).parent("canvas");
    textAlign(CENTER, CENTER);
    frameRate(50);
    textSize(40);


    //Khan Academy sounds
    sounds.die = document.getElementById("die")
    sounds.move = document.getElementById("move")
    sounds.play = document.getElementById("play")
    sounds.yee = document.getElementById("yee")

    player.color = color(0, 0, 255);

    //Moves circles to a random lane
    var rand1 = floor(random(0, 5));
    var rand2 = floor(random(0, 5));
    circle1.x = lanes[rand1];
    circle2.x = lanes[rand2];
}



function draw() {
    background(200, 200, 200);



    if(scene === 0){
        //home scene
        textSize(40);

        fill(0, 0, 0);
        text("Dodge the Circles", 200, 60);
        textSize(20);
        text("Game Created by: Cole Bechtel", 200, 120);
        textSize(35);
        text("Play", 200, 197);
        noFill();
        stroke(0, 0, 0);
        rect(145, 170, 110, 60, 35);
        fill(0, 0, 0);
        textSize(25);
        text("Score: " + floor(time), 200, 280);
        text("High score: " + highscore, 200, 320);
        text("Skins", 350, 370);
        noFill();
        rect(310, 350, 80, 40, 35);

        if(time > highscore){
            highscore = secondplace;
            highscore = floor(time);

        }
        if(time < highscore && time > secondplace){
            secondplace = floor(time);
        }
        if(time < secondplace && time > thirdplace){
            time = floor(thirdplace);
        }

    }
    if(scene === 1){
        speed = speed + 0.005;
        circle1.y = circle1.y + speed;
        circle2.y = circle2.y + speed;

        if(circle1.y > 365){
            circle1.y = -35;
            var rand = floor(random(0, 5));
            circle1.x = lanes[rand];
        }
        if(circle2.y > 365){
            circle2.y = -35;
            var rand = floor(random(0, 5));
            circle2.x = lanes[rand];
        }

        stroke(0, 0, 0);

        //Vertical lines
        line(80, 0, 80, 400);
        line(160, 0, 160, 400);
        line(240, 0, 240, 400);
        line(320, 0, 320, 400);

        noStroke();

        //Circles
        fill(255, 0, 0);
        ellipse(circle1.x, circle1.y, 70, 70);
        ellipse(circle2.x, circle2.y, 70, 70);

        //Player
        fill(player.color);
        ellipse(player.x, 365, 70, 70);

        fill(0, 0, 0);
        textSize(40);
        text(floor(time), 200 , 40);

        time = time + 0.02;
        var oof = floor(time*50)/50;
        if(oof % 50 === 0){
            sounds.yee.play();
        } else if(oof % 10 === 0){
            sounds.play.play();
        }
        if(circle1.y > 295 && circle1.x === player.x){
            scene = 0;
            sounds.die.play();
        }
        if(circle2.y > 295 && circle2.x === player.x){
            scene = 0;
            sounds.die.play();
        }
    }
    if(scene === 2){
        noStroke();
        fill(255, 125, 0);
        ellipse(80, 80, 70, 70);
        fill(255, 255, 0);
        ellipse(200, 80, 70, 70);
        fill(0, 255, 0);
        ellipse(320, 80, 70, 70);
        fill(0, 255, 255);
        ellipse(80, 200, 70, 70);
        fill(0, 0, 255);
        ellipse(200, 200, 70, 70);
        fill(125, 0, 255);
        ellipse(320, 200, 70, 70);

        noFill();
        stroke(0, 0, 0);
        ellipse(select[0], select[1], 75, 75);

        //Home scene button
        noFill();
        stroke(0, 0, 0);
        rect(140, 280, 120, 60, 35);
        fill(0, 0, 0);
        textSize(30);
        text("Home", 200, 310);
    }
};


function keyPressed(){
    if(key === "o"){
        saveCanvas("circles")
    }
    if(scene === 1){
        if(keyCode === LEFT_ARROW){
            if(player.x > 40){
                player.x = player.x - 80;
            }
            else{
                player.x = 360;
            }
            sounds.move.stop();
            sounds.move.play();
        }
        if(keyCode === RIGHT_ARROW){
            if(player.x < 360){
                 player.x = player.x + 80;
            }
           else{
               player.x = 40;
           }
           sounds.move.stop();
           sounds.move.play();
        }
    }
};

function mouseClicked(){
    if(scene === 0 && mouseX > 145 && mouseX < 255 && mouseY > 170 && mouseY < 230){
        scene = 1;
        speed = 1;
        circle1.y = -35;
        circle2.y = -235;
        time = 0;
        sounds.play.play();
    }
    if(scene === 0 && mouseX > 310 && mouseX < 390 && mouseY > 350 && mouseY < 390){
        scene = 2;
    }
    if(scene === 2){
        if(dist(mouseX, mouseY, 80, 80) < 35){
            player.color = color(255, 125, 0);
            select = [80, 80];
        }
        if(dist(mouseX, mouseY, 200, 80) < 35){
            player.color = color(255, 255, 0);
            select = [200, 80];
        }
        if(dist(mouseX, mouseY, 320, 80) < 35){
            player.color = color(0, 255, 0);
            select = [320, 80];
        }
        if(dist(mouseX, mouseY, 80, 200) < 35){
            player.color = color(0, 255, 255);
            select = [80, 200];
        }
        if(dist(mouseX, mouseY, 200, 200) < 35){
            player.color = color(0, 0, 255);
            select = [200, 200];
        }
        if(dist(mouseX, mouseY, 320, 200) < 35){
            player.color = color(125, 0, 255);
            select = [320, 200];
        }
        if(mouseX > 140 && mouseX < 260 && mouseY > 280 && mouseY < 340){
            scene = 0;
        }
    }
};
