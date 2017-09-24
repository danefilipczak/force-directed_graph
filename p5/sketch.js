
var nodes = [];

var current = "";

var prelude = true;

function initNodes(){
  for(var i = 0; i<contributors.length; i++){
    if(contributors[i].name){ //if it's a valid contributor object
      var friend = new Node(contributors[i].name, contributors[i].connections);
      nodes.push(friend);
    }
    
  }
}

function drawEdges(){
  strokeWeight(12);
  stroke(255, 255, 0, 100);
  for(var i = 0; i<nodes.length;i++){
    var n = nodes[i];
     for(var j = 0; j<n.linkedTo.length; j++){

        line(n.pos.x, n.pos.y, n.linkedTo[j].pos.x, n.linkedTo[j].pos.y);
      }

  }
  //console.log('deg')
 
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  background(0);
  textFont("Monospace");

  //make node objects 
  initNodes();

  //link them up to their friends
  for(var i = 0; i<nodes.length; i++){
    nodes[i].initializeLinks();
  }

  setTimeout(function(){brake = true;
    prelude = false;
    setInterval(function(){
      brake = false;
      prelude = true;
      setTimeout(function(){
        brake=true;
        prelude = false;
      }, 500)
    }, 7000)
  }, 2000)
}


function updateDiv(current){
  document.getElementById("info").innerHTML = "some info about <h2>" + current + "</h2>";
}

function draw() {

  background(0, 200);
  rejectAll(nodes, 1, 200);
  if(!prelude){brake = true;}
  var intersects = [];
  for(var i = 0; i <nodes.length; i++){
    nodes[i].lock=false;

    if(nodes[i].mouseIntersects(mouseX, mouseY)){
      brake = false;
      //nodes[i].lock = true;
      intersects.push(nodes[i]);

      //alert('inter')
    }
    if (intersects.length>=1){
      intersects[0].lock = true;
      brake = false;
      if(intersects[0].name !== current){
        current = intersects[0].name;
        updateDiv(current);
      }
    } 


    //console.log('poop')
    //rejectAll(nodes[i].linkedTo, 6, 200);
    //nodes[i].loveThyNeighbors(300, -4);
    nodes[i].center(-3);
    // nodes[i].crowded = false;
    // nodes[i].edges();
    // for(var j = 0; j<nodes.length; j++){
    //   if(nodes[j].intersects(nodes[i]) && nodes[j]!==nodes[i]){
    //     var fleeForce = 1;
    //     nodes[j].flee(fleeForce);
    //     // nodes[j].proteanCount++;
    //     // nodes[i].proteanCount++;
    //     nodes[i].flee(fleeForce);
    //     nodes[i].crowded = true;
    //     //console.log('fa')
    //   } 
    // }
    // nodes[i].removeJitters(0.1);
    //console.log('pop')
  };
  

  drawEdges();

  //flock.run();
  for(var i = 0; i<nodes.length; i++){
    nodes[i].displayBox();
    
    //nodes[i].applyForce();
    
  }
  
   for(var i = 0; i<nodes.length; i++){
    nodes[i].displayText();
    
    
    nodes[i].applyForce();
    
  }



}


function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight)
}



function rejectAll(nodes, rForce, rThresh){
   for (var i = 0; i < nodes.length; i++) {
      //console.log('hey')
      for (var j = 0; j < nodes.length; j++) {

        if (nodes[i] !== nodes[j]) {

        if(nodes[j].pos.dist(nodes[i].pos)<rThresh){
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