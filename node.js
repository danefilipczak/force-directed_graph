//dance, bacchusaur-rex, war, shanty, byrd, merri itist 

brake = false;

var Node = function(name, connections) {
  this.force = createVector(0, 0);
  this.pos = new p5.Vector(random(width), random(height));
  this.ping = false;
  this.pingCounter=0;
  this.pingLength;
  this.name = name;
  this.w = 100;
  this.h = 50;
  this.crowded = false;
  this.note;
  this.instrument;
  this.connections = connections;
  this.linkedTo = [];
  this.show=false;
  this.proteanCount = 0;
  this.velocity = new p5.Vector(0, 0, 0);
  this.lock = false;
  this.maxSpeed = 12;
  // this.b = 255;
  // this.d = 10;
  this.drag = 0.95;
  this.strength = 0.5;


  this.escapeVector = p5.Vector.random2D(); //if I need to escape, this is the direction I'll run. Protean graphs?

  //this.escapeVector = new p5.Vector(-0.1, 0, 0)
    this.displayBox = function(){
      //draw a circle at the node's position with diameter of 10
      
      // if(this.show){
      //   if(this.ping){
          
      //     fill(this.b);
      //     this.b-=3;
      //     this.d-=0.03
          
      //   } else {
      //     fill(0);
      //     this.d = 10;
      //   };
      rectMode(CENTER);
      strokeWeight(1);
      noStroke();
      // stroke(255)
      
      fill(0);
      // if(this.crowded){fill(200, 200, 100)}
      rect(this.pos.x, this.pos.y, this.w, this.h);
      

        //ellipse(this.pos.x, this.pos.y, this.d, this.d);
  };


  this.displayText = function(){
    noStroke();
      fill(255)
      textAlign(CENTER, CENTER)
      textSize(20);
      text(this.name, this.pos.x, this.pos.y, 100, 20);
  }





   this.addForce = function(forceVector) {
      if(!this.lock){
        this.force.add(forceVector);
      }
      
  }




  this.applyForce = function(){ 
      if(!this.lock){
         target = p5.Vector.add(this.pos, this.force);

        if(brake){target = this.pos};
        //target = this.force;
        //target = new p5.Vector(mouseX, mouseY);
        var force = p5.Vector.sub(target, this.pos);
        force.mult(this.strength);
        this.velocity.mult(this.drag);
        this.velocity.add(force);

        //this.pos = this.velocity;
        this.velocity.limit(this.maxSpeed);
        this.pos.add(this.velocity);
        this.force = createVector(0, 0);
      }

     
  }

};

Node.prototype.edges = function(){
  var margin = 10;
  if(this.pos.x<margin){
    this.pos.x = margin;
  } else if (this.pos.x>width-margin){
    this.pos.x = width-margin;
  } 
  if (this.pos.y<margin){
    this.pos.y = margin;
  } else if (this.pos.y>height-margin){
    this.pos.y = height-margin;
  }
}


Node.prototype.flee = function(force){
  this.proteanCount++;
  if(this.proteanCount>120){
    this.escapeVector = p5.Vector.random2D();
    this.proteanCount = 0;
  }
  force = force || 1;
  this.addForce(this.escapeVector.mult(force))
}

Node.prototype.intersects = function(otherNode){
  //remember we're doing rectMode(CENTER) 
  var ww = this.w*2
  var hh = this.h*2
  var a = this.pos;
  var b = otherNode.pos;

  //if(b.x<a.x-this.h||b.x)
  return b.x>a.x-ww&&b.x<a.x+ww&&b.y>a.y-hh&&b.y<a.y+hh;
}




Node.prototype.initializeLinks = function(array){
  array = this.connections;
  this.linkedTo = [];
  for(var i = 0; i<array.length;i++){
    //find node with the same name and add it to this guy's list of connections
    for(var j = 0; j<nodes.length; j++){
      if(nodes[j].name == array[i]){
        this.linkedTo.push(nodes[j]);
      }
    }
  }
};


Node.prototype.mouseIntersects = function(mouseX, mouseY){
  var mx = mouseX;
  var my = mouseY;
  var p = this.pos;
  var hw = this.w/2;
  var hh = this.h/2;
  return(mx>p.x-hw&&mx<p.x+hw&&my>p.y-hh&&my<p.y+hh);
}

Node.prototype.center = function(strength){
  var force = p5.Vector.sub(this.pos, new p5.Vector(width/2, height/2));
  force.normalize();
  this.addForce(force.mult(strength));
}


Node.prototype.loveThyNeighbors = function(aThresh, aForce){
  for(var i = 0; i<this.linkedTo.length;i++)
  if(this.pos.dist(this.linkedTo[i].pos)>aThresh){
     var force = p5.Vector.sub(this.pos, this.linkedTo[i].pos);
      force.normalize();
      this.addForce(force.mult(aForce));
  }
}

Node.prototype.removeJitters = function(val){
  if(p5.Vector.mag(this.force)<val){
    this.force = new p5.Vector(0, 0);
  }
}
// }