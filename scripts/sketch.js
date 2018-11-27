let d = new Date()
let timeout
let isMouseHidden = false
let moveKeyPressCount = 0
let gamePaused = false
let gameStarted = false
let gameTime
let gm

let mainLabel
let playbtn
let scoreLabel

function setup() {
    createCanvas(windowWidth, windowHeight)
    gm = new GameManager()

    scoreLabel = createP('SCORE: ').id('scorelbl')
    scoreLabel.hide()
    mainLabel = createP('asteroid p5.js').id('namelbl')
    playbtn = createButton('PLAY').id('playpausebtn')

    playbtn.mousePressed(startGame)
}

function draw() {
    background(0)
    gm.update()
    gm.show()
    if (gm.isPlayerAlive() && gameStarted) {
        gameStarted = false
        gameOver()
    }
}

function gameOver() {
    // startStopInterval(false)
    noLoop()

    assignFunction('PLAY AGAIN', startGame)
    changeMainLabel('GAME OVER')
    showHideMenu(true)
    scoreLabel.show()
    scoreLabel.html('HIGH SCORE: ' + gm.getHighScore())
    gm.resetGame()
}

function startGame() {
    gm.startGame()
    scoreLabel.hide()
    showHideMenu(false)
    gameStarted = true
    loop()
}

function showHideMenu(tof) {
    if (tof) {
        playbtn.show()
        mainLabel.show()
    } else {
        playbtn.hide()
        mainLabel.hide()
    }
}

function assignFunction(name, func) {
    playbtn.mousePressed(func)
    playbtn.html(name)
}

function changeMainLabel(value) {
    mainLabel.html(value)
}

function playPause() {
    if (!gamePaused) {
        noLoop()
        if (gameStarted) {
            changeMainLabel('PAUSED')
            assignFunction('RESUME', playPause)
        }
        showHideMenu(true)
    } else {
        loop()
        assignFunction('PLAYING', playPause)
        showHideMenu(false)
    }
    gm.stop_rotate()
    moveKeyPressCount = 0
    gamePaused = !gamePaused
}

function startStopInterval(tof) {
    if (tof)
        gameTime = setInterval(() => {
            // console.time('someFunction')
            gm.update()
            // console.timeEnd('someFunction')
        }, 1000 / 60)
    else {
        clearInterval(gameTime)
    }
}

function keyReleased() {
    if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
        moveKeyPressCount--
        if (moveKeyPressCount <= 0) {
            gm.stop_rotate()
        }
    }
    if (keyCode == UP_ARROW || key == ' ') {
        gm.thrust(false)
    }
}

function touchStarted() {
    gm.touchControl(mouseX, mouseY)
    gm.shootLaser()
}

function touchMoved() {
    gm.touchControl(mouseX, mouseY)
    return false
}

function touchEnded() {
    gm.thrust(false)
}

function keyPressed() {
    if (keyCode == 88) {
        gm.shootLaser()
    }

    if (key == 'Q') {
        gm.addAsteroid(1)
    }

    if (key == 'F') console.log(getFrameRate())

    if (key == 'R') gm.spawn_player()

    if (key == 'P' || keyCode == 27) {
        if (gameStarted) playPause()
    }

    if (keyCode == RIGHT_ARROW) {
        gm.rotate(false)
        moveKeyPressCount++
    } else if (keyCode == LEFT_ARROW) {
        gm.rotate(true)
        moveKeyPressCount++
    }
    if (keyCode == UP_ARROW || key == ' ') {
        gm.thrust(true)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

window.addEventListener('blur', () => {
    if (gameStarted) playPause()
    gm.stop_rotate()
    moveKeyPressCount = 0
})

document.addEventListener('mousemove', () => {
    if (timeout) {
        clearTimeout(timeout)
    }
    timeout = setTimeout(function() {
        if (!isMouseHidden) {
            document.querySelector('canvas').style.cursor = 'none'
            isMouseHidden = true
        }
    }, 500)
    if (isMouseHidden) {
        document.querySelector('canvas').style.cursor = 'auto'
        isMouseHidden = false
    }
})
