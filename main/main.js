

function test(){


}


function preload() { //SOUND Loading

  //Init scene for specified sc
  layer[0] = false;
  layer[INIT_SCENE]=true;

  //Load Sound buffers
  Snd.preload();


}



function setup() {

  //scSetupAuto ();
  scSetupSemiAuto(SC_SIZE.IPHONE_X);
  checkScreen(SC_DEBUG_FLG);

  //Pramset of sounds
  Snd.setup();

  //Init Scene
  Scene.setup();

  // frameRate(300);

  //Do test
  test();

}



function draw() {

  background(20);

  //Update Scenes
  Scene.update();
  Scene.draw();
  // AG_MOV_CTRL = 1.0;
  // print(AG_MOV_CTRL);


}


function touchEnded() {

  print('touch');
  // Snd.initPlay();
  //Play Sound for iOS Audio enable
  let tmp = new CustomEvent('/init_play');
  document.dispatchEvent(tmp);


}



function deviceTurned(){

  // print("turned!!");
  setTimeout(scSetupAuto, 3000);
  // scSetupAuto();
  cl = color(random(0,255) , random(0,255) , random(0,255));
  // color = 255;

}



//
// function calVel(vel){
//
//    vel.add( createVector( (random(-1,1)*SPD_MOD) , (random(-1,1)*SPD_MOD) ) );
//
//    //SPD Limitter
//    if(vel.x>SPD_MAX){
//
//      vel.x = SPD_MAX;
//      // print('LIM_A : ' + vel.x);
//
//    }else if(vel.x <= (SPD_MAX*-1) ){
//
//      vel.x = (SPD_MAX*-1);
//      // print('LIM_B : ' + vel.x);
//
//    }else{
//
//      // print('LIM_ZERO1 : ' + vel.x);
//
//    }
//
//    if(vel.y>SPD_MAX){
//
//      vel.y = SPD_MAX;
//      // print('LIM_C : ' + vel.y);
//
//    }else if(vel.y <= (SPD_MAX*-1) ){
//
//      vel.y = (SPD_MAX*-1);
//      // print('LIM_D : ' + vel.y);
//
//    }else{
//
//      // print('LIM_ZERO2 : ' + vel.y);
//
//    }
//
//    return vel;
//
// }


//////////////////////////////////////
