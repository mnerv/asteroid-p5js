class TouchControl {
    constructor() {
        this.startPos = createVector(0, 0)
        this.currentPos = createVector(0, 0)
        this.showTouchControl = false

        this.thrustScale = 0

        this.bigCircleSize = 130
        this.smallCircleSize = 80
    }

    update() {
        let dX = this.currentPos.x - this.startPos.x
        let dY = this.currentPos.y - this.startPos.y

        if (abs(dX) > this.bigCircleSize / 2) {
            if (dX > 0)
                this.currentPos.x = this.startPos.x + this.bigCircleSize / 2
            else this.currentPos.x = this.startPos.x - this.bigCircleSize / 2
        }
        if (abs(dY) > this.bigCircleSize / 2) {
            if (dY > 0)
                this.currentPos.y = this.startPos.y + this.bigCircleSize / 2
            else this.currentPos.y = this.startPos.y - this.bigCircleSize / 2
        }
        let mag = sqrt(sq(dX) + sq(dY))
        let maxMag = sqrt(
            sq(this.bigCircleSize / 2) + sq(this.bigCircleSize / 2)
        )
        this.thrustScale = map(mag, maxMag / 6, maxMag, 0, 0.6)
    }

    show() {
        push()
        noFill()
        stroke(255)
        ellipse(this.startPos.x, this.startPos.y, this.bigCircleSize)
        stroke(45, 150, 255)

        point(this.currentPos.x, this.currentPos.y)
        ellipse(this.currentPos.x, this.currentPos.y, this.smallCircleSize)

        pop()
    }

    setStartPos(x, y) {
        this.startPos.set(x, y)
        this.currentPos.set(x, y)
        this.showTouchControl = true
    }

    setCurrentPos(x, y) {
        this.currentPos.set(x, y)
    }

    stopShowing() {
        this.showTouchControl = false
    }
}
