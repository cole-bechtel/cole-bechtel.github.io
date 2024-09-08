const size = 100;
let attractorPoints;
let fractalPoints = [];
const indexCutoff = 3;
let iterations = 1000;
let previousPoint;
let ratio = 0.5;
let attractorPointShapes;
const gr = (1 + Math.sqrt(5)) / 2;
const grScaled = gr * size;
const gr2 = (1 - Math.sqrt(5)) / 2;
const grScaled2 = gr2 * size;

function setup() {
  createCanvas(600, 600, WEBGL).parent("canvas");
  attractorPointShapes = {
    "tetrahedron": [
      [-size, -size, -size],
      [-size, size, size],
      [size, -size, size],
      [size, size, -size]
    ],
    "cubeVertices": [
      [-size, -size, -size],
      [-size, -size, size],
      [-size, size, size],
      [size, size, size],
      [size, size, -size],
      [size, -size, -size],
      [size, -size, size],
      [-size, size, -size]
    ],
    "cubeEdges": [
      [-size, -size, -size],
      [size, size, -size],
      [size, -size, -size],
      [-size, size, -size],
      
      [-size, -size, size],
      [size, size, size],
      [size, -size, size],
      [-size, size, size],
      
      [0, -size, -size],
      [0, size, -size],
      [size, 0, -size],
      [-size, 0, -size],
      
      [0, -size, size],
      [0, size, size],
      [size, 0, size],
      [-size, 0, size],
      
      [-size, -size, 0],
      [size, size, 0],
      [size, -size, 0],
      [-size, size, 0]
    ],
    "octahedron": [
      [0, 0, size],
      [0, size, 0],
      [size, 0, 0],
      [0, 0, -size],
      [0, -size, 0],
      [-size, 0, 0]
    ],
    "dodecahedron": [
      [size, size, size],
      [size, size, -size],  
      [size, -size, size], 
      [size, -size, -size],  
      [-size, size, size],
      [-size, size, -size],  
      [-size, -size, size], 
      [-size, -size, -size],
      [0, grScaled2, grScaled], 
      [0, grScaled2, -grScaled],  
      [0,   -grScaled2, grScaled],  
      [0, -grScaled2, -grScaled],  
      [grScaled2, grScaled, 0],  
      [grScaled2, -grScaled, 0],  
      [-grScaled2, grScaled, 0],  
      [-grScaled2, -grScaled, 0],  
      [grScaled, 0, grScaled2],  
      [grScaled, 0, -grScaled2],  
      [-grScaled, 0, grScaled2],  
      [-grScaled, 0, -grScaled2]
    ],
    "icosohedron": [
      [grScaled, size, 0],
      [grScaled, -size, 0],
      [-grScaled, -size, 0],
      [-grScaled, size, 0],
      [size, 0, grScaled],
      [-size, 0, grScaled],
      [-size, 0, -grScaled],
      [size, 0, -grScaled],
      [0, grScaled, size],
      [0, grScaled, -size],
      [0, -grScaled, -size],
      [0, -grScaled, size]
    ]
  };
  attractorPoints = attractorPointShapes["tetrahedron"];
  
  previousPoint = [random(size), random(size), random(size)];
  fractalPoints.push(previousPoint);
  
  for(let i = 0; i < iterations; i++) {
    let attractorPoint = attractorPoints[floor(Math.random() * attractorPoints.length)]
    previousPoint = findNewPoint(previousPoint, attractorPoint, ratio);
    fractalPoints.push(previousPoint);
  }
}

function draw() {
  background(0);
  orbitControl();
  stroke(255);
  strokeWeight(5);
  stroke(255, 0, 0)

  if(document.getElementById("showAttractors").checked) {
    for(let p of attractorPoints) {
      point(p[0], p[1], p[2]);
    }  
  }

  strokeWeight(1);
  stroke(255);
  
  for(let i = indexCutoff; i < fractalPoints.length; i++) {
    let p = fractalPoints[i];
    point(p[0], p[1], p[2]);
  }
}

function findNewPoint(point1, point2, ratio){
  let newX = point1[0] + (point2[0] - point1[0]) * ratio;
  let newY = point1[1] + (point2[1] - point1[1]) * ratio;
  let newZ = point1[2] + (point2[2] - point1[2]) * ratio;
  return [newX, newY, newZ];
}

function updatePoints(shape) {
  attractorPoints = attractorPointShapes[shape];
  
  fractalPoints = [];
  previousPoint = [random(size), random(size), random(size)];
  fractalPoints.push(previousPoint);
  
  for(let i = 0; i < document.getElementById("points").value; i++) {
    let attractorPoint = attractorPoints[floor(Math.random() * attractorPoints.length)]
    previousPoint = findNewPoint(previousPoint, attractorPoint, constrain(document.getElementById("ratio").value, 0, 1));
    fractalPoints.push(previousPoint);
  }
}

function takeScreenshot() {
  const name = prompt("What would you like to name the image?");
  saveCanvas(name);
}