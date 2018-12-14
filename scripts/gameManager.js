class GameManager {
    constructor() {
        this.gameIsPaused = false
        this.gameStarted = false
        this.gameIsOver = false

        this.scoreboard = new Scoreboard()
        this.levelBoard = new LevelBoard(this.scoreboard.textHeight)

        this.player

        this.rotationSpeed = 0.05

        this.asteroids = []
        this.lasers = []

        this.score = 0
        this.levelCounter = this.levelBoard.level
    }

    update() {
        if (this.player) {
            this.player.update()
            this.checkRemainingAsteroid()
        }

        this.checkPlayerCollision()
        this.checkLaserCollision()

        this.scoreboard.update()
    }

    show() {
        if (this.player) {
            this.player.render()
            this.scoreboard.render()
            this.levelBoard.render()
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
        this.addAsteroid(5)
        this.gameStarted = true
    }

    resetGame() {
        this.asteroids = []
        this.lasers = []
        this.gameIsOver = false
    }

    checkRemainingAsteroid() {
        if (this.asteroids.length == 0) {
            this.nextLevel()
        }
    }

    checkPlayerCollision() {
        for (let i = 0; i < this.asteroids.length; i++) {
            if (this.player)
                if (this.player.hits(this.asteroids[i])) {
                    this.gameOver()
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
        this.levelCounter = ++this.levelBoard.level
        this.addAsteroid(5 + this.levelCounter)
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

GameManager.prototype.touchControl = function(x, y) {
    if (this.player) {
        let vec = createVector(x - this.player.pos.x, y - this.player.pos.y)
        let shipHeading = vec.heading()
        this.player.setHeading(shipHeading)
        this.thrust(true)
    }
}

GameManager.prototype.touchConStopped = function(x, y) {
    this.thrust(false)
}

// Asteroid
GameManager.prototype.getAsteroidCount = function() {
    return this.asteroids.length
}

GameManager.prototype.isNoAsteroid = function() {
    return this.asteroids.length == 0
}

// Game play/pause
GameManager.prototype.pauseGame = function() {
    this.gameIsPaused = true
}

GameManager.prototype.resumeGame = function() {
    this.gameIsPaused = false
}

GameManager.prototype.gameOver = function() {
    this.kill_player()
    this.score = this.scoreboard.realScore
    this.scoreboard.resetScore()
    this.gameIsOver = true
    this.gameIsPaused = false
}
