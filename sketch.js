window.addEventListener("touchstart", touchStart, false);
window.addEventListener("touchmove", touchMove, false);
// window.addEventListener("touchend", touchEnd, false);
// window.addEventListener("touchcancel", touchCancel, false);
// window.addEventListener("touchforcechange", touchForceChange, false);


let ship;
let rotationSpeed = 0.08;
let asteroidCount = 5;
let asteroids = [];
let lasers = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
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
	let y= event.touches[0].pageY;
	console.log('x: ' + x, ", y: " + y);
	// document.getElementById("demo").innerHTML = x + ", " + y;
}

function touchStart(event){
	// asteroids.push(new Asteroid());
	let x = event.touches[0].pageX;
	let y= event.touches[0].pageY;
}

window.addEventListener('devicemotion', function(event) {
	console.log(event.acceleration.x + ' m/s2');
	let x = event.acceleration.x;
	let y = event.acceleration.y;
	document.getElementById("demo").innerHTML = x + ", " + y;
  });

function keyPressed() {
	if (keyCode == 88) {
		lasers.push(new Laser(ship.pos, ship.heading));
	}

	if(key == 'Q'){
		asteroids.push(new Asteroid());
		// console.log(asteroids.length);
	}

	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(rotationSpeed);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-rotationSpeed);
	} else if (keyCode == UP_ARROW || key == ' ') {
		ship.thrusting(true);
	}
}