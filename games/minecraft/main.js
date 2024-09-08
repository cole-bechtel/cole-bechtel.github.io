let cam = {
  x: 0,
  y: 0,
  z: 0,
  yaw: 0,
  pitch: 0,
  roll: 0,
  fov: 30,
  near: 0.1,
  far: 100,
  speed: 0.05,
  lookMultiplier: 0.001
};

let textures = {};

let world = new World(5, 5, 5, 1, textures);
world.setBlock(0, 0, 5, "dirt");
  
function setup() {
  createCanvas(600, 600).parent("canvas");
  angleMode(RADIANS);
  imageMode(CORNERS);
  textAlign(CENTER, CENTER);
  frameRate(60);
  textures.dirt = loadImage("textures/dirt.png");
}

function draw() {
  background(255)
  noFill();
  stroke(0);
  strokeWeight(5);
    
  //drawBlock(cubePoints, textures.dirt)
  world.render();
  
  //Move camera
  if(keyIsDown(87)){ //W
    cam.z += Math.cos(cam.yaw * 2) * cam.speed * (60 / frameRate());
    cam.x += Math.sin(cam.yaw * 2) * cam.speed * (60 / frameRate());
  }
  if(keyIsDown(65)){ //A
    cam.z += Math.cos((cam.yaw * 2) + (Math.PI / 2)) * cam.speed * (60 / frameRate());
    cam.x += Math.sin((cam.yaw * 2) + (Math.PI / 2)) * cam.speed * (60 / frameRate());
  }
  if(keyIsDown(83)){ //S
    cam.z -= Math.cos(cam.yaw * 2) * cam.speed * (60 / frameRate());
    cam.x -= Math.sin(cam.yaw * 2) * cam.speed * (60 / frameRate());
  }
  if(keyIsDown(68)){ //D
    cam.z += Math.cos((cam.yaw * 2) - (Math.PI / 2)) * cam.speed * (60 / frameRate());
    cam.x += Math.sin((cam.yaw * 2) - (Math.PI / 2)) * cam.speed * (60 / frameRate());
  }
  if(keyIsDown(32)){ //Space
    cam.y -= cam.speed * (60 / frameRate())
  }
  if(keyIsDown(16)){ //Left shift
    cam.y += cam.speed * (60 / frameRate())
  }
  
  //Update camera rotation based on mouse movement
  cam.yaw -= movedX * cam.lookMultiplier;
  cam.yaw = loopRotation(cam.yaw);
  cam.pitch += movedY * cam.lookMultiplier;
  cam.pitch = constrain(cam.pitch, -Math.PI / 4, Math.PI / 4);
  
  //HUD (UI)
  fill("black");
  noStroke();
  rect(width / 2 - 1, height / 2 - 10, 2, 20);
  rect(width / 2 - 10, height / 2 - 1, 20, 2)
  textAlign(LEFT, TOP);
  textSize(30)
  text(round(frameRate()), 5, 5);
}

function projectPoint(point3D, cam){
  let point2D = {
    x: 0,
    y: 0
  };
  
  let translatedPoint3D = {
    x: point3D.x - cam.x,
    y: point3D.y - cam.y,
    z: point3D.z - cam.z
  };
  
  let yaw = cam.yaw * 2;
  let pitch = cam.pitch * 2;
  let roll = cam.roll * 2
  
  //Apply yaw rotation
  const newX = translatedPoint3D.x * Math.cos(yaw) - translatedPoint3D.z * Math.sin(yaw);
  const newZ = translatedPoint3D.x * Math.sin(yaw) + translatedPoint3D.z * Math.cos(yaw);
  
  //Apply pitch rotation
  const newY = translatedPoint3D.y * Math.cos(pitch) - newZ * Math.sin(pitch);
  const newZ2 = translatedPoint3D.y * Math.sin(pitch) + newZ * Math.cos(pitch);
  
  //Apply roll rotation
  const finalX = newX * Math.cos(roll) - newY * Math.sin(roll);
  const finalY = newX * Math.sin(roll) + newY * Math.cos(roll);
  
  const rotatedPoint3D = {
    x: finalX,
    y: finalY,
    z: newZ2
  };
  
  let fovV = 2 * Math.atan(Math.tan(cam.fov / 2));
  
  let px = rotatedPoint3D.x;
  let py = rotatedPoint3D.y;
  let pz = rotatedPoint3D.z;
  
  if(pz < cam.near || pz > cam.far){
    return false;
  }
  
  //P_x < -P_z * np.tan(fov_h / 2) or P_x > P_z * np.tan(fov_h / 2)
  if(px < -pz * Math.tan(cam.fov / 2) || px > pz * Math.tan(cam.fov / 2)){
    //return false;
  }
  if(py < -pz * Math.tan(fovV / 2) || py > pz * Math.tan(fovV / 2)){
    //return false;
  }
    
  point2D.x = rotatedPoint3D.x / rotatedPoint3D.z;
  point2D.y = rotatedPoint3D.y / rotatedPoint3D.z;
  
  /*
  (0, 0): center
  (-1, -1): top left
  (1, 1): bottom right
  */
  
  point2D.x = point2D.x / Math.tan(cam.fov / 2);
  point2D.y = -point2D.y / Math.tan(cam.fov / 2);
  
  console.log(point2D);
  return point2D;
}

function loopRotation(rotation){
  if(rotation < 0){
    return Math.PI + rotation;
  }
  else if(rotation > Math.PI){
    return rotation - Math.PI;
  }
  else{
    return rotation;
  }
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((el, index) => el === b[index]);
}

function arrayInArray(mainArray, subArray) {
  return mainArray.some(array => Array.isArray(array) && arraysEqual(array, subArray));
}

function mouseClicked(){
  requestPointerLock();
}