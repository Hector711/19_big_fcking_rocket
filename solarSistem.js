
function Body(_mass,_pos,_vel) {
  this.mass = _mass,
  this.pos= _pos,
  this.vel = _vel,
  this.r = this.mass,
  this.path = [],

  this.show = function(){
    noStroke(); fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    stroke(30);
    for (let i = 0; i < this.path.length - 2; i++) {
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y)
    }
  }
  this.update = function(){
    // update the position
    this.pos.x += this.vel.x 
    this.pos.y += this.vel.y 
    this.path.push(this.pos.copy())
    if(this.path.length > 100) { // keep path at constant length
      this.path.splice(0, 1)
    }
  }
  this.applyForce = function(f){
    this.vel.x += f.x/this.mass // f = ma => a = f/m
    this.vel.y += f.y/this.mass // f = ma => a = f/m
  }

  this.attract = function(child){
    let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y)
    let f = this.pos.copy().sub(child.pos);
    
    f.setMag(G*this.mass*child.mass /(r*r));
    child.applyForce(f);
  }
}