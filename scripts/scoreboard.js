class Scoreboard {
    constructor() {
        this.displayScore = 0
        this.textHeight = 16
        this.pos = createVector(5, this.textHeight + 2)
        this.realScore = 0
    }

    update() {
        if (this.realScore - this.displayScore > 200) {
            this.displayScore = this.realScore - 100
        } else if (this.realScore > this.displayScore) {
            this.displayScore++
        }
    }

    render() {
        push()
        let tempText = 'SCORE: ' + this.displayScore

        textFont('Roboto')
        textSize(this.textHeight)
        fill(255)
        text(tempText, this.pos.x, this.pos.y)

        pop()
    }

    add(score) {
        this.realScore += floor(score * 5)
    }

    resetScore() {
        this.displayScore = 0
        this.realScore = 0
    }
}

class LevelBoard {
    constructor(offset) {
        this.level = 0
        this.textHeight = 12
        this.pos = createVector(5, 1.5 * offset + this.textHeight)
    }

    render() {
        push()
        let tempText = 'LEVEL: ' + this.level

        textFont('Roboto')
        textSize(this.textHeight)
        fill(255)
        text(tempText, this.pos.x, this.pos.y)

        pop()
    }
}
