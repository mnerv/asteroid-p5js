class GameManager {
    constructor() {
        this.scoreboard = new Scoreboard()
        this.player

        this.rotationSpeed = 0.05

        this.asteroids = []
        this.lasers = []

        this.levelCounter = 0
        this.score = 0
    }

    update() {
        if (this.player) this.player.update()

        this.checkPlayerCollision()
        this.checkLaserCollision()

        this.scoreboard.update()
    }

    show() {
        if (this.player) {
            this.player.render()
            this.scoreboard.render()
        }
        this.lasers.forEach(element => {
            element.update()
        })
        this.asteroids.forEach(element => {
            element.update()
        })
    }

    startGame() {
        this.spawn_player()
        this.addAsteroid(10)
    }

    resetGame() {
        this.asteroids = []
        this.lasers = []
    }

    checkPlayerCollision() {
        for (let i = 0; i < this.asteroids.length; i++) {
            if (this.player)
                if (this.player.hits(this.asteroids[i])) {
                    this.kill_player()
                    this.score = this.scoreboard.realScore
                    this.scoreboard.resetScore()
                    this.asteroids = this.asteroids.concat(
                        this.asteroids[i].breakup()
                    )
                    this.asteroids.splice(i, 1)
                }
        }
    }

    checkLaserCollision() {
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            if (this.lasers[i].offscreen()) {
                this.lasers.splice(i, 1)
                break
            }
            for (let j = this.asteroids.length - 1; j >= 0; j--) {
                if (this.lasers[i].hits(this.asteroids[j])) {
                    this.scoreboard.add(this.asteroids[j].r)
                    if (this.asteroids[j].r > 20) {
                        let newAsteroids = this.asteroids[j].breakup()
                        this.asteroids = this.asteroids.concat(newAsteroids)
                    }
                    this.asteroids.splice(j, 1)
                    this.lasers.splice(i, 1)
                    break
                }
            }
        }
    }

    getHighScore() {
        return this.score
    }

    nextLevel() {
        this.levelCounter++
    }

    spawn_player() {
        if (!this.player) this.player = new Ship()
    }

    kill_player() {
        this.player = null
    }

    isPlayerAlive() {
        return this.player ? false : true
    }

    addAsteroid(quantity) {
        for (let i = 0; i < quantity; i++) {
            this.asteroids.push(new Asteroid())
        }
    }
}

// Ship movment
GameManager.prototype.rotate = function(tof) {
    // true: left, false: right
    if (this.player)
        if (tof) this.player.setRotation(-this.rotationSpeed)
        else this.player.setRotation(this.rotationSpeed)
}

GameManager.prototype.stop_rotate = function() {
    if (this.player) this.player.setRotation(0)
}

GameManager.prototype.shootLaser = function() {
    if (this.player)
        this.lasers.push(new Laser(this.player.pos, this.player.heading))
}

GameManager.prototype.thrust = function(tof) {
    if (this.player) this.player.thrusting(tof)
}
