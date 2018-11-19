function Scoreboard(){
    this.score = 0;
    this.textHeight = 16;
    this.pos = createVector(5, this.textHeight+2);
    this.realScore = 0;

    this.update = function(){
        if(this.realScore - this.score > 200){
            this.score = this.realScore - 100;
        } else if(this.realScore > this.score){
            this.score++;
        }

        this.render();
    }

    this.render = function(){
        push();
        let tempText = 'SCORE: ' + this.score;

        textFont('Roboto');
        textSize(this.textHeight);
        fill(255);
        text(tempText, this.pos.x, this.pos.y);
        
        pop();
    }

    this.add = function(score){
        this.realScore += floor(score * 5);
    }

    this.resetScore = function(){
        this.score = 0;
        this.realScore = 0;
    }
    
}