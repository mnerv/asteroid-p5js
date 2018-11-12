function Ship(){
	this.pos = createVector(width/2, height/2);
	this.heading = 0
	this.r = 10
	this.rotation = 0;
	this.velocity = createVector(0,0);
	this.isThrust = false;

	this.friction = 0.97;

	this.update = function(){
		this.pos.add(this.velocity);
		this.velocity.mult(this.friction);

		if(this.isThrust)
			this.thrust();

		this.edges();
		this.turn();
		this.render();
	}	

	this.render = function(){
        push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI/2);
        // noFill();
        fill(0);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

		stroke(0, 255, 255);
		noFill();
        beginShape();
        for (let i = 0; i < 10; i++) {
            let angle = map(i, 0, 10, 0, TWO_PI);
            let r = this.r;
            // Polar to Cartesian coordinate system
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);

		pop();
	};

	this.edges = function(){
		if(this.pos.x > width + this.r){
			this.pos.x = -this.r;
		} else if(this.pos.x < -this.r){
			this.pos.x = width + this.r;
		}

		if(this.pos.y > height + this.r){
			this.pos.y = -this.r;
		} else if(this.pos.y < -this.r){
			this.pos.y = height + this.r;
		}
	}

	this.hits = function(asteroid){
		let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if(d < this.r){
			return true;
		} else {
			return false
		}
	}

	this.setRotation = function(angle){
		this.rotation = angle;
	}

	this.thrusting = function(tof){
		this.isThrust = tof;
	}

	this.turn = function(){
		this.heading += this.rotation;
	}

	this.thrust = function(){
		let force = p5.Vector.fromAngle(this.heading);
		this.velocity.add(force);
	}
}