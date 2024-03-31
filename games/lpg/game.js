let wordJSON = {};
let words = [];

let colors = {
    background: 'rgb(230, 230, 230)',
    road: 'rgb(100, 100, 100)',
    roadLines: 'rgb(220, 220, 220)'
};

function preload() {
    wordJSON = loadJSON('words.json', function(){
        words = wordJSON.words;
    });
}

function setup() {
    createCanvas(windowWidth, 400).parent('canvas');
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
    drawRoadLine(width / 3, height, width / 2, 0, 10, 50, 40);
    drawRoadLine(width / 3 * 2, height, width / 2, 0, 10, 50, 40);
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
        length *= 0.875
    }
}
