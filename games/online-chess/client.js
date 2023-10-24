//const socket = new WebSocket('wss://online-chess-yp5s.onrender.com');
const socket = new WebSocket('ws://localhost:8080');

let currentScreen = 'main-screen';

let gameCode = 'loading...';
let gameStatus = 'playing'
let requestedCode = ''

let possibleReasons = {
  'left': 'by player\ndisconnection',
  'mate': 'by checkmate',
  'resignation': 'by resignation'
}

let publicGames = [];

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened:', event);
});

let privateCodeElement = document.getElementById('private-code');

let myColor = 'white';

function displayCode(){
    privateCodeElement.innerHTML = 'Code: ' + gameCode;
}

displayCode();

function copyCode(){
    navigator.clipboard.writeText(gameCode);
    copiedMessage = document.getElementById('copied-message')
    copiedMessage.style.display = 'block';
    copiedMessage.style.opacity = 1;
    setTimeout(() => {
        fadeOutEffect('copied-message')
    }, 2000);
}

function requestJoin(){
    let input = document.getElementById('enter-code');
    let message = {
        type: 'private-join-request',
        code: input.value
    };
    socket.send(JSON.stringify(message));
    requestedCode = input.value;
    input.value = '';
}

function createPublic(){
    let input = document.getElementById('enter-name');
    let message = {
      type: 'create-public-request',
      name: input.value
    };
    socket.send(JSON.stringify(message));
    input.value = '';
}

function joinPublic(gameCode){
    let message = {
      type: 'join-public-request',
      code: gameCode
    };
    socket.send(JSON.stringify(message));
    requestedCode = gameCode;
}

function fadeOutEffect(id) {
    let fadeTarget = document.getElementById(id);
    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}


function changeScreen(screen, from=null) {
    document.getElementById(currentScreen).style.display = 'none';
    document.getElementById(screen).style.display = 'block';
    currentScreen = screen;
    if(currentScreen === 'private-screen'){
        let message = {
            type: 'create-private-request'
        }
        socket.send(JSON.stringify(message));
    }
    
    else if(currentScreen === 'join-public-screen'){
      
    }

    if(from === 'play-screen'){
      resetVars();
      let home = document.getElementById('home-button');
      home.style.display = 'none';
      let message = {
        type: 'kill-game',
        code: gameCode
      };
      socket.send(JSON.stringify(message));

    }
}

function resign(){
  let sure = confirm('Are you sure you want to resign?');
  if(sure){
    let message = {
      type: 'resignation',
      code: gameCode 
    }
    socket.send(JSON.stringify(message));
    gameStatus = 'lost';
    reason = 'resignation';
    let resign = document.getElementById('resign-button');
    resign.style.display = 'none';
    let home = document.getElementById('home-button');
    home.style.display = 'inline';
  }
}

window.onbeforeunload = function(event){
  let message = {
    type: 'byebye'
  };
  socket.send(JSON.stringify(message));
  if(['public-waiting-screen', 'private-screen'].indexOf(currentScreen) !== -1){
    let message = {
      type: 'kill-game',
      code: gameCode
    }
    socket.send(JSON.stringify(message)); 
  }
  else if(currentScreen === 'play-screen'){
    if(gameStatus === 'playing'){
      event.returnValue = 'Are sure you want to leave?';
    }
  }
}


let scene = 'Play';
let darkColor = 'rgb(93,124,93)';
let lightColor = 'rgb(203,202,202)';
let pieceImages = {};
let allPieces = [];
let selectedX = -50;
let selectedY = -50;
let selectedPiece = null;
let pieceSelected = false;
let whiteToMove = true;
let alphabet = 'abcdefgh'.split('');
let wKing;
let bKing;
let whiteCastle = {left : false, right : false, leftCastle : null, rightCastle : null};
let blackCastle = {left : false, right : false, leftCastle : null, rightCastle : null};
let enPassant = null
let next;
let wTime;
let bTime;
let checkMessage = ''
let promoting = null
let gameOver = false
let moves = []
let moveIndex = 1
let flipBlack = false
let vb = false
let newX = 0;
let newY = 0;

function resetVars(){
  gameStatus = 'playing';
  allPieces = [];
  selectedX = -50;
  selectedY = -50;
  selectedPiece = null;
  pieceSelected = false;
  whiteToMove = true;
  whiteCastle = {left : false, right : false, leftCastle : null, rightCastle : null};
  blackCastle = {left : false, right : false, leftCastle : null, rightCastle : null};
  enPassant = null
  promoting = null
  gameOver = false
  moves = []
  moveIndex = 1
  flipBlack = false
  fenPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
}

socket.addEventListener('message', message => {
    let content = JSON.parse(message.data);
    if(content.type === 'private-code'){
        gameCode = content.code;
        displayCode();
    }

    else if(content.type === 'create-public-success'){
        changeScreen('public-waiting-screen');
        gameCode = content.code;
    }

    else if(content.type === 'private-join-success'){
        if(requestedCode !== ''){
            gameCode = requestedCode;
        }
        myColor = content.color;
        if(myColor === 'white'){
          let move = document.getElementById('move-indicator');
          move.innerHTML = 'Your move';
        }
        else{
          let move = document.getElementById('move-indicator');
          move.innerHTML = "Opponent's move";
        }
        changeScreen('play-screen');
    }

	else if(content.type === 'public-games'){
		for(let publicGame of content.games){
			publicGames.push(publicGame); 
      let gameList = document.getElementById("join-public-screen");
      let button = document.createElement("button");
      let br = document.createElement('br');
      button.textContent = `${publicGame[1]}`;
      button.id = publicGame[0];
      button.classList.add('public-game-button');
      button.classList.add('button');
      button.onclick =  function() {joinPublic(publicGame[0])};
      gameList.appendChild(button);
      gameList.appendChild(br);
		}
	}
  else if(content.type == 'new-public'){
    publicGames.push(content.value); 
    let gameList = document.getElementById("join-public-screen");
    let button = document.createElement("button");
    let br = document.createElement('br');
    br.id = `${content.value[0]}br`;
    button.textContent = `${content.value[1]}`;
    button.id = content.value[0];
    button.classList.add('public-game-button');
    button.classList.add('button');
    button.onclick =  function() {joinPublic(content.value[0])};
    gameList.appendChild(button);
    gameList.appendChild(br);
  }
  else if(content.type === 'kill-public'){
    for(let i = 0; i < publicGames.length; i++) {
      if(publicGames[i][0] === content.value){
        publicGames.splice(i, 1);
        break;
      }
    }
    let button = document.getElementById(String(content.value));
    let br = document.getElementById(`${content.value}br`)
    button.remove();
    br.remove(); 
  }

    else if(content.type === 'move'){
      let remove = [];
        for(let piece of allPieces){
          if(capital(piece.type) === (myColor === 'black')){
            remove.push(piece);
          }
        }
        for(let piece of remove){
            let ind = allPieces.indexOf(piece);
            allPieces.splice(ind, 1);
        }

        for(let piece of content.pieces){
          new Piece(piece.type, piece.x, piece.y, piece.previousX, piece.previousY);
        }

        enPassant = content.enPassant;

        if(content.capturedPiece !== null){
          
          for(let piece of allPieces){
            if(piece.x === content.capturedPiece[0] && piece.y === content.capturedPiece[1] && capital(piece.type) === (myColor === 'white')){
              let ind = allPieces.indexOf(piece);
              allPieces.splice(ind, 1);
            }
          }
        }

        let all = true
        for(let piece of allPieces){
          piece.possible()
          if(capital(piece.type) === (myColor === 'white') && piece.pM.length !== 0){
            all = false
            break
          }
        }
        if(all){
          let send = {
            type: 'checkmate',
            code: gameCode
          }; 
          socket.send(JSON.stringify(send));
          gameStatus = 'lost';
          reason = 'mate';
          let resign = document.getElementById('resign-button');
          resign.style.display = 'none';
          let home = document.getElementById('home-button');
          home.style.display = 'inline';
        }

        if(myColor === 'black'){
          whiteToMove = false;
        }
        else{
          whiteToMove = true;
        }
        let move = document.getElementById('move-indicator');
        move.innerHTML = 'Your move';
    }

    else if(content.type === 'checkmate'){
      gameStatus = 'won';
      reason = 'mate'
      let resign = document.getElementById('resign-button');
      resign.style.display = 'none';
      let home = document.getElementById('home-button');
      home.style.display = 'inline';
    }

    else if (content.type === 'opponent-left' && gameStatus === 'playing'){
      gameStatus = 'won';
      reason = 'left';
      let resign = document.getElementById('resign-button');
      resign.style.display = 'none';
      let home = document.getElementById('home-button');
      home.style.display = 'inline';
    }

    else if(content.type === 'opponent-resigned' && gameStatus === 'playing'){
      gameStatus = 'won';
      console.log('YAYAYA!')
      reason = 'resignation';
      let resign = document.getElementById('resign-button');
      resign.style.display = 'none';
      let home = document.getElementById('home-button');
      home.style.display = 'inline';
    }
});

class Piece {
  constructor(type, x, y, prevX = null, prevY = null) {
    this.type = type;
    this.x = x;
    this.y = y;
    if(prevX === null){
      this.previousX = this.x;
      this.previousY = this.y;
    }
    this.pM = [];
    this.show = true;
    allPieces.push(this);
    if (this.type === 'K') {
      wKing = this;
    } else if (this.type === 'k') {
      bKing = this;
    }
    
    if (this.type == 'R') {
      if (this.x == 1 && this.y == 1) {
        whiteCastle.leftCastle = this;
        whiteCastle.left = true;
      }
      if (this.x == 8 && this.y == 1) {
        whiteCastle.rightCastle = this;
        whiteCastle.right = true;
      }
    }
    if (this.type == 'r') {
      if (this.x == 1 && this.y == 8) {
        blackCastle.leftCastle = this;
        blackCastle.left = true;
      }
      if (this.x == 8 && this.y == 8) {
        blackCastle.rightCastle = this;
        blackCastle.right = true;
      }
    }
  }
  display() {
    if (this.show) {
      push()
      let x = (this.x - 1) * 50;
      let y = (8 - this.y) * 50;
      if(myColor === 'black'){
        translate(x + 25, y + 25);
        rotate(180);
        translate(-(x + 25), -(y + 25));
      }
      image(pieceImages[this.type], x, y, 50, 50);
      pop()
    }
  }
  possible(kingCheck=true) {
    if (this.type === 'P') {
      this.pM = [];
      if (!includes([this.x, this.y + 1])[0]) {
        this.pM.push([this.x, this.y + 1]);
        if (!includes([this.x, this.y + 2])[0] && this.y === 2) {
          this.pM.push([this.x, this.y + 2]);
        }
      }

      let pawnMoves = [
        [this.x + 1, this.y + 1],
        [this.x - 1, this.y + 1],
      ];
      for (let move of pawnMoves) {
        let inc = includes(move);
        if (inc[1] != null && !capital(inc[1])) {
          this.pM.push([move[0], move[1]]);
        }
      }
      if(enPassant !== null && enPassant[1] === 6 && this.y === 5 && (enPassant[0] === this.x + 1 || enPassant[0] === this.x - 1)){
        this.pM.push([enPassant[0], enPassant[1], 'En Passant'])
      }
    }
    if (this.type === 'p') {
      this.pM = [];
      if (!includes([this.x, this.y - 1])[0]) {
        this.pM.push([this.x, this.y - 1]);
        if (!includes([this.x, this.y - 2])[0] && this.y === 7) {
          this.pM.push([this.x, this.y - 2]);
        }
      }
      let pawnMoves = [
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y - 1],
      ];
      for (let move of pawnMoves) {
        let inc = includes(move);
        if (inc[1] != null && capital(inc[1])) {
          this.pM.push([move[0], move[1]]);
        }
      }
      if(enPassant !== null && enPassant[1] === 3 && this.y === 4 && (enPassant[0] === this.x + 1 || enPassant[0] === this.x - 1)){
        this.pM.push([enPassant[0], enPassant[1], 'En Passant'])
      }
    }
    if (
      this.type === 'r' ||
      this.type === 'R' ||
      this.type === 'q' ||
      this.type === 'Q'
    ) {
      this.pM = [];
      next = [this.x + 1, this.y];
      for(let i = 0; next[0] < 9; i++){
        if(i != 0) next[0]++;
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
      }
      next = [this.x - 1, this.y];
      for(let i = 0; next[0] > 0; i++){
        if(i != 0) next[0]--;
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
      }
      next = [this.x, this.y + 1];
      for(let i = 0;next[1] < 9; i++) {
        if(i != 0) next[1]++;
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
      }
      next = [this.x, this.y - 1];
      for(let i = 0;next[1] > 0; i++){
        if(i != 0) next[1]--;
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
      }
    }
    if (
      this.type === 'b' ||
      this.type === 'B' ||
      this.type === 'q' ||
      this.type === 'Q'
    ) {
      if (this.type === 'b' || this.type === 'B') this.pM = [];
      next = [this.x + 1, this.y + 1];
      for(let i = 0; next[0] <= 8 && next[1] <= 8 && next[0] >= 1 && next[1] >= 1; i++){
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
        next[0]++;
        next[1]++;
      }
      next = [this.x - 1, this.y - 1];
      for(let i = 0; next[0] <= 8 && next[1] <= 8 && next[0] >= 1 && next[1] >= 1; i++){
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
        next[0]--;
        next[1]--;
      }
      next = [this.x - 1, this.y + 1];
      for(let i = 0; next[0] <= 8 && next[1] <= 8 && next[0] >= 1 && next[1] >= 1; i++){
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
        next[0]--;
        next[1]++;
      }
      next = [this.x + 1, this.y - 1];
      for(let i = 0; next[0] <= 8 && next[1] <= 8 && next[0] >= 1 && next[1] >= 1; i++){
        let inc = includes([next[0], next[1]]);
        if (
          (inc[1] != null && capital(inc[1]) != capital(this.type)) ||
          !inc[0]
        ) {
          this.pM.push([next[0], next[1]]);
          if (inc[1] != null && capital(inc[1]) != capital(this.type)) break;
        } else break;
        next[0]++;
        next[1]--;
      }
    }
    if (this.type === 'N' || this.type === 'n') {
      this.pM = [];
      let knightMoves = [
        [this.x + 2, this.y + 1],
        [this.x + 2, this.y - 1],
        [this.x - 2, this.y + 1],
        [this.x - 2, this.y - 1],
        [this.x + 1, this.y + 2],
        [this.x - 1, this.y + 2],
        [this.x + 1, this.y - 2],
        [this.x - 1, this.y - 2],
      ];
      for (let move of knightMoves) {
        let inc = includes(move);
        if (
          (inc[1] != null &&
            capital(inc[1]) != capital(this.type) &&
            onBoard(move)) ||
          (!inc[0] && onBoard(move))
        ) {
          this.pM.push([move[0], move[1]]);
        }
      }
    }
    if (this.type === 'K' || this.type === 'k') {
      this.pM = [];
      let kingMoves = [
        [this.x + 1, this.y],
        [this.x + 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x - 1, this.y + 1],
        [this.x - 1, this.y],
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
      ];
      for (let move of kingMoves) {
        let inc = includes(move);
        if (
          (inc[1] != null &&
            capital(inc[1]) != capital(this.type) &&
            onBoard(move)) ||
          (!inc[0] && onBoard(move))
        ) {
          this.pM.push([move[0], move[1]]);
        }
      }
      
      if (capital(this.type) && this.x == 5 && this.y == 1) {
        if (whiteCastle.left &&
            !includes([4, 1])[0] &&
            !includes([3, 1])[0] &&
            !includes([2, 1])[0]) {
          this.pM.push('O-O-O');
        }
        if (whiteCastle.right &&
            !includes([6, 1])[0] &&
            !includes([7, 1])[0]) {
          this.pM.push('O-O');
        }
      } else if (!capital(this.type) && this.x == 5 && this.y == 8) {
        if (blackCastle.left &&
            !includes([4, 8])[0] &&
            !includes([3, 8])[0] &&
            !includes([2, 8])[0]) {
          this.pM.push('O-O-O');
        }
        if (blackCastle.right &&
            !includes([6, 8])[0] &&
            !includes([7, 8])[0]) {
          this.pM.push('O-O');
        }
      }
    }
    
    if (!kingCheck) return;
    
    let newPM = [];
    //If king is in danger
    for (let move of this.pM) {
      if(!onBoard(move) && typeof move !== 'string') continue
      let prev = [this.x, this.y];
      let checkFunc = capital(this.type) ? wCheck : bCheck;
      if (move == 'O-O' && (this.type == 'K' || this.type == 'k')) {
        for (let squareCheck = 5; squareCheck <= 8; squareCheck++) {
          this.x = squareCheck;
          if (checkFunc()) break;
          else if (squareCheck == 8) newPM.push(move);
        }
      } else if (move == 'O-O-O' && (this.type == 'K' || this.type == 'k')) {
        for (let squareCheck = 5; squareCheck >= 1; squareCheck--) {
          this.x = squareCheck;
          if (checkFunc()) break;
          else if (squareCheck == 1) newPM.push(move);
        }
      } else {
        let pieceTaken = null;
        let takenPiece = includes(move)[2];
        if (includes(move)[0] && capital(includes(move)[1]) != capital(this.type)) {
          pieceTaken = [takenPiece.type, takenPiece.x, takenPiece.y];
        }

        this.x = move[0];
        this.y = move[1];
        if (pieceTaken) {
          let ind = allPieces.indexOf(takenPiece);
          allPieces.splice(ind, 1);
        }

        let check = checkFunc();

        if (!check) newPM.push(move);
        if (pieceTaken) new Piece(...pieceTaken);
      }
      
      this.x = prev[0];
      this.y = prev[1];
    }
    
    this.pM = newPM;
    return this.pM;
  }
}

function setup() {
    createCanvas(400, 400).parent('board');  
    textAlign(CENTER, CENTER);
    textFont('monospace');
    textStyle(BOLD);
    angleMode(DEGREES)
    let link = 'https://preview.p5js.org/ctb/sketches/tlYZ9LU_Z/';
    pieceImages = {
        B: loadImage('pieces/B.png'),
        K: loadImage('pieces/K.png'),
        N: loadImage('pieces/N.png'),
        P: loadImage('pieces/P.png'),
        Q: loadImage('pieces/Q.png'),
        R: loadImage('pieces/R.png'),
        b: loadImage('pieces/bb.png'),
        k: loadImage('pieces/kk.png'),
        n: loadImage('pieces/nn.png'),
        p: loadImage('pieces/pp.png'),
        q: loadImage('pieces/qq.png'),
        r: loadImage('pieces/rr.png'),
    }

    fenPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
}

function draw() {
    if(myColor === 'black'){
        translate(200, 200);
        rotate(180)
        translate(-200, -200);
    }
  background(150)
  if(scene === 'Play'){
    var nextColor = lightColor;
    var squareX = 0;
    var squareY = 0;
  
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 === j % 2) fill(lightColor);
        else fill(darkColor);
        noStroke();
        rect(i * 50, j * 50, 50, 50);
      }
    }
    fill('rgb(194,194,6)');
    if (pieceSelected) {
      rect(selectedX, selectedY, 50, 50);
    }
    for (let piece of allPieces) {
      piece.display();
    }
    push();
    if (pieceSelected) {
      for (let move of selectedPiece.pM) {
        if (move == 'O-O') {
          noFill();
          stroke('grey');
          strokeWeight(6);

          if (capital(selectedPiece.type)) {
            ellipse(8 * 50 - 25, (8 - (1 - 1)) * 50 - 25, 35, 35);
          } else {
            ellipse(8 * 50 - 25, (8 - (8 - 1)) * 50 - 25, 35, 35);
          }
        } else if (move == 'O-O-O') {
          noFill();
          stroke('grey');
          strokeWeight(6);

          if (capital(selectedPiece.type)) {
            ellipse(1 * 50 - 25, (8 - (1 - 1)) * 50 - 25, 35, 35);
          } else {
            ellipse(1 * 50 - 25, (8 - (8 - 1)) * 50 - 25, 35, 35);
          }
        } else if (includes(move)[0] || move[2] === 'En Passant') {
          noFill();
          stroke('grey');
          strokeWeight(6);
          ellipse(move[0] * 50 - 25, (8 - (move[1] - 1)) * 50 - 25, 35, 35);
        } else {
          fill('grey');
          noStroke();
          ellipse(move[0] * 50 - 25, (8 - (move[1] - 1)) * 50 - 25, 20, 20);
        }
      }
    }
    pop();


    //Row and column numbers
    push()
    if(myColor === 'black'){
        translate(400, 400);
        rotate(180);
    }
    fill(0);
    textSize(10);
    for (let row = 1; row <= 8; row++) {
      text(9 - row, 5, (row - 1) * 50 + 8);
    }

    for (let col = 1; col <= 8; col++) {
      text(alphabet[col - 1], (col - 1) * 50 + 5, 394);
    }
    pop();
    
    //Check message
    noStroke()
    fill(0)
    textSize(25)
    text(checkMessage, 200, 427)
    
    //Promoting
    push()
    if(promoting !== null){
      noStroke()
      if(promoting === 'white'){
        fill(0, 0, 0, 175)
        rect(140, 140, 120, 120, 10)
        image(pieceImages.Q, 145, 145, 55, 55)
        image(pieceImages.R, 200, 145, 55, 55)
        image(pieceImages.B, 145, 200, 55, 55)
        image(pieceImages.N, 200, 200, 55, 55)

      }
      else{
        translate(200, 200);
        rotate(180)
        fill(255, 255, 255, 175)
        rect(-60, -60, 120, 120, 10)
        image(pieceImages.q, -55, -55, 55, 55)
        image(pieceImages.r, 0, -55, 55, 55)
        image(pieceImages.b, -55, 0, 55, 55)
        image(pieceImages.n, 0, 0, 55, 55)
      }
    }
    pop()
    push()
    if(gameStatus !== 'playing' && !vb){
      fill(150);
      noStroke();
      rect(75, 75, 250, 250, 10);
      fill(0);
      textSize(50);
      if(gameStatus === 'lost' || gameStatus === 'won'){
        newX = mouseX;
        newY = mouseY;
        if(myColor === 'black'){
            newX = 400 - mouseX;
            newY = 400 - mouseY;
        }
        if(myColor === 'black'){
          translate(200, 200);
          rotate(180);
          text(`You ${gameStatus}`, 0, -75);
          textSize(30);
          textAlign(CENTER, TOP);
          text(possibleReasons[reason], 0, -40);
          textAlign(CENTER, CENTER);
          /*
          let button = createButton('View Board');
          button.position(400, 200);
          button.mousePressed(viewBoard);
          */
          if(button(100, 100, 200, 50)){
            fill(214);
            document.body.style.cursor = "pointer";
            if(mouseIsPressed){
              vb = true;
              document.body.style.cursor = "default";
            }
          }
          else{
            fill(180)
            document.body.style.cursor = "default";
          }
          stroke(0);
          strokeWeight(5);
          rect(-100, 50, 200, 50, 10);
          noStroke();
          fill(0);
          textSize(30);
          text('View board', 0, 76)
        }
        else{
          text(`You ${gameStatus}`, 200, 125);
          textSize(30);
          textAlign(CENTER, TOP);
          text(possibleReasons[reason], 200, 160);
          textAlign(CENTER, CENTER);
          /*
          let button = createButton('View Board');
          button.position(400, 200);
          button.mousePressed(viewBoard);
          */
          if(button(100, 250, 200, 50)){
            fill(214);
            document.body.style.cursor = "pointer";
            if(mouseIsPressed){
              vb = true;
              document.body.style.cursor = "default";
            }
          }
          else{
            fill(180)
            document.body.style.cursor = "default";
          }
          stroke(0);
          strokeWeight(5)
          rect(100, 250, 200, 50, 10);
          noStroke();
          fill(0);
          textSize(30);
          text('View board', 200, 276)
        }
      }
    }
    pop()
  }
}

function viewBoard(){
    vb = true;
}

function fenPosition(fen) {
  let thisPosition = [0, 8];
  for (let i = 0; i < fen.length; i++) {
    thisPosition[0] += 1;
    if (pieceImages[fen[i]] != undefined) {
      new Piece(fen[i], thisPosition[0], thisPosition[1]);
    } else if (fen[i] === '/') {
      thisPosition[0] = 0;
      thisPosition[1] -= 1;
      continue;
    } else {
      for (let a = 0; a <= parseInt(fen[i] - 2); a++) {
        thisPosition[0] += 1;
      }
    }
  }
  thisPosition = [0, 8];
}

function sendMoves(message, captured, ignore=false){
    for(let piece of allPieces){
      if(capital(piece.type) === (myColor === 'white')){
          message.pieces.push(piece);
      }
    }
    message.capturedPiece = captured;
    if(enPassant !== null){
      message.enPassant = enPassant;
    }
    if(!ignore){
      socket.send(JSON.stringify(message));
      let move = document.getElementById('move-indicator');
      move.innerHTML = "Opponent's move";
      enPassant = null;
    }
    pieceSelected = false;
}

let captured = null;

function mouseClicked() {
    let message = {
      type: 'move',
      code: gameCode,
      pieces: [],
      capturedPiece: captured,
      enPassant: null
    };
    newX = mouseX;
    newY = mouseY;
    if(myColor === 'black'){
        newX = 400 - mouseX;
        newY = 400 - mouseY;
    }
  if(scene === 'Play' && !gameOver && moveIndex === 1){
    if(promoting !== null){
      if(promoting === 'white'){
        if(button(145, 145, 55, 55)){
          selectedPiece.type = 'Q'
          sendMoves(message, captured);
        }
        if(button(200, 145, 55, 55)){
          selectedPiece.type = 'R'
          sendMoves(message, captured);
        }
        if(button(145, 200, 55, 55)){
          selectedPiece.type = 'B'
          sendMoves(message, captured);
        }
        if(button(200, 200, 55, 55)){
          selectedPiece.type = 'N'
          sendMoves(message, captured);
        }
      }
      if(promoting === 'black'){
        if(button(145, 145, 55, 55)){
          selectedPiece.type = 'n'
          sendMoves(message, captured);
        }
        if(button(200, 145, 55, 55)){
          selectedPiece.type = 'b'
          sendMoves(message, captured);
        }
        if(button(145, 200, 55, 55)){
          selectedPiece.type = 'r'
          sendMoves(message, captured);
        }
        if(button(200, 200, 55, 55)){
          selectedPiece.type = 'q'
          sendMoves(message, captured);
        }
      }
      if(['p', 'P'].indexOf(selectedPiece.type) === -1){
        switchTurn();
      }
      selectedPiece.possible()
      promoting = null
    }

    captured = null;
  
    if (whiteToMove === (myColor === 'white') && promoting === null){
      selectedX = round((newX - 25) / 50) * 50;
      selectedY = round((newY - 25) / 50) * 50;
      if (!pieceSelected) {
        for (let piece of allPieces) {
            if(capital(piece.type) !== (myColor === 'white')) continue;
          if (
            piece.x === selectedX / 50 + 1 &&
            piece.y === 8 - selectedY / 50
          ) {
            selectedPiece = piece;
            pieceSelected = true;
          }
        }
        if (pieceSelected) {
          selectedPiece.possible();
        }

      } else {
        selectedPiece.previousX = selectedPiece.x;
        selectedPiece.previousY = selectedPiece.y;
        if (
          selectedX / 50 + 1 <= 8 &&
          selectedX / 50 + 1 >= 1 &&
          8 - selectedY / 50 <= 8 &&
          8 - selectedY / 50 >= 1
        ) {
          let able = false;
          for (let move of selectedPiece.pM) {
            if (move[0] === selectedX / 50 + 1 && move[1] === 8 - selectedY / 50) {
              able = true;
              selectedPiece.x = selectedX / 50 + 1;
              selectedPiece.y = 8 - selectedY / 50;
              moves.push([selectedPiece.type,             [selectedPiece.previousX, selectedPiece.previousY], [selectedPiece.x, selectedPiece.y]])
              //En passant
              if(move[2] === 'En Passant'){
                if(selectedPiece.type === 'P'){
                  let cap = includes([move[0], move[1] - 1])[2]
                  let ind = allPieces.indexOf(cap);
                  allPieces.splice(ind, 1);
                  captured = [cap.x, cap.y];
                }
                if(selectedPiece.type === 'p'){
                  let cap = includes([move[0], move[1] + 1])[2]
                  let ind = allPieces.indexOf(cap);
                  allPieces.splice(ind, 1);
                  captured = [cap.x, cap.y];
                }
              }
              if(selectedPiece.y === 5 && selectedPiece.previousY === 7){
                enPassant = [selectedPiece.x, 6]
              }
              if(selectedPiece.y === 4 && selectedPiece.previousY === 2){
                enPassant = [selectedPiece.x, 3]
              }
              else if(selectedPiece.y !== 5 && selectedPiece.y !== 4){
                enPassant = null
              }
              //If king or rooks were moved, remove castling ability
              if (selectedPiece == wKing) {
                whiteCastle.left = false;
                whiteCastle.right = false;
              } else if (selectedPiece == bKing) {
                blackCastle.left = false;
                blackCastle.right = false;
              } 

              else if (selectedPiece == whiteCastle.rightCastle) {
                whiteCastle.right = false;
              } else if (selectedPiece == whiteCastle.leftCastle) {
                whiteCastle.left = false;
              } 

              else if (selectedPiece == blackCastle.rightCastle) {
                blackCastle.right = false;
              } else if (selectedPiece == blackCastle.leftCastle) {
                blackCastle.left = false;
              }
              break;
            } else if (move === 'O-O' && selectedX / 50 + 1 == 8 &&
                       ((8 - selectedY / 50 == 1 &&
                         capital(selectedPiece.type)) ||
                        (8 - selectedY / 50 == 8 &&
                         !capital(selectedPiece.type)))) {
              able = true;

              selectedPiece.x = 7;
              if (capital(selectedPiece.type)) {
                whiteCastle.rightCastle.x = 6;
                whiteCastle.left = false;
                whiteCastle.right = false;
              }
              else {
                blackCastle.rightCastle.x = 6;
                blackCastle.left = false;
                blackCastle.right = false;
              }

              break;
            } else if (move == 'O-O-O' && selectedX / 50 + 1 == 1 &&
                       ((8 - selectedY / 50 == 1 &&
                         capital(selectedPiece.type)) ||
                        (8 - selectedY / 50 == 8 &&
                         !capital(selectedPiece.type)))) {
              able = true;

              selectedPiece.x = 3;
              if (capital(selectedPiece.type)) {
                whiteCastle.leftCastle.x = 4;
                whiteCastle.left = false;
                whiteCastle.right = false;
              }
              else {
                blackCastle.leftCastle.x = 4;
                blackCastle.left = false;
                blackCastle.right = false;
              }

              break;
            }
          }
          if (!able) {
            switchTurn();
          }
          else{
            /*
            let message = {
                type: 'move',
                code: gameCode,
                prevX: selectedPiece.previousX,
                prevY: selectedPiece.previousY,
                newX: selectedPiece.x,
                newY: selectedPiece.y,
            };
            */
          }
        } else {
          selectedPiece.x = selectedPiece.previousX;
          selectedPiece.y = selectedPiece.previousY;
          switchTurn();
        }
        for (let piece of allPieces) {
          if (piece != selectedPiece) {
            if (piece.x === selectedPiece.x && piece.y === selectedPiece.y) {
              if (capital(piece.type) != capital(selectedPiece.type)) {
                captured = [piece.x, piece.y];
                let ind = allPieces.indexOf(piece);
                allPieces.splice(ind, 1);
              } else {
                selectedPiece.x = selectedPiece.previousX;
                selectedPiece.y = selectedPiece.previousY;
                switchTurn();
              }
            }
          }
        }
        
        if(['P', 'p'].indexOf(selectedPiece.type) !== -1 && [1, 8].indexOf(selectedPiece.y) !== -1){
          if(capital(selectedPiece.type)) promoting = 'white'
          else promoting = 'black'
        }
        else{
          if((selectedPiece.previousX !== selectedPiece.x) || (selectedPiece.previousY !== selectedPiece.y)){
            sendMoves(message, captured);
          }
          sendMoves(message, captured, true);
          switchTurn();
        }
      }
    }
  }
}
function wCheck() {
  for (let piece of allPieces) {
    if (!capital(piece.type)) {
      piece.possible(false);
      for (let move of piece.pM) {
        if (move[0] === wKing.x && move[1] === wKing.y) {
          return true;
        }
      }
    }
  }
  return false;
}
function bCheck() {
  for (let piece of allPieces) {
    if (capital(piece.type)) {
      piece.possible(false);
      for (let move of piece.pM) {
        if (move[0] === bKing.x && move[1] === bKing.y) {
          return true;
        }
      }
    }
  }
  return false;
}
function capital(letter) {
  if (letter === letter.toUpperCase()) return true;
  else return false;
}
function switchTurn() {
  if (whiteToMove) whiteToMove = false;
  else whiteToMove = true;  
}
function includes(list) {
  for (let piece of allPieces) {
    if (piece.x === list[0] && piece.y === list[1]) return [true, piece.type, piece];
  }
  return [false, null, null];
}
function onBoard(cords) {
  if (cords[0] > 0 && cords[0] < 9 && cords[1] > 0 && cords[1] < 9) return true;
  else return false;
}

function button(x, y, w, h){
  return newX >= x && newX <= x + w && newY >= y && newY <= y + h
}
function moveTime(dir){
  if(dir === 'Back'){
    let move = moves[moves.length - moveIndex]
    let was = move[2]
    let piece = includes([was[0], was[1]])[2]
    piece.x = move[1][0]
    piece.y = move[1][1]
    moveIndex ++
  }
  else{
    moveIndex --
    let move = moves[moves.length - moveIndex]
    let is = move[1]
    let piece = includes([is[0], is[1]])[2]
    piece.x = move[2][0]
    piece.y = move[2][1]
  }
}














