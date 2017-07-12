
var nodes = [];


function initNodes(){
  for(var i = 0; i<contributors.length; i++){
    var friend = new Node(contributors[i].name, contributors[i].connections);
    nodes.push(friend);
  }
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // Add an initial set of boids into the system

  //first, make everything
  // var Jahmal = new Node('jahmal', ['lydon']);
  // var Lydon = new Node('lydon', ['jahmal', 'shahira']);
  // var Shahira = new Node('shahira', ['lydon', 'jahmal']);
  // var Dane = new Node('dane', ['lydon', 'jahmal']);

  // nodes = [Jahmal, Lydon, Shahira, Dane];

  // nodes = [Jahmal];


  initNodes();


  for(var i = 0; i<nodes.length; i++){
    nodes[i].initializeLinks();
  }
}

function draw() {
  background(255, 200);
  rejectAll(nodes, 1, 100);
  for(var i = 0; i <nodes.length; i++){
    //console.log('poop')
    //rejectAll(nodes[i].linkedTo, 2, 50);
    nodes[i].loveThyNeighbors(100, -3);
    nodes[i].removeJitters();
    //console.log('pop')
  };


  //flock.run();
  for(var i = 0; i<nodes.length; i++){
    nodes[i].applyForce();
    nodes[i].display();
  }

}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}



function rejectAll(nodes, rForce, rThresh){
   for (var i = 0; i < nodes.length; i++) {
      //console.log('hey')
      for (var j = 0; j < nodes.length; j++) {

        if (i !== j) {

        if(nodes[j].pos.dist(nodes[i].pos)>rThresh){
          //console.log('hey')

           // var newPos = p5.Vector.lerp(nodes[i].pos, nodes[j].pos, rForce/nodes.length);
           // nodes[i].pos = newPos;
           var force = p5.Vector.sub(nodes[i].pos, nodes[j].pos);
           force.normalize();
          nodes[i].addForce(force.mult(rForce));
        }
      }
    }
  }
}


function attractNeighbors(nodes, aForce, aThresh){
 for(var i = 0; i<nodes.length; i++){
   var right = i+1;
   var left = i-1;
   if (right>nodes.length-1){right=0};
   if (left < 0){left = nodes.length-1};
   if(nodes[i].pos.dist(nodes[right].pos)>aThresh){
     // var d = p5.Vector.lerp(nodes[i].pos, nodes[right].pos, aForce);
     // nodes[i].pos = d;
     var force = p5.Vector.sub(nodes[i].pos, nodes[right].pos);
          force.normalize();
          nodes[i].addForce(force.mult(aForce));
   } 
   if (nodes[i].pos.dist(nodes[left].pos)>aThresh){
     // var d = p5.Vector.lerp(nodes[i].pos, nodes[left].pos, aForce);
     // nodes[i].pos = d;
     var force = p5.Vector.sub(nodes[i].pos, nodes[left].pos);
           force.normalize();
          nodes[i].addForce(force.mult(aForce));
   }
 }
}