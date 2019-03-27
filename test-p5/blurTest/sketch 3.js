var wd = 0;
var ht = 0;
const SC_CENTER = 0.5;
const CENTER_X = SC_CENTER;
const CENTER_Y = SC_CENTER;
const NODE_SIZE = 150;
// const SPD_MOD = 0.0001;
const SPD_MOD = 0.00005;
const SPD_MAX = 0.00025;
const AG_NUM = 3;
// const SIZE_MOD = 0.007;
const SIZE_MOD = 0.1;
const AG_NODE_MAX = 9

let agents = [];



function setup() {

  wd = windowWidth;
  ht = windowHeight;
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i<AG_NUM; i++){
    agents[i] = new Agent(i);
  }

}



function draw() {

  background(0);
  fill(255,255,255);

  for(let i = 0; i<AG_NUM; i++){
    agents[i].walk();
    drawAgent(agents[i].position.x, agents[i].position.y, agents[i].size, agents[i]);
  }

}



function drawAgent(x, y, scale, ag) {

  // print(ag.uid);

  push();
  ////////////////////////

  translate( cal_x(x) , cal_y(y) );
  // translate( cal_x(x-CENTER_X) , cal_y(y-CENTER_Y) );
  fill(255,255,255);

  let p1x = 1.0;
  let p1y = -1.0;
  let p1x_scaled = p1x*scale*0.5;
  let p1y_scaled = p1y*scale*0.5;
  ellipse(cal_x(p1x_scaled), cal_y(p1y_scaled), NODE_SIZE*scale, NODE_SIZE*scale);

  let p2x = -1.0;
  let p2y = 1.0;
  let p2x_scaled = p2x*scale*0.5;
  let p2y_scaled = p2y*scale*0.5;
  ellipse(cal_x(p2x_scaled), cal_y(p2y_scaled), NODE_SIZE*scale, NODE_SIZE*scale);


  stroke(255);
  line( cal_x(p1x_scaled), cal_y(p1y_scaled), cal_x(p2x_scaled), cal_y(p2y_scaled) );

  ////////////////////////
  pop();

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






//////////////////////////////////////
class Agent {

  constructor(num){
    this.uid = num;
    this.size = random(0.0 , 1.0) * SIZE_MOD;
    this.position = createVector( random(0.0, 1.0) , random(0.0, 1.0) );
    // this.position = createVector( 0.5 , 0.5 );
    this.spd = createVector( 0.0 , 0.0);

    //Draw
    this.nodes = [AG_NODE_MAX];
    this.node_count = Math.round( random(3,8) );
    for(let i=0; i<this.node_count; i++){

      this.nodes[i] = createVector( random(-1.0 , 1.0) , random(-1.0 , 1.0) );

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
    /////

  }


}

/////////////////////////////////////////
