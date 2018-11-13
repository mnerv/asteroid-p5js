window.addEventListener("touchstart", touchStart, false);
window.addEventListener("touchmove", touchMove, false);
window.addEventListener("touchend", touchEnd, false);
// window.addEventListener("touchcancel", touchcancel, false);
// window.addEventListener("touchforcechange", touchForceChange, false);

let timeout;
let isMouseHidden = false;

let ship;
let scoreboard;
let rotationSpeed = 0.05;
let asteroidCount = 5;
let asteroids = [];
let lasers = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	scoreboard = new Scoreboard();
	scoreboard.render();
	for (let i = 0; i < asteroidCount; i++) {
		asteroids.push(new Asteroid());
	}
}

function draw() {
	background(0);
	ship.update();
	
	for (let i = 0; i < asteroids.length; i++) {
		if(ship.hits(asteroids[i])){
			console.log('oooops!');
			scoreboard.resetScore();
		}
		asteroids[i].update();
	}

	for (let i = lasers.length - 1; i >= 0; i--) {
		lasers[i].update();
		if(lasers[i].offscreen()){
			lasers.splice(i, 1);
			break;
		}
		for (let j = asteroids.length - 1; j >= 0; j--) {
			if (lasers[i].hits(asteroids[j])) {
				scoreboard.add(asteroids[j].r);
				if (asteroids[j].r > 20) {
					let newAsteroids = asteroids[j].breakup();
					asteroids = asteroids.concat(newAsteroids);
				}
				asteroids.splice(j, 1);
				lasers.splice(i, 1);
				break;
			}

		}

	}

	scoreboard.update();
}

function keyReleased() {
	if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW ) {
		ship.setRotation(0);
	} else if (keyCode == UP_ARROW || key == ' ') {
		ship.thrusting(false);
	}

}

function touchMove(event){
	let x = event.touches[0].pageX;
	let y = event.touches[0].pageY;
}

function touchStart(event){
	// asteroids.push(new Asteroid());
	let x = event.touches[0].pageX;
	let y = event.touches[0].pageY;
}

function touchEnd(event){
	console.log("Hello World");
}

// function touchForceChange(event){
// 	console.log(event.touches[0].force);
// }


window.addEventListener('devicemotion', function(event) {
	// console.log(event.acceleration.x + ' m/s2');
	let x = event.acceleration.x;
	let y = event.acceleration.y;
	// document.getElementById("demo").innerHTML = x + ", " + y;
  });

function keyPressed() {
	if (keyCode == 88) {
		lasers.push(new Laser(ship.pos, ship.heading));
	}

	if(key == 'Q'){
		asteroids.push(new Asteroid());
	}

	if(key == 'G'){
		scoreboard.add(50);
	}

	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(rotationSpeed);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-rotationSpeed);
	} else if (keyCode == UP_ARROW || key == ' ') {
		ship.thrusting(true);
	}
}

document.addEventListener("mousemove", magicMouse);

function magicMouse() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
        if (!isMouseHidden) {
            document.querySelector("canvas").style.cursor = "none";
            isMouseHidden = true;
        }
    }, 500);
    if (isMouseHidden) {
        document.querySelector("canvas").style.cursor = "auto";
        isMouseHidden = false;
    }
};