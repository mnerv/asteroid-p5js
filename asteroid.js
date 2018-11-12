function Asteroid(pos, r) {
    if (pos) {
        this.pos = pos.copy();
        this.r = r*0.5;
    } else {
        this.pos = createVector(random(width), random(height));
        this.r = random(25, 50);
    }
    this.velocity = p5.Vector.random2D();
    
    this.total = floor(random(5, 15));
    this.offsetMaxValue = this.r * 0.5;
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
        this.offset[i] = random(-this.offsetMaxValue, this.offsetMaxValue);
    }

    this.update = function () {
        this.pos.add(this.velocity);

        this.edges();
        this.render();
    }

    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(255);
        noFill();
        beginShape();
        for (let i = 0; i < this.total; i++) {
            let angle = map(i, 0, this.total, 0, TWO_PI);
            let r = this.r + this.offset[i];
            // Polar to Cartesian coordinate system
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);

        stroke(194, 14, 213);
        beginShape();
        for (let i = 0; i < this.total*5; i++) {
            let angle = map(i, 0, this.total*5, 0, TWO_PI);
            let r = this.r;
            // Polar to Cartesian coordinate system
            // https://en.wikipedia.org/wiki/Cartesian_coordinate_system
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);

        pop();
    }

    this.edges = function () {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }

        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.breakup = function(){
        let newA = [];
        newA[0] = new Asteroid(this.pos, this.r);
        newA[1] = new Asteroid(this.pos, this.r);
        return newA;
    }

}