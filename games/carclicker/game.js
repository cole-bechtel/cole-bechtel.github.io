//This is not Cole's original code. I altered some of the code to make the game work on my website.

let highscore = 0
let speed = 3
let score = 0
let x = 150
let scene = 0
let menuX = 5
let playedYet = false

function mouseIn(x, y, width, height){
    return mouseX > x && mouseY > y && mouseX < x + width && mouseY < y + height
}

function setup(){
    const canvas = createCanvas(400, 400).parent("canvas")
    canvas.elt.onselectstart = () => false

    noStroke()
    textAlign(CENTER, CENTER)
}

function draw(){
    //menu scene
    if(scene === 0){
        background(200)

        //menu car
        fill(125, 0, 255)
        rect(menuX, 10, 90, 60)
        fill(0)
        ellipse(menuX + 20, 85, 30, 30)
        ellipse(menuX + 70, 85, 30, 30)
        menuX += 2
        if(menuX > 400) menuX = -90

        //score text
        if(playedYet){
            fill(0)
            textSize(35)
            text("Your score was " + score, 200, 140)
        }
        else {
            fill(0)
            textSize(60)
            text("Car Clicker", 200, 140)
        }

        //buttons
        noFill()
        stroke(0)
        rect(145, 230, 110, 60, 15)
        fill(0)
        noStroke()
        textSize(35)
        text("Play", 200, 260)
    }

    //game scene
    else if(scene === 1){
        background(30, 145, 245)

        //ground
        fill(150, 100, 0)
        rect(0, 300, 400, 100)

        //car
        fill(125, 0, 255)
        rect(x, 210, 90, 60)
        fill(0)
        ellipse(x + 20, 285, 30, 30)
        ellipse(x + 70, 285, 30, 30)
        x += speed
        if(x > 400) x = -90

        //sun
        fill(255, 255, 0)
        ellipse(0, 0, 100, 100)

        //score text
        fill(0)
        textSize(40)
        text("Score: " + score, 200, 80)
        text("Highscore: " + highscore, 200, 145)
    }

    //how to play scene
    else if(scene === 2){
        background(200)

        //main menu button
        noFill()
        stroke(0)
        rect(90, 300, 220, 60, 15)
        fill(0)
        noStroke()
        textSize(35)
        text("Main menu", 200, 330)

        //how to play text
        textSize(18)
        text("Click on the purple car to earn points", 9874, 200, 140)   
     }
}

function mouseClicked(){
    //menu scene
    if(scene === 0){
        //play button
        if(mouseIn(145, 230, 110, 60)){
            scene = 1
            score = 0
            speed = 3
        }
    }

    //game scene
    else if(scene === 1){
        //score and speed increase if you click the car, otherwise you lose
        if(mouseIn(x, 210, 90, 60)){
            score += 1
            speed += 0.25
        }
        else {
            scene = 0
            playedYet = true
            if(score > highscore) highscore = score
        }
    }

    //how to play scene
    else if(scene === 2){
        if(mouseIn(90, 300, 220, 60)){
            scene = 0
        }
    }
}
