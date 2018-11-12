function Laser(sPos, angle){
    this.pos = createVector(sPos.x, sPos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(10);


    this.update = function(){
        this.pos.add(this.velocity);

        this.render();
    }

    this.render = function(){
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.hits = function(asteroid){
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if( d < asteroid.r){
            return true;
        } else {
            return false;
        }
    }

}