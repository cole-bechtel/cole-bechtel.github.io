/*


Keys:
c: circle mode
r: rectangle mode
l: line mode
f: free draw mode
s: continuous shape, double click to exit
e: eraser
1-9: sets thickness
+, -: increases/decreases thickness by 2
up and down arrows: rotates through pen colors
shift + up and down arrows: rotates through background colors
left arrow: undo
space: clears canvas
ctrl + s: download drawing (png)
*/

let allShapes = [];
class Shape {
  constructor(type, startx, starty, num1, num2, weight, col, cont = false) {
    allShapes.push(this);
    this.type = type;
    this.startx = startx;
    this.starty = starty;
    this.num1 = num1;
    this.num2 = num2;
    this.weight = weight;
    this.col = col;
    this.cont = cont;
  }
  draw() {
    push();
    strokeWeight(this.weight);
    stroke(this.col);
    if (this.type === "l") {
      line(this.startx, this.starty, this.num1, this.num2);
    } else if (this.type === "c") {
      ellipse(this.startx, this.starty, this.num1, this.num2);
    } else if (this.type === "r") {
      rect(this.startx, this.starty, this.num1, this.num2);
    }
    pop();
  }
}

var drawing = false;
var lastLine = [];
var lineStroke = 1;
var shape = "line";
var colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "black",
  "gray",
  "tan",
  "white",
];
var colIndex = 0;
var bgcolIndex = 9;

function setup() {
  let cnv = createCanvas(400, 400).parent("canvas")
  cnv.elt.onselectstart = () => false
  textAlign(CENTER, CENTER);
  textFont("monospace");
  cnv.doubleClicked(mouseDoubleClicked)
}

function draw() {
  background(colors[bgcolIndex]);
  /*
  strokeWeight(2)
  rect(120, 0, 300, 40)
  line(160, 0, 160, 40)
  line(200, 0, 200, 40)
  line(240, 0, 240, 40)
  line(280, 0, 280, 40)
  line(320, 0, 320, 40)
  line(360, 0, 360, 40)
  line(125, 15, 155, 15)
  rect(165, 5, 30, 20)
  */
  for (let oneShape of allShapes) {
    oneShape.draw();
  }
  push();
  if (!keyIsDown(CONTROL)) {
    noStroke();
    if (colors[bgcolIndex] != "black") {
      fill(0);
    } else {
      fill(255);
    }

    text("Thickness: " + lineStroke, 55, 20);
    noFill()
    stroke(5)
    rect(1, 1, 398, 398)
    fill(colors[colIndex]);
    strokeWeight(1);
    if (colors[bgcolIndex] != "black") {
      stroke(0);
    } else if (colors[bgcolIndex] === "black") {
      stroke(255);
    }
    circle(width - 30, 30, 40);
  }
  pop();
  if (drawing) {
    stroke(colors[colIndex]);
    strokeWeight(lineStroke);
    if (shape === "line") {
      line(linestart[0], linestart[1], mouseX, mouseY);
    } else if (shape === "shape") {
      line(linestart[0], linestart[1], mouseX, mouseY);
    } else if (shape === "circle") {
      noFill();
      const r = dist(mouseX, mouseY, linestart[0], linestart[1]);
      circle(linestart[0], linestart[1], 2 * r);
    } else if (shape === "rect") {
      noFill();
      rect(
        linestart[0],
        linestart[1],
        mouseX - linestart[0],
        mouseY - linestart[1]
      );
    } else if (shape === "free") {
      line(linestart[0], linestart[1], mouseX, mouseY);
      new Shape(
        "l",
        linestart[0],
        linestart[1],
        mouseX,
        mouseY,
        lineStroke,
        colors[colIndex],
        true
      );
      linestart = [mouseX, mouseY];
    }
  }
}

function mouseClicked() { 
  if (!drawing) {
    drawing = true;
    if(shape === "free"){
      new Shape("l", 0, 0, 0, 0, 0, "white", false)
    }
    linestart = [mouseX, mouseY];
  } else if (drawing) {
    drawing = false;
    if (shape === "line" || shape === "shape") {
      new Shape(
        "l",
        linestart[0],
        linestart[1],
        mouseX,
        mouseY,
        lineStroke,
        colors[colIndex]
      );
    } else if (shape === "circle") {
      const r = dist(mouseX, mouseY, linestart[0], linestart[1]);
      new Shape(
        "c",
        linestart[0],
        linestart[1],
        2 * r,
        2 * r,
        lineStroke,
        colors[colIndex]
      );
    } else if (shape === "rect") {
      new Shape(
        "r",
        linestart[0],
        linestart[1],
        mouseX - linestart[0],
        mouseY - linestart[1],
        lineStroke,
        colors[colIndex]
      );
    }
    if (shape === "shape") {
      linestart = [mouseX, mouseY];
      drawing = true;
    }
  }
}
function keyPressed() {
  if (keyIsDown(16)) {
    if (keyCode === DOWN_ARROW) {
      if (bgcolIndex != 0) {
        colIndex -= 1;
      } else if (bgcolIndex === 0) {
        colIndex = colors.length - 1;
      }
    }
    if (keyCode === UP_ARROW) {
      if (bgcolIndex != colors.length - 1) {
        bgcolIndex += 1;
      } else if (bgcolIndex === colors.length - 1) {
        bgcolIndex = 0;
      }
    }
  }
  if (keyCode === 67) {
    shape = "circle";
  }
  if (keyCode === 76) {
    shape = "line";
    drawing = false;
  }
  if (keyCode === 82) {
    shape = "rect";
  }
  if (keyCode === 70) {
    shape = "free";
  }
  if (keyCode === 83) {
    shape = "shape";
  }
  if (keyIsDown(CONTROL) && keyIsDown(83)) {
    let screenShotName = prompt("What should I name the file: ");
    saveCanvas(screenShotName, "png");
  }
  if (keyCode >= 48 && keyCode <= 57) {
    lineStroke = keyCode - 48;
  }
  if (keyCode === 187) {
    lineStroke += 2;
  }
  if (keyCode === 189) {
    lineStroke -= 2;
  }
  if (keyCode === 32) {
    allShapes = [];
  }
  if (keyCode === LEFT_ARROW) {
    while (allShapes.length != 0) {
      const s = allShapes.pop();
      if (!s.cont) {
        break;
      }
    }
  }
  if (keyCode === UP_ARROW && keyIsDown(16) === false) {
    if (colIndex != colors.length - 1) {
      colIndex += 1;
    } else if (colIndex === colors.length - 1) {
      colIndex = 0;
    }
  }
  if (keyCode === DOWN_ARROW && keyIsDown(16) === false) {
    if (colIndex != 0) {
      colIndex -= 1;
    } else if (colIndex === 0) {
      colIndex = colors.length - 1;
    }
  }
  return false;
}

function mouseDoubleClicked(){
  if(shape === "shape"){
    drawing = false
    allShapes.pop()
  }
}
