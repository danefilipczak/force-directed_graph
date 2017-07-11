
var nodes = [];


function setup() {
  createCanvas(640,360);
  // Add an initial set of boids into the system

  //first, make everything
  var Jahmal = new Node('jahmal', ['lydon', 'shahira']);
  var Lydon = new Node('lydon', ['jahmal', 'shahira']);
  var Shahira = new Node('shahira', ['lydon', 'jahmal']);

  nodes = [Jahmal, Lydon, Shahira];

  for(var i = 0; i<nodes.length; i++){
    nodes[i].initializeLinks();
  }
}

function draw() {
  background(51);
  //flock.run();
  for(var i = 0; i<nodes.length; i++){
    nodes[i].run(nodes);
  }
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}