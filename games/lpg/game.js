let wordJSON = {};
let words = [];

const colors = {
    background: 'rgb(230, 230, 230)',
    road: 'rgb(100, 100, 100)',
    roadLines: 'rgb(220, 220, 220)'
};

let images = {
    car: undefined
}

function preload() {
    wordJSON = loadJSON('words.json', function(){
        words = wordJSON.words;
    });

    /*--------------Images--------------*/
    images.car = loadImage('images/car.png');
}
let car;
function setup() {
    createCanvas(windowWidth, 400).parent('canvas');
    imageMode(CORNERS);    
    car = new Car(0, 'abc', 5);
}

let cars = []

class Car{
    constructor(lane, plate, speed){
        this.lane = lane; //0 = left, 1 = center, 2 = right
        this.plate = plate;
        this.speed = speed;
        this.number = generateRandomFourDigitNumber();
        //X and Y values are that of the center of the car
        this.pos = {
            x: undefined,
            y: height,
            w: 170
        };
        if(this.lane === 0){
            this.pos.x = width / 6;
        }
        else if(this.lane === 1){
            this.pos.x = width / 2;
        }
        else{
            this.pos.x = width / 6 * 5;
        }
        cars.push(this);
    }
    display(){
        image(
            images.car,
            this.pos.x - this.pos.w / 2, //X of top left corner
            this.pos.y - this.pos.w / 2, //Y of top left corner
            this.pos.x + this.pos.w / 2, //X of bottom right corner
            this.pos.y + this.pos.w / 2  //Y of bottom right corner
        );
    }
} 

function draw() {
    background(colors.background);
    /*---------------Road---------------*/
    noStroke();
    fill(colors.road);
    beginShape();
    vertex(width / 2, 0);
    vertex(0, height);
    vertex(width, height);
    endShape();
    stroke(colors.roadLines);
    //Road lines
    drawRoadLine(width / 3, height, width / 2, 0, 10, 50, 40);
    drawRoadLine(width / 3 * 2, height, width / 2, 0, 10, 50, 40);
    car.display();
}

function drawRoadLine(startX, startY, endX, endY, thickness, length, iterations){
    let slope = (endY - startY) / (endX - startX);
    for(let i = 0; i < iterations; i++){
        let dashEndX = startX + ((length) / -slope);
        let dashEndY = startY - length;
        strokeWeight(thickness);
        if(i % 2 == 0) line(startX, startY, dashEndX, dashEndY);
        startX = dashEndX;
        startY = dashEndY;
        thickness *= 0.9;
        length *= 0.875;
    }
}

/*--------Non-p5js Functions--------*/

function generateRandomFourDigitNumber(){
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return randomNumber;
}

function windowResized(){
    resizeCanvas(windowWidth, 400);
}