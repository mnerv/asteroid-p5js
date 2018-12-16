class GameManager {
    constructor() {
        this.gameIsPaused = false
        this.gameStarted = false
        this.gameIsOver = false
        this.shootingInterval
        this.weaponDelay = 175

        this.scoreboard = new Scoreboard()
        this.levelBoard = new LevelBoard(this.scoreboard.textHeight)
        this.touchCon = new TouchControl()

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
            this.checkPlayerCollision()
            if (this.touchCon.showTouchControl) this.touchCon.update()
        }
        this.checkLaserCollision()

        this.scoreboard.update()
    }

    show() {
        if (this.player) {
            this.player.render()
            this.scoreboard.render()
            this.levelBoard.render()
            if (this.touchCon.showTouchControl) this.touchCon.show()
        }
        this.lasers.forEach(laser => {
            laser.update()
        })
        this.asteroids.forEach(asteroid => {
            asteroid.update()
        })
    }

    startGame() {
        this.spawn_player()
        this.addAsteroid(5)
        this.gameStarted = true
        this.gameIsPaused = false
    }

    resetGame() {
        this.asteroids = []
        this.lasers = []
        this.gameIsOver = false
        this.levelCounter = 0
        this.scoreboard.resetScore()
        this.levelBoard.resetLevel()
    }

    checkRemainingAsteroid() {
        if (this.asteroids.length == 0) {
            this.nextLevel()
        }
    }

    checkPlayerCollision() {
        this.asteroids.forEach((asteroid, index, array) => {
            if (this.player && this.player.hits(asteroid)) {
                this.gameOver()
                array.splice(index, 1)
                array = array.concat(asteroid.breakup())
            }
        })
    }

    checkHitCollision() {}

    checkLaserCollision() {
        this.lasers.forEach((laser, lIndex, lArray) => {
            if (laser.offscreen()) {
                lArray.splice(lIndex, 1)
            }
            this.asteroids.forEach((asteroid, aIndex, aArray) => {
                if (laser.hits(asteroid)) {
                    this.scoreboard.add(asteroid.r)
                    aArray.splice(aIndex, 1)
                    lArray.splice(lIndex, 1)
                    if (asteroid.r > 20) {
                        let newAsteroids = asteroid.breakup()
                        this.asteroids = this.asteroids.concat(newAsteroids)
                    }
                }
            })
        })
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
        this.stopShooting()
    }

    isPlayerAlive() {
        return this.player ? false : true
    }

    addAsteroid(quantity) {
        for (let i = 0; i < quantity; i++) {
            this.asteroids.push(new Asteroid())
        }
    }

    deleteAsteroids() {
        this.asteroids = []
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

GameManager.prototype.startShooting = function(type) {
    if (this.player && !this.gameIsPaused) {
        this.lasers.push(new DotBullet(this.player.pos, this.player.heading))
        this.shootingInterval = setInterval(() => {
            this.lasers.push(
                new DotBullet(
                    this.player.pos,
                    this.player.heading,
                    this.player.velocity
                )
            )
        }, this.weaponDelay)
    }
}

GameManager.prototype.stopShooting = function() {
    clearInterval(this.shootingInterval)
}

GameManager.prototype.thrust = function(tof) {
    if (this.player) this.player.thrusting(tof)
}

GameManager.prototype.touchControl = function() {
    if (this.player) {
        let vec = createVector(
            this.touchCon.currentPos.x - this.touchCon.startPos.x,
            this.touchCon.currentPos.y - this.touchCon.startPos.y
        )
        this.player.setHeading(vec.heading())
        this.player.analogThrust(this.touchCon.thrustScale)
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
    this.stopShooting()
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
