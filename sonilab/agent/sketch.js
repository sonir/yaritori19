var wd = 0;
var ht = 0;
const NODE_SIZE = 80;


var troubled = false;
touched = false;

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

  //Test distance
  let a = createVector(0,0);
  let b = createVector(3,4);
  try {
    if(distance(a,b)!=5.0 ){
    throw new Error('ERR :: distance()');
    }
  }catch(e){
    console.log(e.message);
    troubled = true;
  }

  //Test nearest
  let dummy_ags = [];
  dummy_ags[0] = new Agent(0);
  dummy_ags[1] = new Agent(1);
  dummy_ags[2] = new Agent(2);
  dummy_ags[0].position.x = 0.0;   dummy_ags[0].position.y = 0.0;
  dummy_ags[1].position.x = 1.0;   dummy_ags[0].position.y = 1.0;
  dummy_ags[2].position.x = 0.5;   dummy_ags[0].position.y = 0.5;
  try {
    if(seekNearest(dummy_ags[0], dummy_ags)!=2 ){
    throw new Error('ERR ::seek_nearest()');
    }
  }catch(e){
    console.log(e.message);
    troubled = true;
  }

  //Test isViewRange
  let ag_for_view = new Agent(0);
  ag_for_view.view = 0.137;
  try{
    if(isViewRange(ag_for_view, 0.136)!= true){
      throw new Error('ERR ::isViewRange()');
    }
  }catch(e){
    console.log(e.message);
    troubled = true;
  }
  try{
    if(isViewRange(ag_for_view, 0.138)!= false){
      throw new Error('ERR ::isViewRange()');
    }
  }catch(e){
    console.log(e.message);
    troubled = true;
  }

  //Test isLarge
  try{
    if(isLarge(3,1)!=1){
      throw new Error('ERR ::isLarge()1');
    }else if( isLarge(1,3)!=0 ){
      throw new Error('ERR ::isLarge()2');
    }else if( isLarge(1,1)!=-1 ){
      throw new Error('ERR ::isLarge()3');
    }
  }catch(e){
    console.log(e.message);
    troubled = true;
  }


  //Test position
  print("WD:"  , wd);
  print("cal_x(1.0):", cal_x(1.0));

}



function preload() { //SOUND Loading
  sample = loadSound('assets/bg.mp3');
}



function setup() {

    // scSetupAuto ();
    scSetupSemiAuto(SC_SIZE.IPHONE_X);

  agm_init();
  test();

}



function draw() {

  background(20);

  stroke(color('purple'));
  circle(374, 0, 100);
  stroke(color('lightblue'));
  circle(cal_x(1.0), 0, 90);


  if(troubled != true){

    checkScreen(true);
    agm_update();

  }else{

    //If eccor occured in test, display yellow
    background(255,255,0);
    print("ERR :: Troubled !!")

  }

}


function touchEnded() {

  print('touch');

  if(!touched){
    touched = true;
    //Play Sound
    sample.loop();
  }else{

    touched = false;
    //Play Sound
    sample.stop();

  }


}
