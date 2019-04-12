// var wd = 0;
// var ht = 0;
// const SC_CENTER = 0.5;
// const CENTER_X = SC_CENTER;
// const CENTER_Y = SC_CENTER;


function test (){

  //Test calcCenter
  let v = [];
  v[0] = createVector(1.0 , 5.0);
  v[1] = createVector(2.0 , 8.0);
  v[2] = createVector(3.0 , -1.0);
  let v2 = Animation.calcCenter(v);
  if( v2.x!=2.0 || v2.y!=4.0)print('ERR :: calcCenter()',v2.x,v2.y);
  else print('calcCenter OK');


  //Test Centering
  let v3 = Animation.centering(v);
  if( v3[0].x!= (-1.0) || v3[0].y!= 1.0)print('ERR :: v3[0] :: centering()',v3[0].x,v3[0].y);
  else if( v3[1].x!= 0.0 || v3[1].y!= 4.0)print('ERR :: v3[1] :: centering()',v3[1].x,v3[1].y);
  else if( v3[2].x!= 1.0 || v3[2].y!= -5.0)print('ERR :: v3[2] :: centering()',v3[2].x,v3[2].y);
  else print('centering() is OK');


}


function setup() {


  scSetupAuto ();
  ag = new Agent(0);
  ag.size = ag.size*3.;

  ag2 = new Agent(1);
  ag2.size = ag2.size*3.;

  test();

}



function draw() {

  // print(ag.node_seeds[0].x);

  background(20);
  let tmp = new CustomEvent('/draw_agent');
  ag.position.x = 0.5;
  ag.position.y = 0.5;
  tmp.ag = ag;

  document.dispatchEvent(tmp);

  ag2.position.x = 0.25;
  ag2.position.y = 0.25;
  tmp.ag = ag2;
  document.dispatchEvent(tmp);

}



function touchEnded() {

  print('touch!!');

  ag.size = ag.size*1.1;
  ag2.size = ag2.size*1.1;


  let nodes = [];
  nodes.push( createVector(1.0 , 1.0) );
  nodes.push( createVector(1.0 , -1.0) );
  nodes.push( createVector(-1.0 , -1.0) );
  nodes.push( createVector(-1.0 , 1.0) );
  // ag.updateNodes(nodes);
  nodes = Animation.centering(nodes);

  let edges = [];
  for(let i=0; i<4; i++){
    let obj = new Object();
    obj.node_id_st = i;
    obj.node_id_ed = i+1;

    if(i==3)obj.node_id_ed = 0;
    edges.push(obj);
  }
  // ag.updateEdges(edges);
  ag.updateShape(nodes,edges);

  ag2.nodes = Animation.centering(ag2.nodes);


}
