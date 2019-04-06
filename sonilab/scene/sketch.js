var wd = 0;
var ht = 0;
const SC_CENTER = 0.5;
const CENTER_X = SC_CENTER;
const CENTER_Y = SC_CENTER;


function test(){



}


function preload() { //SOUND Loading


}



function setup() {



  test();
  Scene.setup();

  let bt_count = 0;
  let OFF_SET = 0.1

  let button1 = createButton('1');
  button1.position(cal_x(0.5) , cal_y(0.25*bt_count+OFF_SET));
  button1.mousePressed(layer1_toggle);
  bt_count++;

  let button2 = createButton('2');
  button2.position(cal_x(0.5) , cal_y(0.25*bt_count+OFF_SET));
  button2.mousePressed(layer2_toggle);
  bt_count++;

}



function draw() {

  background(20);
  Scene.update();
  Scene.draw();

  // fill(255,255,255);

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


function layer1_toggle(){

  layer[0]= !layer[0];

}

function layer2_toggle(){

  layer[1]= !layer[1];

}

//////////////////////////////////////
