const DUR = 0.025

let s1 = null;

function test(){

  if(s1.calcIndexMax()==40)print("calcIndexMax is OK");
  else print('ERR:GLITCH:calcIndexMax has error.');
  print( s1.calcIndexMax() );

}


function preload() { //SOUND Loading

  // s1 = new Glitch('assets/s1.mp3');
  s1 = new Glitch('assets/1-cl.mp3');

}



function setup() {

  //Sound Setup
  s1.setTickSec(0.1);
  s1.setPlaybackMode(GLITCH_MODE.POLY);
  s1.setDuration(DUR);

  scSetupSemiAuto(SC_SIZE.IPHONE_X);
  test();

}



function draw() {

  background(20);
    checkScreen(true);

}


function touchEnded() {

  print('touch');
  s1.playWithRandom();
  // s1.play(10); //Off course, Play with tick is ok.


}



function deviceTurned(){

  setTimeout(scSetupAuto, 3000);

}




//////////////////////////////////////
