var wd = 0;
var ht = 0;
const SC_CENTER = 0.5;
const CENTER_X = SC_CENTER;
const CENTER_Y = SC_CENTER;
const NODE_SIZE = 80;
// const SPD_MOD = 0.0001;
const SPD_MOD = 0.00005;
const SPD_MAX = 0.00025;
const AG_NUM = 9;
//const SIZE_MOD = 0.03;
const SIZE_MOD = 0.03;
const AG_NODE_MAX = 7;
const AG_NODE_MIN = 3;
const AG_ANIM_SPD = 0.03; //0.03
const AG_ANIM_LIM = 5.0;

let agents = [];

function test(){

  if(scale2amp(1.0)!=1.0){

    print('ERR:scale2amp');

  } else if(scale2amp(0.0) != -1.0 ){

    print('ERR:scale2amp');

  }else if(scale2amp(0.5) != 0.0 ){

    print('ERR:scale2amp');

  }else{

    print('scale2amp is OK')

  }

}

function setup() {

  wd = windowWidth;
  ht = windowHeight;
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i<AG_NUM; i++){
    agents[i] = new Agent(i);
  }

  test();
  // print(noise(0.5));

}



function draw() {

  background(20);
  // fill(255,255,255);

  for(let i = 0; i<AG_NUM; i++){
    agents[i].walk();
    drawAgent(agents[i].position.x, agents[i].position.y, agents[i].size, agents[i]);
  }

  //COLOR TEST
  // let c = color(255, 204, 0);
  // fill(c);
  // square(cal_x(0.5)-100,cal_y(0.5)-100,200);


}



function cal_x(x) {

  return x*wd;

}



function cal_y(y) {

  return y*ht;

}



function calVel(vel){

   vel.add( createVector( (random(-1,1)*SPD_MOD) , (random(-1,1)*SPD_MOD) ) );

   //SPD Limitter
   if(vel.x>SPD_MAX){

     vel.x = SPD_MAX;
     // print('LIM_A : ' + vel.x);

   }else if(vel.x <= (SPD_MAX*-1) ){

     vel.x = (SPD_MAX*-1);
     // print('LIM_B : ' + vel.x);

   }else{

     // print('LIM_ZERO1 : ' + vel.x);

   }

   if(vel.y>SPD_MAX){

     vel.y = SPD_MAX;
     // print('LIM_C : ' + vel.y);

   }else if(vel.y <= (SPD_MAX*-1) ){

     vel.y = (SPD_MAX*-1);
     // print('LIM_D : ' + vel.y);

   }else{

     // print('LIM_ZERO2 : ' + vel.y);

   }

   return vel;

}

//Convert param from 0-1 to -1 to 1
function scale2amp(val){

  return amp = (val - 0.5)*2.0;

}



//////////////////////////////////////



function drawAgent(x, y, scale, ag) {



  push();
  ////////////////////////



  translate( cal_x(x) , cal_y(y) );
  //square(0,0,NODE_SIZE*scale);

  //COLOR TEST
  // let c = color(255, 204, 0);
  // fill(c);
  // fill(0, 0, 200);
  // noStroke();
  // square(cal_x(0)-20,cal_y(0)-20,40);

  // ellipse(cal_x(0), cal_y(0), 30, 30);


  // Draw Nodes
  for(let i=0; i<ag.node_count;i++){

    let p1x = ag.nodes[i].x;
    let p1y = ag.nodes[i].y;
    let p1x_scaled = p1x*scale*0.5;
    let p1y_scaled = p1y*scale*0.5;


    noStroke();
    //COLOR TEST
    fill(ag.color);
    ellipse(cal_x(p1x_scaled), cal_y(p1y_scaled), NODE_SIZE*scale, NODE_SIZE*scale);

    stroke(ag.color);
    if(i!=0){

      p2x_scaled = ag.nodes[(i-1)].x*scale*0.5;
      p2y_scaled = ag.nodes[(i-1)].y*scale*0.5;
      line( cal_x(p1x_scaled), cal_y(p1y_scaled), cal_x(p2x_scaled), cal_y(p2y_scaled) );

    }

  }

  ////////////////////////
  pop();

}



//////////////////////////////////////
class Agent {

  constructor(num){
    this.uid = num;
    this.size = random(0.01 , 1.0) * SIZE_MOD;
    this.position = createVector( random(0.0, 1.0) , random(0.0, 1.0) );
    // this.position = createVector( 0.5 , 0.5 );
    this.spd = createVector( 0.0 , 0.0);
    this.color = color( random(0,255) , random(0,255) , random(0,255) );

    //Draw
    this.nodes = [AG_NODE_MAX];
    this.node_seeds = [AG_NODE_MAX]; //make seeds for animation
    this.node_count = Math.round( random(AG_NODE_MIN , AG_NODE_MAX) );
    for(let i=0; i<this.node_count; i++){
      this.nodes[i] = createVector( random(-1.0 , 1.0) , random(-1.0 , 1.0) );
      this.node_seeds[i] = createVector( random(0.0 , 1.0) , random(0.0 , 1.0) );
    }


  }


  walk(){
    /////
    this.spd = calVel(this.spd);
    this.position.add(this.spd);

    //Limitter
    if(this.position.x>1.0){
      this.position.x = 0.0;
    }else if(this.position.x<0.0){
      this.position.x = 1.0;
    }

    if(this.position.y>1.0){
      this.position.y = 0.0;
    }else if(this.position.y<0.0){
      this.position.y = 1.0;
    }

    //Update node positions
    this.updateNodesPosition();
    /////
  }


  updateNodesPosition(){

    for(let i=0; i<this.node_count; i++){

      this.nodes[i].x += ( scale2amp( noise(this.node_seeds[i].x) )*AG_ANIM_SPD );
      this.nodes[i].y += ( scale2amp( noise(this.node_seeds[i].y) )*AG_ANIM_SPD );
      this.node_seeds[i].x += random(0.01, 0.04);
      this.node_seeds[i].y += random(0.01, 0.04);

      // if(this.node_seeds[i].x > AG_ANIM_LIM){
      //   this.node_seeds[i].x = 0.0;
      //   print('L1');
      // }
      // if(this.node_seeds[i].y > AG_ANIM_LIM){
      //   this.node_seeds[i].y = 0.0;
      //   print('L2');
      // }

    }

  }


} //End of class

/////////////////////////////////////////
