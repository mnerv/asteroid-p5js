let ship;
let rotationSpeed = 0.1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
}

function draw() {
	background(0);
	ship.update();

}

function keyReleased(){
	ship.setRotation(0);
}

function keyPressed(){
	if(keyCode == RIGHT_ARROW){
		ship.setRotation(rotationSpeed);
	} else if(keyCode == LEFT_ARROW){
		ship.setRotation(-rotationSpeed);
	}
}

function Ship(){
	this.pos = createVector(width/2, height/2);
	this.heading = 0
	this.r = 10
	this.rotation = 0;

	this.update = function(){
		this.turn();
		this.render();
		
	}

	this.render = function(){

		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		noFill();
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		
	};

	this.setRotation = function(angle){
		this.rotation = angle;
	}

	this.turn = function(){
		this.heading += this.rotation;
	}
}