var coleX = 300;
var coleY = 300;
var bunX = 100;
var bunY = 300;
var carX = 0;
var carY = 0;
var car2X = 300;
var car2Y = 0;
var car3X = 0;
var car4Y = -20;
var car5Y = 350;
var car6Y = 350;
var bobX = 210;
var evilX = 430;
var roboLegY = 95;
var roboLeg2Y = 95;
var roboBackpackY = 30;
var roboArmY = 65;
var roboArm2Y = 65;
var roboHandY = 65;
var roboHand2Y = 65;
var evilDirection = 3;
var dialogue = 0;
var scene = 0;
var level2 = false;
var bossTransition = 0;
var tranX = 0;

function setup() {
  createCanvas(400, 400).parent("canvas");
  textAlign(CENTER, CENTER);
}

function draw() {
  if (scene == 0) {
    //start screen
    background("green");

    fill("rgb(244,255,162)");
    rect(100, 175, 200, 75, 20);

    fill("black");
    textSize(50);
    textFont("Georgia");
    text("Start", 200, 215);
    fill("rgb(244,255,162)");
    rect(130, 260, 150, 55, 20);

    fill("black");
    textSize(30);
    text("Credits", 200, 290);

    fill("black");
    textSize(30);
    text("Cross The Road Simulator!", 200, 100);
    text("Made By Lucas Wheeler", 200, 135);
    fill("rgb(244,255,162)");
    rect(120, 325, 175, 45, 20);
    fill("black");
    textSize(20);
    text("Level Select W.I.P.", 205, 350);

    //credits
  }
  if (scene == 1) {
    background("green");
    fill("black");
    textSize(45);
    text("Cole", 200, 50);
    text("Evan", 200, 100);
    text("Susannah", 200, 150);
    text("Coding Club!", 200, 250, 20);
    fill("rgb(244,255,162)");
    rect(25, 25, 100, 50, 20);
    fill("black");
    textSize(30);
    text("Back", 75, 50);
    if (level2 == true) {
      fill(244, 255, 162);
      rect(135, 325, 150, 50, 20);
      fill("black");
      textSize(30);
      text("Level 3", 205, 350);
    }
  }
  //level 1
  if (scene == 3) {
    background("green");

    fill("black");
    text("Use WASD to control Bunny", 210, 340);
    text("and arrow keys for Cole", 210, 355);

    fill("gray");
    rect(0, 125, 400, 100);
    fill("yellow");
    rect(0, 165, 400, 10);

    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //car
    fill("#E91E63");
    rect(carX, 177, 100, 46);
    //car2
    fill("rgb(138,128,190)");
    rect(car2X, 125, 100, 40);
    //car movement
    carX += 3;
    car2X -= 2;
    //offscreen portal thingy
    if (coleX > 425) {
      coleX = -25;
    }
    if (coleX < -25) {
      coleX = 425;
    }

    if (bunX > 425) {
      bunX = -25;
    }
    if (bunX < -25) {
      bunX = 425;
    }

    if (carX > 400) {
      carX = -100;
    }

    if (car2X + 100 < 0) {
      car2X = 400;
    }
    //collison
    if (
      bunX + 25 > carX &&
      bunX - 25 < carX + 100 &&
      bunY - 25 < 177 + 46 &&
      bunY + 25 > 177
    ) {
      bunX = 100;
      bunY = 300;
    }

    if (
      coleX + 25 > carX &&
      coleX - 25 < carX + 100 &&
      coleY - 25 < 177 + 46 &&
      coleY + 25 > 177
    ) {
      coleX = 300;
      coleY = 300;
    }

    if (
      bunX + 25 > car2X &&
      bunX - 25 < car2X + 100 &&
      bunY - 25 < 125 + 40 &&
      bunY + 25 > 125
    ) {
      bunX = 100;
      bunY = 300;
    }
    if (
      coleX + 25 > car2X &&
      coleX - 25 < car2X + 100 &&
      coleY - 25 < 125 + 40 &&
      coleY + 25 > 125
    ) {
      coleX = 300;
      coleY = 300;
    }
    //you win activator
    if (scene == 3 && bunY - 25 < 50 && coleY - 25 < 50) {
      scene = 4;
    }

    //you win activator 2
    if (scene == 5 && bunY - 25 < 25 && coleY - 25 < 25) {
      scene = 6;
      level2 = true;
    }

    //win screen 2
  }
  if (scene == 4) {
    background("rgb(201,201,58)");
    fill("black");
    textSize(45);
    text("You won epicly", 200, 200);
    textSize(20);
    text("I'm not gonna update this anymore I think", 100, 300, 200);
    fill("rgb(195,197,57)");
    text("Click the corner", 200, 375);
  }
  //win screen 2
  if (scene == 6) {
    background("rgb(195,197,57)");
    fill("black");
    textSize(25);
    text("what. How you get here???!?!", 200, 100);
    fill("rgb(251,255,0)");
    rect(100, 175, 200, 50, 20);
    fill("black");
    text("Back to start", 200, 200);
  }

  //secret 2nd level
  if (scene == 5) {
    background("green");
    fill("grey");
    rect(0, 225, 400, 90);
    rect(0, 65, 400, 90);
    fill("yellow");
    rect(0, 265, 400, 10);
    rect(0, 105, 400, 10);

    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //car
    fill("#E91E63");
    rect(carX, 115, 100, 40);

    //car2
    fill("rgb(138,128,190)");
    rect(car2X, 65, 100, 40);

    //car3
    fill("orange");
    rect(car3X, 245, 100, 50);
    //car movement
    carX += 3;
    car2X -= 2;
    car3X += 5;
    //offscreen portal thingy
    if (coleX > 425) {
      coleX = -25;
    }
    if (coleX < -25) {
      coleX = 425;
    }

    if (bunX > 425) {
      bunX = -25;
    }
    if (bunX < -25) {
      bunX = 425;
    }

    if (carX > 400) {
      carX = -100;
    }

    if (car2X + 100 < 0) {
      car2X = 400;
    }
    if (car3X > 400) {
      car3X = -100;
    }

    if (
      bunX + 25 > carX &&
      bunX - 25 < carX + 100 &&
      bunY - 25 < 115 + 40 &&
      bunY + 25 > 115
    ) {
      bunX = 100;
      bunY = 350;
    }

    if (
      coleX + 25 > carX &&
      coleX - 25 < carX + 100 &&
      coleY - 25 < 115 + 40 &&
      coleY + 25 > 115
    ) {
      coleX = 300;
      coleY = 350;
    }

    if (
      bunX + 25 > car2X &&
      bunX - 25 < car2X + 100 &&
      bunY - 25 < 65 + 40 &&
      bunY + 25 > 65
    ) {
      bunX = 100;
      bunY = 350;
    }
    if (
      coleX + 25 > car2X &&
      coleX - 25 < car2X + 100 &&
      coleY - 25 < 65 + 40 &&
      coleY + 25 > 65
    ) {
      coleX = 300;
      coleY = 350;
    }

    if (
      bunX + 25 > car3X &&
      bunX - 25 < car3X + 100 &&
      bunY - 25 < 245 + 50 &&
      bunY + 25 > 245
    ) {
      bunX = 100;
      bunY = 350;
    }
    if (
      coleX + 25 > car3X &&
      coleX - 25 < car3X + 100 &&
      coleY - 25 < 245 + 50 &&
      coleY + 25 > 245
    ) {
      coleX = 300;
      coleY = 350;
      //rect(car3X, 245, 100, 50);
    }

    //you win activator 2
    if (scene == 5 && bunY - 25 < 25 && coleY - 25 < 25) {
      scene = 6;
    }
  }
  //level select
  if (scene == 2) {
    background("green");
    fill("black");
    textSize(40);
    text("Level Select", 200, 50);
    fill("rgb(244,255,162)");
    rect(10, 300, 100, 50, 20);
    fill("black");
    textSize(30);
    text("Back", 56, 327);
  }
  //level 3
  if (scene == 7) {
    background("green");
    if (coleX >= 500 && bunX > 500 && scene == 7) {
      scene = 8;
    }

    //road stuff
    fill("gray");
    rect(0, 50, 400, 290);
    fill("green");
    rect(0, 175, 400, 50);
    rect(0, 255, 400, 50);
    rect(0, 295, 400, 110);
    fill("rgb(180,138,82)");
    rect(0, 225, 400, 75);
    fill("yellow");
    rect(0, 110, 400, 10);

    //bob stuff
    fill("rgb(255,224,138)");
    ellipse(40, 260, 50, 50);
    fill("black");
    textSize(20);
    text("Bob", 40, 260);
    textSize(15);
    text("--- I wonder where that path- oh hi guys", 200, 260);

    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //car
    fill("#E91E63");
    rect(carX, 125, 100, 40);

    //car2
    fill("rgb(138,128,190)");
    rect(car2X, 55, 120, 50);

    //car move
    carX += 8;
    car2X -= 8;

    //magic portal

    if (coleX < -25) {
      coleX = 425;
    }

    if (bunX < -25) {
      bunX = 425;
    }

    if (carX > 400) {
      carX = -100;
    }

    if (car2X + 100 < 0) {
      car2X = 400;
    }

    if (
      bunX + 35 > carX &&
      bunX - 35 < carX + 100 &&
      bunY - 35 < 115 + 40 &&
      bunY + 35 > 115
    ) {
      bunX = 100;
      bunY = 350;
    }

    if (
      coleX + 35 > carX &&
      coleX - 35 < carX + 100 &&
      coleY - 35 < 115 + 40 &&
      coleY + 35 > 115
    ) {
      coleX = 300;
      coleY = 350;
    }

    if (
      bunX + 25 > car2X &&
      bunX - 25 < car2X + 100 &&
      bunY - 25 < 65 + 40 &&
      bunY + 25 > 65
    ) {
      bunX = 100;
      bunY = 350;
    }
    if (
      coleX + 25 > car2X &&
      coleX - 25 < car2X + 100 &&
      coleY - 25 < 65 + 40 &&
      coleY + 25 > 65
    ) {
      coleX = 300;
      coleY = 350;
    }
  }

  if (scene == 8) {
    background("rgb(195,197,57)");
    fill("black");
    textSize(30);
    textFont("georgia");
    text("HOW HOW HOW HOW HOW AHHHHHHHH", 200, 100, 10);
    fill("rgb(244,255,162)");
    rect(135, 335, 150, 50, 20);
    fill("black");
    textSize(25);
    text("Next Level", 205, 360);
  }

  if (scene == 9) {
    background("green");
    //roads
    fill("grey");
    rect(0, 50, 400, 50);
    rect(0, 165, 400, 50);
    rect(0, 280, 400, 50);

    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //Bob
    fill("rgb(255,224,138)");
    ellipse(50, 250, 50, 50);
    fill("black");
    textSize(20);
    text("Bob", 50, 250);
    text("--- e", 100, 250);

    //car
    fill("#E91E63");
    rect(carX, 55, 100, 40);

    //car2
    fill("rgb(138,128,190)");
    rect(car2X, 170, 100, 40);

    //car3
    fill("orange");
    rect(car3X, 285, 100, 40);

    //car move
    carX += 3;
    car2X -= 3;
    car3X += 4;

    //offscreen portal thingy
    if (coleX > 425) {
      coleX = -25;
    }
    if (coleX < -25) {
      coleX = 425;
    }

    if (bunX > 425) {
      bunX = -25;
    }
    if (bunX < -25) {
      bunX = 425;
    }

    if (carX > 400) {
      carX = -100;
    }

    if (car2X + 100 < 0) {
      car2X = 400;
    }
    if (car3X > 400) {
      car3X = -100;
    }

    //collison
    if (
      bunX + 25 > carX &&
      bunX - 25 < carX + 100 &&
      bunY - 25 < 55 + 40 &&
      bunY + 25 > 55
    ) {
      bunX = 100;
      bunY = 370;
      //rect(carX, 55, 100, 40);
    }

    if (
      coleX + 25 > carX &&
      coleX - 25 < carX + 100 &&
      coleY - 25 < 55 + 40 &&
      coleY + 25 > 55
    ) {
      coleX = 300;
      coleY = 370;
    }

    if (
      bunX + 25 > car2X &&
      bunX - 25 < car2X + 100 &&
      bunY - 25 < 170 + 40 &&
      bunY + 25 > 170
    ) {
      bunX = 100;
      bunY = 370;
    }
    if (
      coleX + 25 > car2X &&
      coleX - 25 < car2X + 100 &&
      coleY - 25 < 170 + 40 &&
      coleY + 25 > 170
    ) {
      coleX = 300;
      coleY = 370;
    }

    if (
      bunX + 25 > car3X &&
      bunX - 25 < car3X + 100 &&
      bunY - 25 < 285 + 40 &&
      bunY + 25 > 285
    ) {
      bunX = 100;
      bunY = 370;
    }
    if (
      coleX + 25 > car3X &&
      coleX - 25 < car3X + 100 &&
      coleY - 25 < 285 + 40 &&
      coleY + 25 > 285
    ) {
      coleX = 300;
      coleY = 370;
    }

    //you win activator 4
    if (scene == 9 && bunY - 13 < 13 && coleY - 13 < 13) {
      scene = 10;
    }
  }

  if (scene == 10) {
    background("rgb(201,201,58)");
    fill("black");
    textFont("gerogia");
    textSize(30);
    text("This was an easy one", 200, 150);
    textSize(23);
    text("Well maybe it's cuz I made the game, idk.", 200, 200);
    text("I'll be nice this time and give u a button", 200, 250);
    fill("rgb(235,235,170)");
    rect(135, 300, 150, 50, 20);
    fill("black");
    text("button thing", 210, 325);
  }
  //level 5
  if (scene == 11) {
    background("green");
    //roads
    fill("grey");
    rect(50, 0, 75, 400);
    rect(200, 0, 75, 400);

    //line in road
    fill("yellow");
    rect(80, 0, 10, 400);
    rect(230, 0, 10, 400);

    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //car move
    carY += 5;
    car2Y += 4;

    //car
    fill("#E91E63");
    rect(63, carY, 50, 80);

    //car2
    fill("rgb(138,128,190)");
    rect(210, car2Y, 50, 80);

    //offscreen portal thingys
    if (coleY > 425) {
      coleY = -25;
    }
    if (coleY < -25) {
      coleY = 425;
    }

    if (bunY > 425) {
      bunY = -25;
    }
    if (bunY < -25) {
      bunY = 425;
    }
    if (carY > 400) {
      carY = -100;
    }

    if (car2Y > 400) {
      car2Y = -100;
    }

    //collision

    if (
      bunX + 25 > 63 &&
      bunX - 25 < 63 + 50 &&
      bunY - 25 < carY + 80 &&
      bunY + 25 > carY
    ) {
      bunX = 370;
      bunY = 120;
    }

    if (
      coleX + 25 > 63 &&
      coleX - 25 < 63 + 50 &&
      coleY - 25 < carY + 80 &&
      coleY + 25 > carY
    ) {
      coleX = 370;
      coleY = 330;
    }

    if (
      bunX + 25 > 210 &&
      bunX - 25 < 210 + 50 &&
      bunY - 25 < car2Y + 80 &&
      bunY + 25 > car2Y
    ) {
      bunX = 370;
      bunY = 120;
    }

    if (
      coleX + 25 > 210 &&
      coleX - 25 < 210 + 50 &&
      coleY - 25 < car2Y + 80 &&
      coleY + 25 > car2Y
    ) {
      coleX = 370;
      coleY = 330;
    }

    if (scene == 11 && bunX - 15 < 15 && coleX - 15 < 15) {
      scene = 12;
    }
  }

  if (scene == 12) {
    background("rgb(201,201,58)");
    fill("black");
    textFont("georgia");
    textSize(20);
    text("ERROR 404 [please reboot please reboot]", 200, 200);
    fill("rgb(235,235,170)");
    rect(140, 275, 150, 75, 20);
    fill("black");
    textSize(40);
    text("Reboot", 215, 310);
  }

  if (scene == 13) {
    background("green");

    fill("rgb(244,255,162)");
    rect(100, 175, 200, 75, 20);

    fill("black");
    textSize(40);
    textFont("Georgia");
    text("No Escape", 200, 210);

    fill("black");
    textSize(30);
    text("L̴̩̞̻̇͘Ẻ̵̡̝͈̘̠̊͌̍A̷͔̝͕̻̺͓̒̓̽̽̌̐ͅV̷̨̪̻͙̺̦̳̒̉͗̀E̷̦͌͌̈́͌̐̀͝ ̸̛͍̻͊̎́́͜L̶̛̙͉̝̣͎̉̒̌͆́͊E̷͖̯̞͇̘̋́̈́͗̂Ă̵̱̹͙̈́́̇͛̽V̸̧̳̬͕̳̹̑͜E̴͕̗͛̒͘ ̵̟̭̟̿̅̈L̶̳̝͚̤̻̪̻͐͒́̌͂͠E̶͚̙͐̄̈́͑̿̏̚Á̸̧̛̘͙̭̄V̶̮̗̰̲̰̹̇̄̂Ê̷͕͙̏̍͌͠", 50, 300, 300);
    text("Į̴̳̣̠̅T̴̨͙͙̙̳̹̭̈́͂̎͌̀͑͘'̷̧̭̣̠̫͒Ŝ̷͎͛ ̶̧̧̨̥̭̗̈́̈H̵̰̪̰͛͋̍̽̂͠I̴̡͚̙̮͖͒S̸̨͙̰̮͉̟̈́͑ ̴̧̖͝F̴͙̼̘̭͓͎̈́̾̈̍̔A̵̝͔̘͖͍̪̯̋̃Ű̷̡̝̱͕͗͝L̷̖̺̮͕̈̔T̵̪̟̼͚̗̙̅͑͒̑̐̈́̕", 200, 100);
  }
  //level 6
  if (scene == 14) {
    background("rgb(131,8,34)");

    //roads
    fill("gray");
    rect(30, 0, 60, 400);
    rect(300, 0, 60, 400);
    rect(165, 0, 60, 400);
    fill("yellow");
    rect(55, 0, 10, 400);
    rect(325, 0, 10, 400);
    rect(190, 0, 10, 400);
    fill("grey");
    rect(0, 60, 400, 50);
    rect(0, 180, 400, 50);
    rect(0, 300, 400, 50);
    fill("yellow");
    rect(0, 80, 400, 7);
    rect(0, 200, 400, 7);
    rect(0, 325, 400, 7);

    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //car
    fill("#E91E63");
    rect(carX, 65, 100, 40);

    //car2
    fill("rgb(138,128,190)");
    rect(car2X, 185, 100, 40);

    //car3
    fill("orange");
    rect(car3X, 305, 100, 40);

    //car4
    fill("rgb(21,0,255)");
    rect(175, car4Y, 40, 80);

    //car5
    fill("green");
    rect(310, car5Y, 40, 80);

    //car6
    fill("rgb(128,255,0)");
    rect(40, car6Y, 40, 80);

    //car movement
    carX += 5;
    car2X -= 4;
    car3X += 3.8;
    car4Y += 5;
    car5Y -= 6;
    car6Y -= 4.4;

    //portals
    if (coleX > 425) {
      coleX = -25;
    }
    if (coleX < -25) {
      coleY = 425;
    }
    if (bunX > 425) {
      bunX = -25;
    }
    if (bunX < -25) {
      bunX = 425;
    }
    if (carX > 400) {
      carX = -100;
    }
    if (car2X + 100 < 0) {
      car2X = 400;
    }
    if (car3X > 400) {
      car3X = -100;
    }
    if (car4Y > 400) {
      car4Y = -100;
    }
    if (car5Y + 100 < 0) {
      car5Y = 400;
    }
    if (car6Y + 100 < 0) {
      car6Y = 400;
    }
    collide(carX, 65, 100, 40, 130, 375, 265, 375);
    collide(car2X, 185, 100, 40, 130, 375, 265, 375);
    collide(car3X, 305, 100, 40, 130, 375, 265, 375);
    collide(175, car4Y, 40, 80, 130, 375, 265, 375);
    collide(310, car5Y, 40, 80, 130, 375, 265, 375);
    collide(40, car6Y, 40, 80, 130, 375, 265, 375);

    if (scene == 14 && bunY - 25 < 25 && coleY - 25 < 25) {
      scene = 15;
    }
  }

  if (scene == 15) {
    background("black");
    fill("white");
    textFont("georgia");
    textSize(20);
    text("You... You should have died. Why are you here...", 0, 200, 400);

    rect(140, 275, 125, 50, 20);
    fill("black");
    textSize(30);
    text("Escape", 200, 300);
  }
  if (scene == 16) {
    background("green");
    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textFont("georgia");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);

    //Epic Robot
    fill("red");
    rect(175, 25, 70, 70);
    fill("lime");
    rect(215, 95, 30, 75);
    rect(175, 95, 30, 75);
    fill("orange");
    rect(145, 30, 30, 65);
    fill("rgb(138,128,190)");
    rect(80, 65, 65, 20);
    rect(245, 65, 65, 20);
    fill("rgb(0,15,255)");
    rect(300, 65, 20, 40);
    rect(75, 65, 20, 40);
    //evil bnunny
    fill("red");
    ellipse(evilX, 60, 50, 50);
    fill("black");
    textSize(14);
    textFont("georgia");
    text("Evil\nBnunny", evilX, 60);

    //bob
    fill("rgb(255,219,153)");
    ellipse(bobX, 60, 50, 50);
    fill("black");
    textSize(20);
    text("Bob", bobX, 60);

    fill(128, 128);
    rect(185, 35, 50, 50);

    coleX = 300;
    coleY = 350;
    bunX = 100;
    bunY = 350;

    setTimeout(function () {
      if (dialogue == 0) {
        alert("Bob: Hey guys, look at this cool new robot i got!");
        dialogue = 1;
      }
    }, 500);
    if (dialogue == 1) {
      alert("Bunny: Cool Beans");
      dialogue = 2;
    }
    if (dialogue == 2) {
      alert("Bob: I sure hope nothing bad happens!!!");
      dialogue = 3;
    }
    if (dialogue == 3) {
      alert("God: Something bad happens...");
      dialogue = 4;
    }
    if (dialogue == 4) {
      alert("???: AYAYAAAAAAA");
      dialogue = 5;
    }
    if (dialogue == 5) {
      alert("Bob: What the-");
      dialogue = 6;
    }
    if (dialogue == 6) {
      evilX -= 10;
    }
    if (evilX == 210 && dialogue == 6) {
      dialogue = 7;
    }
    if (dialogue == 7) {
      bobX -= 6;
    }
    if (bobX <= -50 && dialogue == 7) {
      dialogue = 8;
    }
    if (dialogue == 8) {
      alert("Cole: WHAT JUST HAPPENED!!!");
      dialogue = 9;
    }
    if (dialogue == 9) {
      alert(
        "???: Sorry. I can't be having any witnesses around for what's about to happen."
      );
      dialogue = 10;
    }
    if (dialogue == 10) {
      alert("Cole and Bunny: Oh it's on!");
      dialogue = 11;
    }

    if (dialogue == 11) {
      scene = 16;
      dialogue = 12;
    }
    if (dialogue == 12) {
      alert("Back to develop :)");
      dialogue = 13;
    }
    if (dialogue == 13) {
      bossTransition = 1;
      tranX = -400;
      dialogue = 14;
    }
  }
  if (scene == 17) {
    background("green");
    //Cole
    fill("purple");
    ellipse(coleX, coleY, 50, 50);
    fill("black");
    textFont("georgia");
    textSize(20);
    text("Cole", coleX, coleY);

    //Bunny
    fill("white");
    ellipse(bunX, bunY, 50, 50);
    fill("black");
    textSize(18);
    text("Bunny", bunX, bunY);
    
     //Epic Robot
    fill("red");
    rect(evilX - 35, 25, 70, 70);
    fill("lime");
    rect(evilX + 5, roboLegY, 30, 75);
    rect(evilX - 35, roboLeg2Y, 30, 75);
    fill("orange");
    rect(evilX -65, roboBackpackY, 30, 65);
    fill("rgb(138,128,190)");
    rect(evilX - 130, roboArmY, 65, 20);
    rect(evilX + 35, roboArm2Y, 65, 20);
    fill("rgb(0,15,255)");
    rect(evilX + 90, roboHandY, 20, 40);
    rect(evilX - 135, roboHand2Y, 20, 40);
    //evil bnunny
    fill("red");
    ellipse(evilX, 60, 50, 50);
    fill("black");
    textSize(14);
    textFont("georgia");
    text("Evil\nBnunny", evilX, 60);
    //roof
    fill(128, 128);
    rect(evilX - 25, 35, 50, 50);
    //barriers
    if(coleX + 25 > 400){
      coleX = 375
    }
    if(coleX - 25 < 0){
      coleX = 25
    }
    if(coleY + 25 > 400){
      coleY = 375
    }
    if(coleY - 25 < 0){
      coleY = 25
    }
    if(bunX + 25 > 400){
      bunX = 375
    }
    if(bunX - 25 < 0){
      bunX = 25
    }
    if(bunY + 25 > 400){
      bunY = 375
    }
    if(bunY - 25 < 0){
      bunY = 25
    }
    
    evilX += evilDirection
    if(evilX + 25 + 20 + 65 + 20 - 12 >= 400 || evilX - 20 - 30 - 65 - 20 <= 0){
       evilDirection *= -1;
    }
    
     setTimeout(function () {
       roboLegY += 2;{
     }
    }, 3000);
    
    setTimeout(function () {
       roboLeg2Y += 2;{
     }
    }, 7000);
    
     setTimeout(function () {
       roboHandY += 3;{
     }
    }, 10000);
    
    setTimeout(function () {
       roboArm2Y += 3;{
     }
    }, 10000);
    
    setTimeout(function () {
       roboHand2Y += 3;{
     }
    }, 12000);
    
  setTimeout(function () {
       roboArmY += 3;{
     }
    }, 12000);
    
     setTimeout(function () {
       roboBackpackY += 5;{
     }
    }, 15000);
    
     collide(evilX + 5, roboLegY, 30, 75, 100, 300, 300, 300);
     collide(evilX - 35, roboLeg2Y, 30, 75, 100, 300, 300, 300);
    collide(evilX - 130, roboArmY, 65, 20, 100, 300, 300, 300);
     collide(evilX + 35, roboArm2Y, 65, 20, 100, 300, 300, 300);
    collide(evilX + 90, roboHandY, 20, 40, 100, 300, 300, 300);
    collide(evilX - 135, roboHand2Y, 20, 40, 100, 300, 300, 300);
    collide(evilX - 65, roboBackpackY, 30, 65, 100, 300, 300, 300);
    
  }
  if (bossTransition == 1) {
    fill("gray");
    tranX += 5;

    if (tranX == 0) {
      scene = 17
    }

    rect(tranX, 0, 400, 400);
    fill(0);  //only one number tells fill to use that number for all three values
    textSize(40);
    text("very ebic transishin", tranX + 200, 200);
  }
}

//movement for cole and bunny
function keyPressed() {
  if (keyCode == UP_ARROW) {
    coleY -= 15;
  }
  if (keyCode == DOWN_ARROW) {
    coleY += 15;
  }
  if (keyCode == LEFT_ARROW) {
    coleX -= 15;
  }
  if (keyCode == RIGHT_ARROW) {
    coleX += 15;
  }
  if (keyCode == 87) {
    bunY -= 15;
  }
  if (keyCode == 83) {
    bunY += 15;
  }
  if (keyCode == 65) {
    bunX -= 15;
  }
  if (keyCode == 68) {
    bunX += 15;
  }
  //start button
}
function mouseClicked() {
  if (
    mouseX > 100 &&
    mouseX < 300 &&
    mouseY > 175 &&
    mouseY < 250 &&
    scene == 0
  ) {
    scene = 3;
  }
  //secret button
  if (mouseX > 0 && mouseX < 10 && mouseY > 0 && mouseY < 10 && scene == 4) {
    scene = 5;
    coleX = 300;
    coleY = 350;
    bunX = 100;
    bunY = 350;
  }
  //credits button
  if (
    mouseX > 130 &&
    mouseX < 280 &&
    mouseY > 260 &&
    mouseY < 315 &&
    scene == 0
  ) {
    scene = 1;
  }
  //credits back button
  if (mouseX > 25 && mouseX < 125 && mouseY > 25 && mouseY < 75 && scene == 1) {
    scene = 0;
  } //level select
  if (
    mouseX > 120 &&
    mouseX < 295 &&
    mouseY > 325 &&
    mouseY < 370 &&
    scene == 0
  ) {
    scene = 2;
  }
  //back button level select
  if (
    mouseX > 10 &&
    mouseX < 110 &&
    mouseY > 300 &&
    mouseY < 350 &&
    scene == 2
  ) {
    scene = 0;
  }
  //level 2 back to start button
  if (
    mouseX > 100 &&
    mouseX < 300 &&
    mouseY > 175 &&
    mouseY < 225 &&
    scene == 6
  ) {
    scene = 0;
    level2 = true;
  }
  //button for level 3
  if (
    mouseX > 135 &&
    mouseX < 285 &&
    mouseY > 325 &&
    mouseY < 375 &&
    scene == 1 &&
    level2 == true
  ) {
    scene = 7;
    coleX = 355;
    coleY = 350;
    bunY = 350;
    bunX = 60;
  }
  //level 4 button
  if (
    mouseX > 135 &&
    mouseX < 285 &&
    mouseY > 335 &&
    mouseY < 385 &&
    scene == 8
  ) {
    scene = 9;
    coleX = 300;
    coleY = 370;
    bunX = 100;
    bunY = 370;
  }
  //level 5 button
  if (
    mouseX > 135 &&
    mouseX < 285 &&
    mouseY > 300 &&
    mouseY < 350 &&
    scene == 10
  ) {
    scene = 11;
    coleX = 370;
    coleY = 330;
    bunX = 370;
    bunY = 120;
  }

  if (
    mouseX > 140 &&
    mouseX < 290 &&
    mouseY > 275 &&
    mouseY < 350 &&
    scene == 12
  ) {
    scene = 13;
  }

  if (
    mouseX > 100 &&
    mouseX < 300 &&
    mouseY > 175 &&
    mouseY < 250 &&
    scene == 13
  ) {
    scene = 14;
    coleX = 265;
    coleY = 375;
    bunX = 130;
    bunY = 375;
  }

  if (
    mouseX > 140 &&
    mouseX < 265 &&
    mouseY > 275 &&
    mouseY < 325 &&
    scene == 15
  ) {
    scene = 16;
    coleX = 265;
    coleY = 375;
    bunX = 130;
    bunY = 375;
  }
}

function collide(x, y, w, h, resetBX, resetBY, resetCX, resetCY) {
  if (
    bunX + 25 > x &&
    bunX - 25 < x + w &&
    bunY - 25 < y + h &&
    bunY + 25 > y
  ) {
    bunX = resetBX;
    bunY = resetBY;
  }
  if (
    coleX + 25 > x &&
    coleX - 25 < x + w &&
    coleY - 25 < y + h &&
    coleY + 25 > y
  ) {
    coleX = resetCX;
    coleY = resetCY;
  }
  push()
  noFill()
  stroke(255, 0, 0)
  strokeWeight(3)
  rect(x, y, w, h)
  pop()
}
