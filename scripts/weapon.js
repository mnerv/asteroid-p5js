function DotBullet(sPos, angle, initialVelcity) {
    this.pos = createVector(sPos.x, sPos.y)
    this.velocity = p5.Vector.fromAngle(angle)
    this.velocity.mult(10)
    this.velocity.add(initialVelcity)

    this.update = function() {
        this.pos.add(this.velocity)

        this.render()
    }

    this.render = function() {
        push()
        stroke(255)
        strokeWeight(4)
        point(this.pos.x, this.pos.y)
        pop()
    }

    this.hits = function(asteroid) {
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        if (d < asteroid.r) {
            return true
        } else {
            return false
        }
    }

    this.offscreen = function() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true
        }
        if (this.pos.y > height || this.pos.y < 0) {
            return true
        }
        return false
    }
}
