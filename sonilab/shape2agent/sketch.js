let nodes = [];
let edges = [];
let shape_color = null;

function test(){

  //Creating Shape


  addNodes();
  addNodes();
  addNodes();
  addNodes();
  addNodes();

  addEdges();
  addEdges();
  addEdges();
  addEdges();
  addEdges();

  let dat = new Shape(nodes, edges, shape_color);

  //Create CustomEvent to convert to agent
  tmp = new CustomEvent('/convert_to_agent');
  tmp.shape = dat;
  document.dispatchEvent(tmp);

}


function preload() { //SOUND Loading


}



function setup() {


//     scSetupAuto ();
    Shape2Agent.setup();
    scSetupSemiAuto(SC_SIZE.IPHONE_X);

    shape_color = color(255, 255, 255);
    test();

}



function draw() {

    background(20);
    checkScreen(true);

}



function touchEnded() {

  print('touch');

}



function deviceTurned(){

  // print("turned!!");
  setTimeout(scSetupAuto, 3000);
  // scSetupAuto();
  cl = color(random(0,255) , random(0,255) , random(0,255));
  // color = 255;

}


function addNodes(){

  nodes.push( createVector(1.0, 1.0) );
  nodes.push( createVector(1.0, -1.0) );
  nodes.push( createVector(-1.0, -1.0) );
  nodes.push( createVector(-1.0, 1.0) );

}

function addEdges(){

  edges.push( {node_id_st:0 , node_id_ed:1} );
  edges.push( {node_id_st:1 , node_id_ed:2} );
  edges.push( {node_id_st:2 , node_id_ed:3} );
  edges.push( {node_id_st:3 , node_id_ed:0} );


}




//////////////////////////////////////
