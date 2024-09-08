class World{
    constructor(worldWidth, worldHeight, worldDepth, blockSize, texturesList){
      this.width = worldWidth;
      this.height = worldHeight;
      this.depth = worldDepth;
      this.blockSize = blockSize;
      this.textures = texturesList;
      
      this.blocks = [];
      for(let x  = 0; x < worldWidth; x++){
        let row = [];
        for(let y = 0; y < worldHeight; y++){
          let column = [];
          for(let z = 0; z < worldDepth; z++){
            column.push(0);
          }
          row.push(column);
        }
        this.blocks.push(row);
      }
      
      this.notAir = [];
    }
    setBlock(x, y, z, type){
      this.blocks[x][y][z] = type;
      this.notAir.push({
        x: x,
        y: y,
        z: z,
        type: type
      })
    }
    render(){
      for(let block of this.notAir){
        let x = block.x * this.blockSize;
        let y = block.y * this.blockSize;
        let z = block.z * this.blockSize;
        
        let cubePoints = [
          {x: x, y: y, z: z},
          {x: x, y: y, z: z + this.blockSize},
          {x: x + this.blockSize, y: y, z: z + this.blockSize},
          {x: x + this.blockSize, y: y, z: z},
          {x: x, y: y + this.blockSize, z: z},
          {x: x, y: y + this.blockSize, z: z + this.blockSize},
          {x: x + this.blockSize, y: y + this.blockSize, z: z + this.blockSize},
          {x: x + this.blockSize, y: y + this.blockSize, z: z},
        ];
        
        drawBlock(cubePoints, this.textures[block.type]);
      }
    }
  }
  
  

function lerp2D(p1, p2, p3, p4, t1, t2) {
    let x1 = p1.x + (p2.x - p1.x) * t1;
    let y1 = p1.y + (p2.y - p1.y) * t1;
  
    let x2 = p3.x + (p4.x - p3.x) * t1;
    let y2 = p3.y + (p4.y - p3.y) * t1;
  
    let x = x1 + (x2 - x1) * t2;
    let y = y1 + (y2 - y1) * t2;
  
    return { x: x, y: y };
  }
  
function drawFace(points, tex){
    let dim = tex.width;
    strokeWeight(1);
    /*
    beginShape();
    for(let p of points){
        vertex(p.x, p.y);
    }
    endShape();
    */

    let calculatedPoints = Array.from({length: dim}, () => Array.from({length: dim}, () => null));
    for (let i = 0; i < dim - 1; i++) {
        for (let j = 0; j < dim - 1; j++) {
            let topLeft;
            if(calculatedPoints[i][j] !== null){
                topLeft = calculatedPoints[i][j]
            }
            else{
                topLeft = lerp2D(points[1], points[0], points[2], points[3], i / dim, j / dim);
                calculatedPoints[i][j] = topLeft;
            }

            let topRight;
            if(calculatedPoints[i + 1][j] !== null){
                topRight = calculatedPoints[i + 1][j]
            }
            else{
                topRight = lerp2D(points[1], points[0], points[2], points[3], (i + 1) / dim, j / dim);
                calculatedPoints[i + 1][j] = topRight;
            }

            let bottomLeft;
            if(calculatedPoints[i][j + 1] !== null){
                bottomLeft = calculatedPoints[i][j + 1]
            }
            else{
                bottomLeft = lerp2D(points[1], points[0], points[2], points[3], i / dim, (j + 1) / dim);
                calculatedPoints[i][j + 1] = bottomLeft;
            }

            let bottomRight;
            if(calculatedPoints[i + 1][j + 1] !== null){
                bottomRight = calculatedPoints[i + 1][j + 1]
            }
            else{
                bottomRight = lerp2D(points[1], points[0], points[2], points[3], (i + 1) / dim, (j + 1) / dim);
                calculatedPoints[i + 1][j + 1] = bottomRight;
            }

            let col = tex.get(i - 1, j - 1);

            fill(col);
            stroke(col);
            beginShape();
            vertex(topLeft.x, topLeft.y);
            vertex(topRight.x, topRight.y);
            vertex(bottomRight.x, bottomRight.y);
            vertex(bottomLeft.x, bottomLeft.y);
            endShape();
        }
    }
}
  
  function pointDistance(point3D){
    let distance = Math.sqrt(
      (point3D.x - cam.x) ** 2 +
      (point3D.y - cam.y) ** 2 + 
      (point3D.z - cam.z) ** 2
    );
    
    return distance;
  }
  
  function faceDistance(points){
    let newPoints = [];
    let totalX = 0;
    let totalY = 0;
    let totalZ = 0;
    for(let i = 0; i < points.length; i++){
      totalX += points[i].x;
      totalY += points[i].y;
      totalZ += points[i].z;
    }
    let center = {
      x: totalX / points.length,
      y: totalY / points.length,
      z: totalZ / points.length
    };
    return pointDistance(center);
  }
  
  function facesFromPoints(points){
    let faces = [
      // Front face
      [points[0], points[1], points[2], points[3]],
      // Back face
      [points[4], points[5], points[6], points[7]],
      // Left face
      [points[0], points[1], points[5], points[4]],
      // Right face
      [points[2], points[3], points[7], points[6]],
      // Top face
      [points[1], points[2], points[6], points[5]],
      // Bottom face
      [points[0], points[3], points[7], points[4]]
    ];
    return faces;
  }
  
  function drawBlock(points, tex){
    let faces = facesFromPoints(points);
    let newFaces = []
    faces.sort((a, b) => faceDistance(b) - faceDistance(a));
    faces.shift();
    faces.shift();
    faces.shift();
    for(let face of faces){
      let projectedPoints = []
      for(let point3D of face){
        let projectedPoint = projectPoint(point3D, cam);
        projectedPoint.x *= width;
        projectedPoint.x += width / 2;
        projectedPoint.y *= height;
        projectedPoint.y += height / 2;
        projectedPoints.push(projectedPoint);
      }
      drawFace(projectedPoints, tex);
    }
  }