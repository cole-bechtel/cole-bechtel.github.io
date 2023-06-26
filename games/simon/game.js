let greenSound;
let redSound;
let blueSound;
let yellowSound;

function preload(){
	greenSound = document.getElementById("green")
	blueSound = document.getElementById("blue")
	redSound = document.getElementById("red")
	yellowSound =document.getElementById("yellow")
}
function setup() {
	let cnv = createCanvas(400, 400).parent("canvas")
	textAlign(CENTER, CENTER)
	textFont("serif")
}
let [r, g, b, y] = ["red", "green", "blue", "yellow"]
let scene = 0
let colors = ["red", "yellow", "blue", "green"]
let answer = []
let sequence = [get_random(colors)]
let wait = 700
let yourturn = false
let times = 0
let high = 0
let score = 0

function draw() {
	if (scene === 0) {
		//Home Screen
		background(200)
		fill(220)
		strokeWeight(4)
		rect(50, 150, 300, 150, 10)
		fill(0)
		textSize(60)
		text("Play", 200, 210)
		textSize(25)
		text("(Press Space)", 200, 270)
		textSize(40)
		text("Makey-Makey", 200, 50)
		text("Simon", 200, 100)
		text("Highscore: " + high, 200, 350)
	}
	if (scene === 1) {
		//Play Screen
		background(200)
		noFill()
		strokeWeight(12)
		ellipse(200, 200, 300, 300)
		fill(g)
		arc(200, 200, 300, 300, 0, HALF_PI);
		fill(r)
		arc(200, 200, 300, 300, -1.5 * PI, -PI);
		fill(b)
		arc(200, 200, 300, 300, -0.5 * PI, -2 * PI);
		fill(y)
		arc(200, 200, 300, 300, -PI, -HALF_PI);
		fill(0)
		line(50, 200, 350, 200)
		line(200, 50, 200, 350)
		ellipse(200, 200, 120, 100)
		fill(255)
		textSize(30)
		text("Simon", 200, 180)
		textSize(25)
		text("Score: " + String(sequence.length - 1), 200, 220)
		if (yourturn && times > 0) {
			if (arraysEqual(answer, sequence)) {
				sequence.push(get_random(colors))
				answer = []
				yourturn = false
				times++
				lightSeq()
			} else if (arraysStart(answer, sequence) === false) {
				if (sequence.length - 1 > high) {
					high = sequence.length - 1
				}
				light("red")
				light("green")
				light("blue")
				light("yellow")
				yellowSound.play()
				blueSound.play()
				greenSound.play()
				redSound.play()
				score = sequence.length - 1
				sequence = [get_random(colors)]
				times = 0
				answer = []
				wait = 700
				setTimeout(() => {
					scene = 2
					yourturn = false
				}, 1000)
			}
		}
	}
	if (scene === 2) {
		background(200)
		fill(220)
		strokeWeight(4)
		rect(50, 200, 300, 150, 10)
		textSize(70)
		fill(0)
		text("Game Over!", 200, 80)
		textSize(50)
		text("Play Again", 200, 250)
		textSize(30)
		text("Your score was: " + String(score), 200, 155)
		text("(Press Space)", 200, 310)
	}
}

function keyPressed() {
	if (keyCode === 32 && scene == 0 || scene == 2) {
		scene = 1
		lightSeq()
		times++
	}
	if (keyCode === UP_ARROW && yourturn && scene == 1) {
		light("yellow")
		answer.push("yellow")
	}
	if (keyCode === LEFT_ARROW && yourturn && scene == 1) {
		light("red")
		answer.push("red")
	}
	if (keyCode === DOWN_ARROW && yourturn && scene == 1) {
		light("green")
		answer.push("green")
	}
	if (keyCode === RIGHT_ARROW && yourturn && scene == 1) {
		light("blue")
		answer.push("blue")
	}
}

function mouseClicked() {
	if (button(50, 350, 150, 300) && scene == 0) {
		scene = 1
		lightSeq()
		times++
	}
	if (button(50, 300, 200, 350) && scene == 2) {
		scene = 1
		lightSeq()
		times++
	}
	if (button(50, 200, 50, 200) && yourturn && scene == 1) {
		light("yellow")
		answer.push("yellow")
	}
	if (button(200, 350, 50, 200) && yourturn && scene == 1) {
		light("blue")
		answer.push("blue")
	}
	if (button(50, 200, 200, 350) && yourturn && scene == 1) {
		light("red")
		answer.push("red")
	}
	if (button(200, 350, 200, 350) && yourturn && scene == 1) {
		light("green")
		answer.push("green")
	}
}

function button(x1, x2, y1, y2) {
	return mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2;
}

function lightSeq() {
	if (yourturn === false) {
		for (i = 0; i < sequence.length; i++) {
			light(sequence[i])
			wait += 700
		}
		setTimeout(() => {
			yourturn = true
			wait = 700
		}, 700 * sequence.length);
	}
}

function light(color) {
	if (color === "red") {
		if (yourturn === false) {
			setTimeout(() => {
				r = "pink"
				redSound.play()
				setTimeout(() => {
					r = "red"
				}, 500);
			}, wait);
		} else {
			r = "pink"
			redSound.play()
			setTimeout(() => {
				r = "red"
			}, 500);
		}
	}
	if (color === "green") {
		if (yourturn === false) {
			setTimeout(() => {
				g = "lightgreen"
				greenSound.play()
				setTimeout(() => {
					g = "green"
				}, 500);
			}, wait);
		} else {
			g = "lightgreen"
			greenSound.play()
			setTimeout(() => {
				g = "green"
			}, 500);
		}
	}
	if (color === "blue") {
		if (yourturn === false) {
			setTimeout(() => {
				b = "lightblue"
				blueSound.play()
				setTimeout(() => {
					b = "blue"
				}, 500);
			}, wait);
		} else {
			b = "lightblue"
			blueSound.play()
			setTimeout(() => {
				b = "blue"
			}, 500);
		}
	}
	if (color === "yellow") {
		if (yourturn === false) {
			setTimeout(() => {
				y = "rgb(255,255,239)"
				yellowSound.play()
				setTimeout(() => {
					y = "yellow"
				}, 500);
			}, wait);
		} else if (yourturn) {
			y = "rgb(255,255,239)"
			yellowSound.play()
			setTimeout(() => {
				y = "yellow"
			}, 500);
		}
	}
}

function arraysEqual(a, b) {
	if (a.length === b.length) {
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
}

function arraysStart(a, b) {
	let equals = true
	if (a.length !== b.length && a.length !== 0) {
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {
				equals = false
			}
		}
		return equals
	} else if (a.length === 0) {
		return true
	} else if (a.length == b.length) {
		return arraysEqual(a, b)
	}
}

function get_random(list) {
	return list[Math.floor((Math.random() * list.length))];
}