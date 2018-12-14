// let d = new Date()
let timeout
let isMouseHidden = false
let moveKeyPressCount = 0

let showTouchControl = false
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
    if (gm.isPlayerAlive() && gm.gameIsOver) {
        gameOver()
    }
}

function gameOver() {
    assignFunction('PLAY AGAIN', resetGame)
    changeMainLabel('GAME OVER')
    showHideMenu(true)
    scoreLabel.show()
    scoreLabel.html('HIGH SCORE: ' + gm.getHighScore())
}

function startGame() {
    gm.startGame()

    scoreLabel.hide()
    showHideMenu(false)
    loop()
}

function resetGame() {
    gm.resetGame()
    gm.startGame()
    scoreLabel.hide()
    showHideMenu(false)
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
    if (gm.gameStarted && !gm.gameIsPaused) {
        noLoop()
        if (!gm.gameIsOver) {
            changeMainLabel('PAUSED')
            assignFunction('RESUME', playPause)
        }
        showHideMenu(true)
        gm.gameIsPaused = true
    } else if (gm.gameStarted && !gm.gameIsOver) {
        loop()
        assignFunction('PLAYING', playPause)
        showHideMenu(false)
        gm.gameIsPaused = false
    }
    gm.stop_rotate()
    moveKeyPressCount = 0
}

function startStopInterval(tof) {
    if (tof)
        gameTime = setInterval(() => {
            gm.update()
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

function touchStarted(event) {
    if (event.type == 'touchstart') {
        gm.touchControl(event.touches[0].pageX, event.touches[0].pageY)
        showTouchCon = true
        gm.shootLaser()
    }
    return false
}

function touchMoved(event) {
    if (event.type == 'touchmove') {
        gm.touchControl(event.touches[0].pageX, event.touches[0].pageY)
    }
    return false
}

function touchEnded(event) {
    if (event.type == 'touchend') {
        gm.touchControl(event.pageX, event.pageY)
    }
    showTouchCon = false
    touchStartPos = []
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

    if (key == ' ' && !gameStarted) {
        startGame()
    } else if (keyCode == RIGHT_ARROW) {
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
    playPause()
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
