let numTiles = 16
let tileSize;
let paused = true
let Speed = 100
let direction = "right"
let snake = [[2, 7]]
let apple = [13,7]
let lastMove = 0
let canChangeDir = true
let youWin = false
let highscore = 1

function setup() {
  createCanvas(400, 400).parent("canvas");
  frameRate(60)
  tileSize = width/numTiles
  textFont("monospace")
  textAlign(CENTER, CENTER)
}

function draw() {
  if(paused){
    background(220)
    noStroke()
    drawSnake()
    drawApple()
    fill(110)
    textSize(50)
    textAlign(CENTER)
    text("Press space", 200, 170)
    text("to start", 200, 230)
    textSize(20)
    textAlign(LEFT)
    text(snake.length, 7, 12)
    textAlign(RIGHT)
    text(highscore, 393, 12)
  }
  if(millis() - lastMove >= Speed && snake.length != 0 && !paused){
    let head = snake[0]
    lastMove = millis()
    let next;
    if(direction === "right"){
      next = [head[0] + 1, head[1]]
    } 
    if(direction === "left"){
      next = [head[0] - 1, head[1]]
    }
    if(direction === "up"){
      next = [head[0], head[1] - 1]
    }
    if(direction === "down"){
      next = [head[0], head[1] + 1]
    }
    if(next[0] === apple[0] && next[1] === apple[1]){
      if(snake.length === numTiles * numTiles) youWin = true
      do {
        apple = [Math.floor(random(0, numTiles)), Math.floor(random(0, numTiles))]
      } while(inSnake([apple[0], apple[1]]) && (apple[0] !== head[0] && apple[1] !== head[1]))
    }
    else snake.pop()
    if(inSnake([next[0], next[1]]) || next[0] < 0 || next[0] > numTiles - 1 || next[1] < 0 || next[1] > numTiles - 1 || snake.length + 1 === numTiles ** 2){
      restart()
    }
    else{
      snake.unshift([next[0], next[1]])
    }
    if(snake.length > highscore) highscore = snake.length
    canChangeDir = true
    background(220);
    noStroke()
    fill(110)
    textSize(20)
    textAlign(LEFT)
    text(snake.length, 7, 12)
    textAlign(RIGHT)
    text(highscore, 393, 12)
    drawSnake()
    drawApple()
    if(youWin){
      noStroke()
      fill(0)
      textSize(40)
      textAlign(CENTER)
      text("You won!", 200, 200)
    }
  }
}

function keyPressed(){
  if(keyCode === 32){
    paused ? paused = false : paused = true
  }
  if(canChangeDir && !paused){
    if(keyCode === RIGHT_ARROW && (snake.length === 1 || direction != "left")){
      direction = "right"
      canChangeDir = false
    }
    if(keyCode === LEFT_ARROW && (snake.length === 1 || direction != "right")){
      direction = "left"
      canChangeDir = false
    }
    if(keyCode === UP_ARROW && (snake.length === 1 || direction != "down")){
      direction = "up"
      canChangeDir = false
    }
    if(keyCode === DOWN_ARROW && (snake.length === 1 || direction != "up")){
      direction = "down"
      canChangeDir = false
    }
  }
  if(key === "r" && snake.length !== 0){
    restart()
  }
}

function drawGrid(){
  stroke(200)
  for(let i = 0; i < numTiles; i ++){
    line(tileSize * i, 0, tileSize * i, 600)
    line(0, tileSize * i, 600, tileSize * i)
  }
}

function drawSnake(){
  fill(0)
  for(let tile of snake){
    rect(tile[0] * tileSize, tile[1] * tileSize, tileSize, tileSize)
  }
}
  
function drawApple(){
  fill("red")
  rect(apple[0] * tileSize, apple[1] * tileSize, tileSize, tileSize)
}

function inSnake(cTile){
  for(let tTile of snake){
    if(cTile[0] === tTile[0] && cTile[1] === tTile[1]) return true
  }
  return false
}

function removeArray(smallArray, bigArray){
  let newArray = []
  for(let arr of bigArray){
    if(arrayIndex(arr, smallArray) === -1) newArray.push(arr)
  }
  return newArray
}
  
function restart(){
  snake = [[2, 7]]
  apple = [13,7]
  direction = "right"
  youWin = false
  paused = true
}