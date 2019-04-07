
var cl = null;
function test(){


}


function preload() { //SOUND Loading


}



function setup() {

  Scene.setup();
  cl = color(255 , 255, 255);

//     scSetupAuto ();
  scSetupSemiAuto(SC_SIZE.IPHONE_X);
  checkScreen(false);
  test();

}



function draw() {


  background(20);

  // noFill();

  Scene.update();
  Scene.draw();

  // strokeWeight(1);
  // stroke(color('green'));
  // circle(cal_x(0.5), cal_y(0.5), 100);




}


function touchEnded() {

  print('touch');
  let tmp = new CustomEvent('/ripples/add');
  let vec = new createVector();
  vec.x = random();
  vec.y = random();
  tmp.posi = vec;
  tmp.size = random();
  tmp.spd = 1000*random();
  document.dispatchEvent(tmp);

}
