let numPoints = 2;
let anchorPoints = [];
let points = [];
let radius;
let startAngle;
let speed = 1;
let ratio = 0.5;
let maxNumPoints = 99999;
let saving = false;

function setup(){
    createCanvas(600, 600).parent("canvas");
    textAlign(CENTER, CENTER);
    radius = (width - 100) / 2;
    startAngle = -HALF_PI;
    textFont('monospace');
}

function draw(){
    background(0);    
    
    //Draw points
    stroke(255);
    strokeWeight(1);
    for(let coords of points){
        point(coords[0], coords[1]);
    }

    if(!saving){
        //Draw circle
        noFill();
        stroke(255);
        strokeWeight(3);
        ellipse(width / 2, height / 2, radius * 2 + 3, radius * 2 + 3);

        //Draw numPoints numbers around the circle
        noStroke();
        fill(255);
        textSize(30);
        for(let i = 0; i < numPoints; i++){
            let angle = map(i, 0, numPoints, startAngle, startAngle + TWO_PI);
            let x = width / 2 + cos(angle) * (radius + 22);
            let y = height / 2 + sin(angle) * (radius + 22);
            text(i + 1, x, y)
        }
    }
    else{
        let fileName = prompt("What do you wish to name this image?");
        saveCanvas(fileName, 'png');
        saving = false;
    }

    //Make new point
    if(points.length > 0 && points.length <= maxNumPoints){
        for(let i = 0; i < speed; i++){
            let coords = points[points.length - 1];
            let chosenAnchorPoint = randomChoice(anchorPoints);
            let newPoint = findNewPoint(coords, chosenAnchorPoint, ratio);
            points.push(newPoint);
        }
    }
}

function limitPoints(input){
    let value;
    if(input.value.endsWith('.')) return;
    if(input.name !== 'ratio'){
        value = parseInt(input.value);
    }
    else{
        value = parseFloat(input.value);
    }
    if(value > parseFloat(input.max)) value = parseFloat(input.max);
    if(value < parseFloat(input.min)) return;
    if(isNaN(value) && input.name === 'ratio') document.getElementById(input.id).value = '';
    else document.getElementById(input.id).value = value;
    if(input.name === 'points'){
        numPoints = value;
        if(isNaN(numPoints)) numPoints = 2;

        anchorPoints = [];

        for(let i = 0; i < numPoints; i++){
            let angle = map(i, 0, numPoints, startAngle, startAngle + TWO_PI);
            let x = width / 2 + cos(angle) * radius;
            let y = height / 2 + sin(angle) * radius;
            anchorPoints.push([x, y]);
        }

        points = [];
        points.push(getRandomPoint(300, 300, radius));
    }
    else if(input.name === 'speed'){
        speed = value;
    }
    else if(input.name === 'ratio'){
        if(value !== ratio){
            points = [];
            points.push(getRandomPoint(300, 300, radius));
        }
        if(isNaN(value)) ratio = 0.5;
        else ratio = value;
    }
}


function getRandomPoint(centerX, centerY, radius){
    let angle = Math.random() * Math.PI * 2;
    let randomRadius = Math.random() * radius;
    let x = centerX + randomRadius * Math.cos(angle);
    let y = centerY + randomRadius * Math.sin(angle);
    return [x, y];
}

function findNewPoint(point1, point2, ratio){
    let newX = point1[0] + (point2[0] - point1[0]) * ratio;
    let newY = point1[1] + (point2[1] - point1[1]) * ratio;
    return [newX, newY];
}

function randomChoice(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function saveResult(){
    saving = true;
}