var wd = 0;
var ht = 0;
const SC_CENTER = 0.5;
const CENTER_X = SC_CENTER;
const CENTER_Y = SC_CENTER;

//Drone Length
var PLAY_DUR = 8000;



////////////////////////////////////////////////////


function test(){


}


function preload() { //SOUND Loading


}



function setup() {

  wd = windowWidth;
  ht = windowHeight;
  createCanvas(windowWidth, windowHeight);
  test();
  Scene.setup();
}



function draw() {

  background(20);
  Scene.update();
  Scene.draw();

}


function touchEnded() {

  print(me);

  if(layer[1]){
    print('touch');
    let mes = '/bang ' + me + " " +PLAY_DUR;
    print('---');
    print(mes);
    connection.send(mes);
  }
  // var mes = '/ch1 0 1'
  // connection.send(mes);


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

   }else if(vel.x <= (SPD_MAX*-1) ){

     vel.x = (SPD_MAX*-1);

   }else{


   }

   if(vel.y>SPD_MAX){

     vel.y = SPD_MAX;

   }else if(vel.y <= (SPD_MAX*-1) ){

     vel.y = (SPD_MAX*-1);

   }else{


   }

   return vel;

}



function mouseClicked() {

  print('mouse clicked')
  // var mes = '/ch1 0 1'
  // connection.send(mes);

}

//////////////////////////////////////
