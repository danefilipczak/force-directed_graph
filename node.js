//dance, bacchusaur-rex, war, shanty, byrd, merri itist 

var Node = function(name, connections) {
  this.force = createVector(0, 0);
  this.pos = new p5.Vector(random(width), random(height));
  this.ping = false;
  this.pingCounter=0;
  this.pingLength;
  this.name = name;
  this.note;
  this.instrument;
  this.connections = connections;
  this.linkedTo = [];
  this.show=false;
  this.b = 255;
  this.d = 10;
    this.display = function(){
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
      
      stroke(0)
      for(var i = 0; i<this.linkedTo.length; i++){
        line(this.pos.x, this.pos.y, this.linkedTo[i].pos.x, this.linkedTo[i].pos.y);
      }
      fill(255);
      rect(this.pos.x, this.pos.y, 100, 20);
      noStroke();
      fill(0)
      textAlign(CENTER, CENTER)
      text(this.name, this.pos.x, this.pos.y, 100, 20);

        //ellipse(this.pos.x, this.pos.y, this.d, this.d);
  };





   this.addForce = function(forceVector) {
      this.force.add(forceVector);
  }


  this.applyForce = function(){ 
      this.pos.add(this.force);
      this.force = createVector(0, 0);
  }

  // this.pinged = function(){
  //   this.ping = true;
  //   this.show = true;
  //   this.pingLength=random(10, 30);
  //   //this.b = random(255);
  //   this.note = random(notes);
  //   this.d=16.18 
  //   //console.log(this.pos);

  //   if(this.pos.x>width/4){
  //     this.note+=12;
  //   } else if(this.pos.x<-width/4){
  //     this.note-=12;
  //   };
  //   this.instrument = random(availableInstruments);
  //   if(loaded){this.instrument.play(this.note, ac.currentTime, { gain: 1/(flower.queue.length), duration: 0.2})};//
  // }
};



// // Spring simulation variables
// // var ps = R,   // Position
// //     vs = 0.0, // Velocity
// //     as = 0,   // Acceleration
// //     f = 0;    // Force


// // Spring simulation constants
// var M = 0.8,  // Mass
//     K = 0.2,  // Spring constant
//     D = 0.92, // Damping
//     R = 150;  // Rest position

// function Node(name, connected) {
//   this.acceleration = createVector(0,0);
//   //this.velocity = createVector(random(-1,1),random(-1,1));
//   this.velocity = new p5.Vector(0, 0);
//   this.position = createVector(random(width),random(height));
//   this.r = 3.0;
//   this.maxspeed = 1;    // Maximum speed
//   this.maxforce = 0.2; // Maximum steering force
//   this.connected = connected;
//   this.connections = [];
//   this.name = name;
//   //

//   //this.initializeLinks(connected);



//   this.run = function(nodes) {
//     this.forces(nodes);
//     this.update();
//     this.borders();
//     this.render();
//   };

//   this.applyForce = function(force) {
//     // We could add mass here if we want A = F / M
//     this.acceleration.add(force);
//   };

//   // We accumulate a new acceleration each time based on three rules
//   this.forces = function(nodes) {
//       // Separation
//     //var ali = this.align(nodes);      // Alignment

//     //this.arrive(this.connections);

//     //this.spring(new p5.Vector(0, 0, 0));
//     for(var i = 0; i<this.connections.length;i++){
//       this.spring(this.connections[i].position);
//     }

//     //this.spring(new p5.Vector(width/2, height/2))
//     // for(var i = 0; i<this.connections.length; i++){
//     //   var coh = this.cohesion(this.connections[i].position); 
//     //   coh.mult(2);
//     //   this.applyForce(coh);
//     // };
//     // var coh =this.cohesion(this.connections);
//     // coh.mult(3);
//     // this.applyForce(coh);
//       // Cohesion
//     // Arbitrarily weight these forces
//     // var sep = this.separate(nodes); 
//     // sep.mult(1);
//     // this.applyForce(sep);

//     // var arr = this.arrive(this.connections);
//     // arr.mult(1);
//     // this.applyForce(arr);
//     //ali.mult(1.0);
    
//     // Add the force vectors to acceleration
   
//     //this.applyForce(ali);
    
//   };

//   this.spring = function(vec){
//     var distance = 20;
//     if(p5.Vector.dist(vec, this.position)>distance){
//         var desired = p5.Vector.sub(this.position, vec);
//       desired.mult(-K);
//       force = desired;
//       force.mult(D);
//       //if(force.mag()<10){force = new p5.Vector(0, 0, 0)}
//       this.applyForce(force);
//     }
  



//     // f = -K * ( ps - R ); // f=-ky
//     // as = f / M;          // Set the acceleration, f=ma == a=f/m
//     // vs = D * (vs + as);  // Set the velocity
//     // ps = ps + vs;        // U
//   }

//   this.arrive=function(others){

//     var minDist = 50;
//     for(var i = 0; i<others.length; i++){
//       var dist = this.position.dist(others[i].position);
//       if(dist>minDist){
//         var desired = p5.Vector.sub(others[i].position,this.position);
//         desired.normalize();
//         desired.mult(dist)
//         desired.mult(this.maxspeed);
//         this.applyForce(desired);
//       }
//     }

//   }

//   // Method to update location
//   this.update = function() {
//     // Update velocity
//     this.velocity.add(this.acceleration);
//     // Limit speed
//     this.velocity.limit(this.maxspeed);
//     this.position.add(this.velocity);
//     // Reset accelertion to 0 each cycle
//     this.acceleration.mult(0);
//   };

//   // A method that calculates and applies a steering force towards a target
//   // STEER = DESIRED MINUS VELOCITY
//   this.seek = function(target) {
//     var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
//     // Normalize desired and scale to maximum speed
    
//     // Steering = Desired minus Velocity
//     var steer = p5.Vector.sub(desired,this.velocity);
//     steer.limit(this.maxforce);  // Limit to maximum steering force
//     return steer;
//   };

//   this.render = function() {
//     // Draw a triangle rotated in the direction of velocity
//     var theta = this.velocity.heading() + radians(90);
//     fill(127);
//     stroke(200);
//     push();
//     translate(this.position.x,this.position.y);
//     rotate(theta);
//     // beginShape();
//     // vertex(0, -this.r*2);
//     // vertex(-this.r, this.r*2);
//     // vertex(this.r, this.r*2);
//     // endShape(CLOSE);
//     textSize(20)
//     text(this.name, 0, 0)
//     pop();

//     for(var i = 0; i<this.connections.length; i++){
//       line(this.position.x, this.position.y, this.connections[i].position.x, this.connections[i].position.y)
//     }
//   };

//   // Wraparound
//   this.borders = function() {
//     if (this.position.x < -this.r)  this.position.x = width +this.r;
//     if (this.position.y < -this.r)  this.position.y = height+this.r;
//     if (this.position.x > width +this.r) this.position.x = -this.r;
//     if (this.position.y > height+this.r) this.position.y = -this.r;
//   };

//   // Separation
//   // Method checks for nearby boids and steers away
//   this.separate = function(boids) {
//     var desiredseparation = 25.0;
//     var steer = createVector(0,0);
//     var count = 0;
//     // For every boid in the system, check if it's too close
//     for (var i = 0; i < boids.length; i++) {
//       var d = p5.Vector.dist(this.position,boids[i].position);
//       // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
//       if ((d > 0) && (d < desiredseparation)) {
//         // Calculate vector pointing away from neighbor
//         var diff = p5.Vector.sub(this.position,boids[i].position);
//         diff.normalize();
//         diff.div(d);        // Weight by distance
//         steer.add(diff);
//         count++;            // Keep track of how many
//       }
//     }
//     // Average -- divide by how many
//     if (count > 0) {
//       steer.div(count);
//     }

//     // As long as the vector is greater than 0
//     if (steer.mag() > 0) {
//       // Implement Reynolds: Steering = Desired - Velocity
//       steer.normalize();
//       steer.mult(this.maxspeed);
//       steer.sub(this.velocity);
//       steer.limit(this.maxforce);
//     }
//     return steer;
//   };

//   // Alignment
//   // For every nearby boid in the system, calculate the average velocity
//   this.align = function(boids) {
//     var neighbordist = 50;
//     var sum = createVector(0,0);
//     var count = 0;
//     for (var i = 0; i < boids.length; i++) {
//       var d = p5.Vector.dist(this.position,boids[i].position);
//       if ((d > 0) && (d < neighbordist)) {
//         sum.add(boids[i].velocity);
//         count++;
//       }
//     }
//     if (count > 0) {
//       sum.div(count);
//       sum.normalize();
//       sum.mult(this.maxspeed);
//       var steer = p5.Vector.sub(sum,this.velocity);
//       steer.limit(this.maxforce);
//       return steer;
//     } else {
//       return createVector(0,0);
//     }
//   };

//   // Cohesion
//   // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
//   this.cohesion = function(boids) {
//     var neighbordist = 50;
//     var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
//     var count = 0;
//     for (var i = 0; i < boids.length; i++) {
//       var d = p5.Vector.dist(this.position,boids[i].position);
//       if ((d > 0) && (d < neighbordist)) {
//         sum.add(boids[i].position); // Add location
//         count++;
//       }
//     }
//     if (count > 0) {
//       sum.div(count);
//       return this.seek(sum);  // Steer towards the location
//     } else {
//       return createVector(0,0);
//     }
//   };
// }



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


Node.prototype.loveThyNeighbors = function(aThresh, aForce){
  for(var i = 0; i<this.linkedTo.length;i++)
  if(this.pos.dist(this.linkedTo[i].pos)>aThresh){
     var force = p5.Vector.sub(this.pos, this.linkedTo[i].pos);
      force.normalize();
      this.addForce(force.mult(aForce));
  }
}

Node.prototype.removeJitters = function(){
  if(p5.Vector.mag(this.force)<1.1){
    this.force = new p5.Vector(0, 0);
  }
}
// }