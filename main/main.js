

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




//////////////////////////////////////
