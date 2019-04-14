

function test(){


}


function preload() { //SOUND Loading

  //Init scene for specified sc
  layer[0] = false;
  layer[INIT_SCENE]=true;

  //Load Sound buffers
  Snd.preload();


  if(INIT_AGENTS==false && INIT_AGENTS_CONFIRMATION==false){
    //
    store.loadAgents();

  } //If when init, don't read


}



function setup() {

  scSetupAuto ();
  if ( TERMINAL_TYPE == SC_SIZE.IPHONE_X_W ) scSetupSemiAuto(SC_SIZE.IPHONE_X_W);
  else if ( TERMINAL_TYPE == SC_SIZE.IPAD_PRO12_W ) scSetupSemiAuto(SC_SIZE.IPAD_PRO12_W);
  else scSetupAuto;

  // scSetupAuto ();
  // scSetupSemiAuto(TERMINAL_TYPE);

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

  background(BG_COLOR);

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

  store.saveAgents();

}



function deviceTurned(){

  // print("turned!!");
  setTimeout(scSetupAuto, 500);
  scSetupAuto();
  cl = color(random(0,255) , random(0,255) , random(0,255));
  // color = 255;

  print('turned !!');
  //BG_COLOR = 100;

}




//////////////////////////////////////
