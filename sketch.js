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

	// console.log(lasers.length);

}

function keyReleased() {
	if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW ) {
		ship.setRotation(0);
	} else if (keyCode == UP_ARROW || key == ' ') {
		ship.thrusting(false);
	}

}

function keyPressed() {

	if (keyCode == 88) {
		lasers.push(new Laser(ship.pos, ship.heading));
	}

	if(key == 'Q'){
		asteroids.push(new Asteroid());
		console.log(asteroids.length);
	}

	// console.log(event);

	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(rotationSpeed);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-rotationSpeed);
	} else if (keyCode == UP_ARROW || key == ' ') {
		ship.thrusting(true);
	}
}