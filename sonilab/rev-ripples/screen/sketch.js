
var cl = null;
function test(){

  let rst;
  rst = cal_deg(0, 0, 0.5, 0.5);
  if(rst != 45) print("ERR!!" , rst);
  rst = cal_deg(0, 0, 0.0, 1.0);
  if(rst != 0) print("ERR!!" , rst);
  rst = cal_deg(0, 0, 1.0, 0.0);
  if(rst != 90) print("ERR!!" , rst);
  rst = cal_deg(0, 0, 1.0, -1.0);
  if(rst != 135) print("ERR!!" , rst);
  rst = cal_deg(0, 0, 0.0, -1.0);
  if(rst != 180) print("ERR!!" , rst);
  rst = cal_deg(0, 0, -1.0, -1.0);
  if(rst != 225) print("ERR!!" , rst);
  rst = cal_deg(0, 0, -1.0, 0.0);
  if(rst != 270) print("ERR!!!" , rst);
  rst = cal_deg(0, 0, -1.0, 1.0);
  if(rst != 315) print("ERR!!!" , rst);

  rst = cal_pos(45, 1.0);
  if(Math.round(rst.x*100)/100 != 0.71) print("cal_pos45.x::ERR" , Math.round(rst.x*100)/100);
  if(Math.round(rst.y*100)/100 != 0.71) print("cal_pos45.y::ERR" , Math.round(rst.y*100)/100);

  rst = cal_pos(180, 1.0);
  if(Math.round(rst.x*100)/100 != 0.0) print("cal_pos45.x::ERR" , Math.round(rst.x*100)/100);
  if(Math.round(rst.y*100)/100 != -1) print("cal_pos45.y::ERR" , Math.round(rst.y*100)/100);

  rst = cal_pos(225, 1.0);
  if(Math.round(rst.x*100)/100 != -0.71) print("cal_pos45.x::ERR" , Math.round(rst.x*100)/100);
  if(Math.round(rst.y*100)/100 != -0.71) print("cal_pos45.y::ERR" , Math.round(rst.y*100)/100);

  rst = cal_pos(270, 2.0);
  if(Math.round(rst.x*100)/100 != -2.0) print("cal_pos45.x::ERR" , Math.round(rst.x*100)/100);
  if(Math.round(rst.y*100)/100 != -0.0) print("cal_pos45.y::ERR" , Math.round(rst.y*100)/100);

  rst = cal_pos(315, 3.0);
  if(Math.round(rst.x*100)/100 != -2.12) print("cal_pos45.x::ERR" , Math.round(rst.x*100)/100);
  if(Math.round(rst.y*100)/100 != 2.12) print("cal_pos45.y::ERR" , Math.round(rst.y*100)/100);


}


function preload() { //SOUND Loading


}



function setup() {

  cl = color(255 , 255, 255);

    scSetupAuto ();
    // scSetupSemiAuto(SC_SIZE.IPHONE_X);
  test();

}



function draw() {

  background(20);
    checkScreen(true);

    // nofill();
    strokeWeight(1);
    stroke(cl);
    circle(cal_x(0.5), cal_y(0.5), 50);

    //Left/Top corner
    stroke(color( 'red' ));
    circle(cal_x(0.0), cal_y(0.0), 50);

    //Right/Top corner
    stroke(color( 'green' ));
    circle(cal_x(1.0), cal_y(0.0), 50);

    //Left/Bottom corner
    stroke(color( 'blue' ));
    circle(cal_x(0.0), cal_y(1.0), 50);

    //Left corner
    stroke(color( 'yellow' ));
    circle(cal_x(1.0), cal_y(1.0), 50);



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
