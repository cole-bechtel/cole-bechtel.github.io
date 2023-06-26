//VARIABLES
var screen = 0;
  //play button stuff
  var x = 50;
  var y = 175;
  var w = 100;
  var h = 50;
  var size = 20;
  var clickX2 = 150;
  var clickY2 = 225;
  var r = 0;
  //shading for update log & achievments
var shade = 0;
//var stats = false;
var updateLog = false;
  var updateLogX = 506;
  var updateLogMove = 28;

var achievments = false;
  var achievmentsY = -195;
  var achievmentsMove = 23;

var animationStart = false;
  var startCircle = 0;
  var startExpanded = false;

var shop = false;
  var shopX = -250;
  var shopMove = 24;

var popupScale = 0;
  var popupScalePhase = 1;
  var popupOpen = {
    open:false, 
    popup:null
  };

var carrots;
var timer = 0;
var multiplier;
var gardens;

//carrot farm name
var name = prompt("Enter the name of your carrot farm (optional):");

//you'll never find out the passcode lucas ;)
var asdf = [{asdf: "b", ghjk: "x"}, ["i", "u"], ["z", "n", "a"], "r", "t", ["h", "e", "p", "s"]];
var asdfRegex = /(\d+)(-)(\d+)/;
var asdfStr = "asdfjasdf23-1928";

function setup() {
  createCanvas(400, 400).parent("canvas")
  frameRate(50);
  angleMode(DEGREES);
  //the testing passcode (lucas proof)
  if (name === asdf[0].asdf + asdf[1][1] + asdf[2][1] + asdf[2][1] + asdf[1][0] + asdf[5][1] + asdf[5][3] + asdf[2][2] + asdf[3] + asdf[5][1] + asdf[4] + asdf[5][0] + asdf[5][1] + asdf[0].asdf + asdf[5][1] + asdf[5][3] + asdf[4] + str((abs(int(asdfStr.match(asdfRegex)[3])) + 2516))) {
    alert("bunny");
  }
  carrots = getItem("carrots");
  if (carrots === null) {
    carrots = 0;
  }
  multiplier = getItem("multiplier");
  if (multiplier === null) {
    multiplier = 1;
  }
  gardens = getItem("gardens");
  if (gardens === null) {
    gardens = 0;
  }
}

var cps = gardens / 5;

function preload () {
  carrot = loadImage("carrot.png");
  menu = loadImage("menuicon.png");
  info = loadImage("infoicon.png");
}

function draw() {
  background(10, 160, 80);
  
  //MENU SCREEN
  if (screen === 0) {
    image(carrot, 50, 250, 100, 100);
    
    fill(255);
    textFont("Trebuchet MS");
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Carrot Clicker", 200, 100);
    
    textFont("Monospace");
    textSize(20);
    text("v2.0", 50, 145);
    
    //play button
    fill(240, 175, 20);
    stroke(40, 225, 30);
    strokeWeight(3);
    translate(200, 200);
    rotate(r);
    rect(x-200, y-200, w, h, 5);
    
    fill(255);
    textFont("Trebuchet MS");
    textSize(size);
    textAlign(CENTER, CENTER);
    text("Play!", -100, 0);

    rotate(-r);
    translate(-200, -200);
    
    //hover effect
    if (button(x, y, clickX2, clickY2) && shade < 192) {
      if (w < 120) {
        clickX2++;
        clickY2++;
        w += 2;
        h += 2;
        x--;
        y--;
        size++;
        r++;
      }
    } else if (w > 100) {
      clickX2--;
      clickY2--;
      w -= 2;
      h -= 2;
      x++;
      y++;
      size--;
      r--;
    }
          
    //background shading when update log or achievments is open
    background(0, 0, 0, shade);
    if (updateLog == true || achievments == true) {
      if (shade < 192) {
        shade += 8;
      }
    } else if (shade > 0) {
      shade -= 8;
    }
    
    //save button
    fill(240, 175, 20);
    stroke(40, 224, 30);
    strokeWeight(3);
    rect(15, 20, 110, 40, 5);
    
    fill(255);
    textSize(20);
    text("Save", 70, 40);
    
    //achievments button
    fill(240, 175, 20);
    stroke(40, 225, 30);
    strokeWeight(3);
    rect(135, 20, 130, 40, 5);
    
    fill(255);
    textSize(20);
    text("Achievments", 200, 40);

    //achievments moving
    if (achievments == true) {
      if (achievmentsY < 81) {
        achievmentsY += achievmentsMove;
        if (achievmentsMove > 0) {
          achievmentsMove--;
        }
      }
    } else if (achievmentsY > -195) {
      achievmentsY -= achievmentsMove;
      if (achievmentsMove > 0) {
        achievmentsMove--;
      }
    }
    
    //update log button
    fill(240, 175, 20);
    stroke(40, 225, 30);
    strokeWeight(3);
    rect(275, 20, 110, 40, 5);
    
    fill(255);
    textSize(20);
    text("Update Log", 330, 40);
    
    //update log moving
    if (updateLog == true) {
      if (updateLogX > 100) {
        updateLogX -= updateLogMove;
        if (updateLogMove > 0) {
          updateLogMove--;
        }
      }
    } else if (updateLogX < 506) {
      updateLogX += updateLogMove;
      if (updateLogMove > 0) {
        updateLogMove--;
      }
    }
    
    //achievments
    fill(140);
    stroke(40, 225, 30);
    strokeWeight(3);
    rect(45, achievmentsY, 100, 50, 5);
    
    rect(150, achievmentsY, 100, 50, 5);
    
    rect(255, achievmentsY, 100, 50, 5);
    
    rect(45, achievmentsY+75, 100, 50, 5);
    
    rect(150, achievmentsY+75, 100, 50, 5);
    
    rect(255, achievmentsY+75, 100, 50, 5);
    
    rect(45, achievmentsY+150, 100, 50, 5);
    
    rect(150, achievmentsY+150, 100, 50, 5);
    
    rect(255, achievmentsY+150, 100, 50, 5);
    
    fill(255);
    textSize(16);
    text("Testing,\nTesting", 95, achievmentsY+25);
    
    //update log
    textSize(20);
    text("Update Log", updateLogX, 150);
    
    textFont("Monospace");
    noStroke();
    textSize(16);
    
    text("1/23/22 - v1.3", updateLogX, 175);
    text("-Added Update Log", updateLogX, 190);
    text("-Fixed cps", updateLogX, 205);
    text("-New Menu", updateLogX, 220);
    
    text("1/21/22 - v1.2", updateLogX, 235);
    text("-Added menu & cps", updateLogX, 250);
    text("-Fixed buttons", updateLogX, 265);
    
    text("1/17/22 - v1.1", updateLogX, 280);
    text("-Added info buttons", updateLogX, 295);
    text("-Added Gardens", updateLogX, 310);
    
    text("1/15/22 - v1.0", updateLogX, 325);
    text("-Initial Release", updateLogX, 340);
    
    noStroke();
    text("Created by Evan Guo", 100, 390);
  }    
  //GAME SCREEN
  if (screen === 1) {
    background(10, 160, 80);
    
    //big carrot
    image(carrot, 15, 150, 200, 200);
    
    //carrots per second
    fill(255);
    noStroke();
    textFont("Monospace");
    textAlign(CENTER, CENTER);
    textSize(24);
    text(gardens/5 + "/sec", 150, 100);
    
    //background shading when shop is open
    background(0, 0, 0, shade);
    if (shop == true) {
      if (shade < 192) {
        shade += 8;
      }
    } else if (shade > 0) {
      shade -= 8;
    }
    
    //shop moving
    if (shop == true) {
      if (shopX < 50) {
        shopX += shopMove;
        if (shopMove > 0) {
          shopMove--;
        }
      }
    } else if (shopX > -250) {
      shopX -= shopMove;
      if (shopMove > 0) {
        shopMove--;
      }
    }
    
    //return to menu
    image(menu, 10, 5, 30, 30);
    
    //multiplier info
    image(info, shopX + 105, 105, 40, 40);
    
    //garden info
    image(info, shopX + 105, 205, 40, 40);
    
    textFont("Trebuchet MS");
    textAlign(CENTER, CENTER);
    textSize(48);
    text(abbreviate(carrots, 3, "carrots", "carrot"), 200, 55);
    
    //open shop button
    fill(240, 175, 20);
    stroke(40, 225, 30);
    strokeWeight(3);
    rect(250, 100, 100, 40, 5);
    
    fill(255);
    textSize(20);
    textFont("Trebuchet MS");
    text("Shop", 300, 120);
    
    //purchase carrot multiplier button
    fill(240, 175, 20);
    stroke(40, 225, 30);
    strokeWeight(3);
    rect(shopX, 100, 100, 50, 5);
    
    fill(255);
    textSize(20);
    textFont("Trebuchet MS");
    text("x" + abbreviate(multiplier * 2) + " Carrots", shopX + 50, 125);
    
    if(carrots < ceil(multiplierCost())) {
      fill(255, 0, 0);
      stroke(255, 0, 0);
      strokeWeight(2);
      textFont("Monospace");
      textSize(18);
      text(abbreviate(carrots) + "/" + abbreviate(ceil(multiplierCost()), 1, "carrots"), shopX + 50, 175);
    } 
    
    if (carrots >= ceil(multiplierCost())) {
      fill(40, 225, 30);
      stroke(40, 225, 30);
      strokeWeight(2);
      textFont("Monospace");
      textSize(18);
      text(abbreviate(ceil(multiplierCost()), 1, "carrots"), shopX + 50, 175);
    }
    
    //purchase garden button
    fill(240, 175, 20);
    stroke(40, 225, 30);
    strokeWeight(3);
    rect(shopX, 200, 100, 50, 5);
    
    fill(255);
    textSize(20);
    textFont("Trebuchet MS");
    text("Garden", shopX + 50, 225);
    
    if(carrots < ceil(gardenCost())) {
      fill(255, 0, 0);
      stroke(255, 0, 0);
      strokeWeight(2);
      textFont("Monospace");
      textSize(18);
      text(abbreviate(carrots) + "/" + abbreviate(ceil(gardenCost()), 1, "carrots"), shopX + 50, 275);
    }
    
    if (carrots >= ceil(gardenCost())) {
      fill(40, 225, 30);
      stroke(40, 225, 30);
      strokeWeight(2);
      textFont("Monospace");
      textSize(18);
      text(abbreviate(ceil(gardenCost()), 1, "carrots"), shopX + 50, 275);
    }
    
    noStroke();
    if (button(40, 15, 380, 25)) {
      fill(60, 255, 240);
    } else {
      fill(255);
    }
    textAlign(RIGHT, CENTER);
    if (name == "null" || name == "") {
      text("Your Carrot Farm", 380, 20);
    } else {
      text(name + "'s Carrot Farm", 380, 20);
    }
    
    //stuff you have
    //can't forget that good grammar
    textAlign(CENTER, CENTER);
    fill(255);
    text("x" + multiplier + " Carrot Multiplier", 200, 360);
    if (gardens == 1) {
      text(gardens + " Garden", 200, 375);
    } else {
      text(gardens + " Gardens", 200, 375);
    }
    
    if (popupOpen.open == true) {
      if (popupOpen.popup == "multInfo") {
        popupBox("Multiplier", "The Carrot Multiplier multiplies the amount of carrots you have. You have a x" + multiplier + " multiplier.");
      }
      if (popupOpen.popup == "gardenInfo") {
        popupBox("Garden", "Every 5 seconds, each garden will produce 1 carrot. You have " + gardens + " gardens, producing " + gardens/5 + " carrots per second.", "secret adventure... coming soon");
      }
    }
  }

  //UNDER CONSTRUCTION SCREEN
  if (screen === 2) {

    background(10, 160, 80);
    if (name == "lucasisbadboi") {
      screen = 0;
    }
    
    image(carrot, 150, 250, 100, 100);
    
    fill(255);
    textFont("Trebuchet MS");
    stroke(40, 225, 30);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Carrots are", 200, 75);
    text("still growing...", 200, 125);
    
    textSize(20);
    text("Carrot Clicker is under construction...", 200, 200);
    text("Check back later!", 200, 225);
  }
  
  //gardens
  if (gardens > 0) {
    timer += 0.02;
    if (timer >= 5) {
      timer = 0;
      carrots += gardens;
    }
  }
  
  //animation when menu or play button is clicked
  startAnimation();
  
  fill(240, 175, 20);
  noStroke();
  circle(100, 200, startCircle);
  
  //popup box stuff
  if (popupScale <= 0) {
    popupOpen.open = false;
  }
  
  //LOL no use tryna cheat
  if (name === asdf[0].asdf + asdf[1][1] + asdf[2][1] + asdf[2][1] + asdf[1][0] + asdf[5][1] + asdf[5][3] + asdf[2][2] + asdf[3] + asdf[5][1] + asdf[4] + asdf[5][0] + asdf[5][1] + asdf[0].asdf + asdf[5][1] + asdf[5][3] + asdf[4] + str((abs(int(asdfStr.match(asdfRegex)[3])) + 2516))) {
    carrots += 1000000000000;
  }
}

//FUNCTIONS
function mouseReleased () {
  if (screen === 0) {
    //stats
    if (button(15, 20, 125, 60)) {
      //stats = true;
      storeItem("carrots", carrots);
      storeItem("multiplier", multiplier);
      storeItem("gardens", gardens);
      //achievments = false;
      //updateLog = false;
    }
    
    //achievments
    if (button(135, 20, 265, 60) && achievments == false) {
      achievmentsMove = 23;
      updateLogMove = 28;
      achievments = true;
      updateLog = false;
      //stats = false;
    }
    
    if (button(135, 20, 265, 60) && achievmentsY > -195) {
      achievmentsMove = 23;
      achievments = false;
    }
    
    //update log
    if (button(275, 20, 385, 60) && updateLog == false) {
      updateLogMove = 28;
      achievmentsMove = 23;
      updateLog = true;
      achievments = false;
      //stats = false;
    }
    
    if (button(275, 20, 385, 60) && updateLogX < 506) {
      updateLogMove = 28;
      updateLog = false;
    }
    
    //play button
    if (button(x, y, clickX2, clickY2) && shade < 192) {
      animationStart = true;
    }
  }
  
  if (screen === 1) {
    if (shop == false) {
      //big carrot
      if (button(15, 150, 215, 350)) {
        carrots += multiplier;
      }
    }   
    //shop
    if (button(250, 100, 350, 140) && shop == false) {
      shopMove = 24;
      shop = true;
    }
    
    if (button(250, 100, 350, 140) && shopX > -250) {
      shopMove = 24;
      shop = false;
    }
    
    if (shop == true) {
      //multiplier button
      if (button(50, 100, 150, 150) && carrots >= ceil(multiplierCost())) {
        carrots -= ceil(multiplierCost());
        multiplier = multiplier*2;
      }
      
      //multiplier info
      if (button(155, 105, 195, 145) && popupOpen.open == false) {
        popupOpen.open = true;
        popupOpen.popup = "multInfo";
        popupScalePhase = 1;
        popupScale = 0;
      }
      
      //garden button
      if (button(50, 200, 150, 250) && carrots >= ceil(gardenCost())) {
        carrots -= ceil(gardenCost());
        gardens++;
        cps += 2 / 10;
      }
      
      //garden info
      if (button(155, 205, 195, 245) && popupOpen.open == false){
        popupOpen.open = true;
        popupOpen.popup = "gardenInfo";
        popupScalePhase = 1;
        popupScale = 0;
      }
    }
    
    //change carrot farm name
    if (button(40, 15, 380, 25)) {
      name = prompt("Enter the name of your carrot farm (optional):");
    }
          
    //menu button
    if (button(10, 5, 40, 35)) {
      animationStart = true;
    }
  }
  if (mouseX > 175 && mouseY > 235 && mouseX < 225 && mouseY < 265) {
    popupScalePhase = 3;
  }
}

//shortcut for buttons
function button (x1, y1, x2, y2) {
  return mouseX > x1 && mouseY > y1 && mouseX < x2 && mouseY < y2;
}

//keyboard shorcuts
function keyReleased () {
  //click S (keyCode 83) to save game
  if (keyCode === 83) {
    storeItem("carrots", carrots);
    storeItem("multiplier", multiplier);
    storeItem("gardens", gardens);
  }
}

//returns cost of carrot multiplier
function multiplierCost() {
  return (pow(2.5, logBase(2, multiplier)) * 100);
}

//returns cost of gardens
function gardenCost() {
  return (pow(1.25, gardens) * 25);
}

//getting a logarithm with a custom base, used for exponentially increasing prices
function logBase(base, power) {
  let exponent = (log(power)) / (log(base));
  if (isNaN(exponent)) {
    exponent = 0;
  }
  return exponent;
}

//abbreviating stuff
function abbreviate(number, digits, label, singleLabel) {
  let abbreviated;
  
  //if parameters are empty
  if (digits == null) {
    digits = 1;
  }
  let digits10 = pow(10, digits);
  let places = str(number).length;
  
  label = label == null ? "" : " " + label;
  singleLabel = singleLabel == null ? label : " " + singleLabel;
  
  //good grammar
  if (number == 1) {
    abbreviated = "1" + singleLabel;
  } /*
  else {
    let abbrevLetter = abbrevs[floor((places - 1) / 3)]
    if (number.match(/e/)) console.log("big")
    if (number == carrots) console.log(abbrevLetter)
    abbreviated = number
  }*/
  
  //abbreviating
  else if (number < 1000) {
    abbreviated = number + label;
  } 
  //thousands
  else if (number < 1000000) {
    abbreviated = (floor(number / (1000 / digits10))) / digits10 + "K" + label;
  } 
  //millions
  else if (number < 1000000000) {
    abbreviated = (floor(number / (1000000 / digits10))) / digits10 + "M" + label;
  } 
  //billions
  else if (number < 1000000000000) {
    abbreviated = (floor(number / (1000000000 / digits10))) / digits10 + "B" + label;
  } 
  //trillions
  else if (number < 1000000000000000) {
    abbreviated = (floor(number / (1000000000000 / digits10))) / digits10 + "T" + label;
  } 
  //quadrillions
  else {
    abbreviated = (floor(number / (1000000000000000 / digits10))) / digits10 + "Q" + label;
  }
  
  return abbreviated;
}

function startAnimation() {
  if (animationStart == true) {
    if (startCircle < 1600 && startExpanded == false) {
      startCircle += 40;
    } else {
      if (startExpanded == false) {
        startExpanded = true;
      }
      if (screen === 0 && startExpanded == true) {
        screen = 1;
        startExpanded = "switchedScreen";
      } else if (startExpanded == true) {
        screen = 0;
        startExpanded = "switchedScreen";
      }
      if (startCircle > 0) {
        startCircle -= 40;
      } else {
        startExpanded = false;
        animationStart = false;
      }
    }
  }
}

function popupBox (title, content, secret="") {
  /*
  popupScalePhase = 1 --> expanding
  popupScalePhase = 2 --> shrinking to create cool effect
  popupScalePhase = 3 --> shrinking after clicking "OK"
  */
  
  translate(200, 200);
  scale(popupScale/10);
  
  fill(160, 100, 20);
  stroke(240, 175, 20);
  strokeWeight(3);
  rect(-110, -110, 220, 220, 5);

  textSize(24);
  textFont("Trebuchet MS");
  textAlign(CENTER, CENTER);
  fill(255);
  text(title, 0, -85);
  
  textSize(15);
  text(content, -100, -60, 200);
  
  textSize(6);
  noStroke();
  textAlign(LEFT, CENTER);
  text(secret, -95, 100);
  
  stroke(25, 170, 160);
  fill(40, 255, 0);
  rect(-25, 35, 50, 30, 5);
  
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  strokeWeight(5);
  text("OK", 0, 50);
  
  if (popupScalePhase === 1) {
    if (popupScale < 12) {
    popupScale += 2;
  } else {
    popupScalePhase = 2;
  }
  }
  if (popupScalePhase === 2) {
    if (popupScale > 10) {
      popupScale -= 5/10;
    }
  }
  if (popupScalePhase === 3) {
    if (popupScale > 0) {
      popupScale--;
    }
  }
  //resetting translate for later objects
  translate(-200, -200);
}

//JSON stuff i guess
const abbrevs = ["", "K", "M", "B", "T", "QD", "QI", "SX", "SP"];



