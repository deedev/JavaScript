
function Blob(x,y,r,c) {
  this.pos = createVector(x,y);
  this.r = r;
  this.vel = createVector(0,0);
  var yoff = 0;

  this.show = function() {
   fill(c);
   stroke(c);
   strokeWeight(4);
   ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  this.update = function(){
      var newvel = createVector(mouseX - width/2,mouseY - height/2);
      newvel.div(50);
      newvel.limit(3)
      this.vel.lerp(newvel, 0.2);
      this.pos.add(this.vel);
  }

  this.eat = function(other){
      var d = p5.Vector.dist(this.pos, other.pos);
      if (d < (this.r + other.r)){
          this.r += other.r/10;
          return true;
      }
      return false;
  }

  this.blobby = function(){
    let xoff = 0;
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for(let i = 0; i < TWO_PI; i = i + 0.1){
        let offset = map(noise(xoff, yoff),0, 1, -2, 2);
        let r = this.r + offset;
        let x = r*cos(i);
        let y = r*sin(i);
        vertex(x, y);
        xoff += 0.1;
    }
    endShape();
    pop();
    yoff += 0.1;
  }
}
