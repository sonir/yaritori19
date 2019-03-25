//SCREEN MNG
var wd = 0;
var ht = 0;
const SC_CENTER = 0.5;
const CENTER_X = SC_CENTER;
const CENTER_Y = SC_CENTER;


//ANIMATION
const AG_NUM = 128; //Max
const NODE_SIZE = 80;
const SIZE_MOD = 0.03;
const Y_OFFSET = 0.05;
const LINE_HEIGHT = 0.2;
const GOAL_LINE_X = 0.8;
const GOAL_LINE_Y = 1.0;


//const SIZE_MOD = 0.03;
const AG_NODE_MAX = 7;
const AG_NODE_MIN = 3;
const AG_ANIM_SPD = 0.03; //0.03
const AG_ANIM_LIM = 5.0;

//TIMER SETTING
const DURATION_MS = 2000.0;
const TICK = 1.0/DURATION_MS;

//Performers
const PF = 0;
const TB = 1;
const GT = 2;
const BA = 3;
PERFORMER_NUM = 4;
//Event trigger circle
EV_NAME_TRG = '/ch6';


let agents = [];
touched = false;
let ag_count = 0;

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



function preload() { //SOUND Loading
}



function setup() {

  wd = windowWidth;
  ht = windowHeight;
  createCanvas(windowWidth, windowHeight);

  born_ms = millis();
  for(let i = 0; i<AG_NUM; i++){
    agents[i] = new Agent(i,born_ms);
  }

  test();
}



function draw() {

  background(20);
    stroke(255);
    line(cal_x(GOAL_LINE_X),0, cal_x(GOAL_LINE_X),cal_y(GOAL_LINE_Y));

    noStroke();
  for(let i = 0; i<AG_NUM; i++){
    agents[i].walk();
    drawAgent(agents[i].position.x, agents[i].position.y, agents[i].size, agents[i]);
  }

}


function touchEnded() {

  print('touch');

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


//Trigger new agent
function trigger(bank, fval){

  print('>>>' + bank + ' , ' + fval);
  // agents[ag_count%AG_NUM].update( int(random(0,PERFORMER_NUM)) );
  agents[ag_count%AG_NUM].update( bank );
  ag_count += 1;

}


// function trigger(e){
//
//   print('>>>' + e.bank + ' , ' + e.fval);
//   agents[ag_count%AG_NUM].update( int(random(0,PERFORMER_NUM)) );
//   ag_count += 1;
//
// }
// document.addEventListener(EV_NAME_TRG, trigger);


//////////////////////////////////////



function drawAgent(x, y, scale, ag) {



  push();
  ////////////////////////



  translate( cal_x(x) , cal_y(y) );
  //square(0,0,NODE_SIZE*scale);



    fill(ag.color);
    ellipse(cal_x(x), cal_y(y), NODE_SIZE, NODE_SIZE);


  ////////////////////////
  pop();

}



//////////////////////////////////////
class Agent {

  constructor(num, born_time){
    this.born_ms = born_time - (DURATION_MS*2);
    this.uid = num;
    this.size = 0.5 * SIZE_MOD;
    this.position = createVector( 0.0 , 0.2 );
    // this.position = createVector( 0.5 , 0.5 );
    this.spd = createVector( 0.0 , 0.0);
    // this.color = color( random(0,255) , random(0,255) , random(0,255) );
    this.color = color( 255 , 255,  255);

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
    // this.spd = calVel(this.spd);
    var now = millis() - this.born_ms;
    this.position.x = now*TICK;

    /////
  }

  update(performer){

    //Update timer for move
    this.born_ms = millis();

    //Set Color and Y posi by performer
    switch( performer ){

      case PF:
        this.color = color(255,0,0);
        this.position.y = (PF*LINE_HEIGHT+Y_OFFSET);
        break;

      case TB:
        this.color = color(0,255,0);
        this.position.y = (TB*LINE_HEIGHT+Y_OFFSET);
        break;

      case GT:
        this.color = color(0,0,255);
        this.position.y = (GT*LINE_HEIGHT+Y_OFFSET);
        break;

      case BA:
        this.color = color(255,255,0);
        this.position.y = (BA*LINE_HEIGHT+Y_OFFSET);
        break;

      default:
        print("ERR :: UNKNOWN PERFORMER.");

    }

/*     if(this.position.x > GOAL_LINE_X){

         this.color = color(255,255,255);

    }
 */


  }

} //End of class

/////////////////////////////////////////
