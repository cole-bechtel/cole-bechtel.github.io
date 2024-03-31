document.addEventListener('contextmenu', event => event.preventDefault());

let isFirstRightClick = true;
let gravity = 0.3
let force = 0
let allBalls = []
let allHoops = []
let ableToShoot = false;
let shootingAngle = 90
let predictionBall = null;
let totalPoints = 0

class Ball{
  constructor(x, y, r, xvel, yvel, invisible){
    this.x = x
    this.y = y
    this.r = r
    this.xvel = xvel
    this.yvel = yvel
    this.onGround = false
    this.invisible = invisible
    this.notAvailable = []
    allBalls.push(this)
  }
  
  move(){
    this.x += this.xvel
    this.yvel += gravity
    this.y += this.yvel
    //Bouncing
    if(this.x + this.r >= 600 || this.x - this.r <= 0){
      this.x + this.r >= 600 ? this.x = 600 - this.r : this.x = 0 + this.r
      this.xvel = this.xvel *= -1 * 0.7
    }
    if(this.y + this.r >= 500 || this.y - this.r <= 0 && !this.yStopped){
      this.y + this.r >= 500 ? this.y = 500 - this.r : this.y = 0 + this.r
      this.yvel = this.yvel *= -1 * 0.7
      if(Math.abs(this.yvel) < 0.2){
        this.onGround = true
        this.yvel = 0
        this.y = 500 - this.r
      }
    }
    if(this.onGround){
      this.xvel *= 0.98
    }
  }
  
  display(){
    if(!this.invisible){
      push()
      fill(document.getElementById("ballPicker").value)
      ellipse(this.x, this.y, this.r * 2, this.r * 2)
      pop()
    }  
  }
  
  throughHoop(hoop){
    if(this.x >= hoop.x + hoop.r * 2 * 0.1 && this.x <= hoop.x + hoop.r * 2 * 0.9 && this.y + this.r >= hoop.y && this.y <= hoop.y + (((this.r * 2)/425) * 278) && this.notAvailable.indexOf(hoop) === -1){
      totalPoints ++
      this.notAvailable.push(hoop)
    }
  }
  collide(hoop){
  }
}

class Hoop{
  constructor(x, y, r, side){
    this.x = x
    this.y = y
    this.r = r
    this.side = side
    allHoops.push(this)
  }
  
  display(){
    push()
    fill(0)
    //Rim
    rect(this.x, this.y, this.r * 2, 5)
    //Backboard
    if(this.side === "left") rect(this.x, this.y - this.r * 2, 5, this.r * 2)
    if(this.side === "right") rect(this.x + this.r * 2 - 5, this.y - this.r * 2, 5, this.r * 2)
    //Net
    image(netImg, this.x, this.y + 5, this.r * 2, ((this.r * 2)/425) * 278)
    pop()
  }
}

//let test = new Hoop(200, 200, 30, "right")
function setup() {
  createCanvas(600, 500).parent("canvas");
  textAlign(CENTER, CENTER);
}

function draw() {
  background(document.getElementById("bgPicker").value)
  for(let ball of allBalls){
    ball.move()
    ball.display()
    if(frameCount % 50 === 0) ball.notAvailable = []
    //for(let hoop of allHoops){
      //ball.throughHoop(hoop)
      //ball.collide(hoop)
    //}
  }
  //for(let hoop of allHoops){
    //hoop.display()
  //}
  if(keyIsDown(UP_ARROW)){
    force += 0.1
  }
  if(keyIsDown(DOWN_ARROW) && force >= 0){
    force -= 0.1
  }
  let points = []
  let pred = {
    x: mouseX,
    y: mouseY,
    xvel: BallFromAngle(shootingAngle, force)[0],
    yvel: BallFromAngle(shootingAngle, force)[1],
  }
  for(let i = 0; i < 30; i++){
    pred.x += pred.xvel
    pred.yvel += gravity
    pred.y += pred.yvel
    if(pred.x + 10 >= 600 || pred.x - 10 <= 0){
      pred.x + 10 >= 600 ? pred.x = 600 - 10 : pred.x = 10
      pred.xvel *= -0.7
    }
    if(pred.y + 10 >= 500 || pred.y - 10 <= 0){
      pred.y + 10 >= 500 ? pred.y = 490 : pred.y = 10
      pred.yvel *= -0.7
      if(Math.abs(pred.yvel) < 0.3){
        pred.yvel = 0

      }
    }
    points.push([pred.x, pred.y])
  }
  for(let p of points){
    let bg = hexToRgb(document.getElementById("bgPicker").value);
    //fill((bg[0] + 128) % 256, (bg[1] + 128) % 256, (bg[2] + 128) % 256);
    let average = (bg[0] + bg[1] + bg[2]) / 3;
    if(average > 127) fill(0);
    else fill(255);
    ellipse(p[0], p[1], 3, 3)
  }
  fill(document.getElementById("ballPicker").value)
  noStroke()
  ellipse(mouseX, mouseY, 20, 20)
  if(keyIsDown(LEFT_ARROW)){
    if(shootingAngle === 2*Math.PI){
      shootingAngle = 0
    }
    else{
      shootingAngle += (Math.PI/180) * 1.5
    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    if(shootingAngle === 2*Math.PI){
      shootingAngle = 0
    }
    else{
      shootingAngle -= (Math.PI/180) * 1.5
    }
  }
}

function mousePressed(){
  if(mouseButton === RIGHT && isFirstRightClick){
    new Ball(mouseX, mouseY, 10, BallFromAngle(shootingAngle, force)[0], BallFromAngle(shootingAngle, force)[1], false)
    isFirstRightClick = false;
  }
  return false;
}

function mouseReleased(){
  isFirstRightClick = true;
}

function keyPressed(){
  if(keyCode === 32){
    new Ball(mouseX, mouseY, 10, BallFromAngle(shootingAngle, force)[0], BallFromAngle(shootingAngle, force)[1], false)
  }
  if(key === "c") allBalls = []
  if(key === "v") saveCanvas();
}

document.addEventListener("keydown", (e) => {
  switch(e.key) {
    case "ArrowUp": case "ArrowDown": case " ":
      e.preventDefault();
  }
});

function BallFromAngle(angle, f){
  return [Math.cos(angle) * f, (Math.sin(angle) * f) * -1]
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');

  var bigint = parseInt(hex, 16);

  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}