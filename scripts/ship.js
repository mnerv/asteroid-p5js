class Ship {
    constructor() {
        this.pos = createVector(width / 2, height / 2)
        this.rotationSpeed = 0.05
        this.thrustMultiplier = 0.5

        this.heading = -PI / 2
        this.r = 10
        this.rotation = 0
        this.velocity = createVector(0, 0)
        this.isThrust = false

        this.friction = 0.97
    }

    update() {
        this.pos.add(this.velocity)
        this.velocity.mult(this.friction)

        if (this.isThrust) this.thrust()

        this.edges()
        this.rotating()
    }

    render() {
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.heading + PI / 2)
        // noFill();
        fill(0)
        stroke(255)
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r)

        // Draw hitbox
        stroke(0, 255 * 0.7, 255 * 0.7)
        noFill()
        beginShape()
        for (let i = 0; i < 10; i++) {
            let angle = map(i, 0, 10, 0, TWO_PI)
            let r = this.r
            // Polar to Cartesian coordinate system
            let x = r * cos(angle)
            let y = r * sin(angle)
            vertex(x, y)
        }
        endShape(CLOSE)

        pop()
    }

    edges() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r
        }

        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r
        }
    }

    hits(asteroid) {
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        if (d < this.r + asteroid.r) {
            return true
        } else {
            return false
        }
    }

    setRotation(angle) {
        this.rotation = angle
    }

    thrusting(tof) {
        this.isThrust = tof
    }

    rotating() {
        this.heading += this.rotation
    }

    setHeading(angle) {
        this.heading = angle
    }

    startHeading() {
        this.heading = -PI / 2
    }

    thrust() {
        let force
        if (this.rotation == 0) {
            force = p5.Vector.fromAngle(this.heading)
        } else {
            force = p5.Vector.fromAngle(this.heading - this.rotation)
        }

        force.mult(this.thrustMultiplier)
        this.velocity.add(force)
    }
}
