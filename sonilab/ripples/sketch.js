
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
  test();

}



function draw() {


  background(20);
  checkScreen(true);

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
  vec.x = 0.5;
  vec.y = 0.5;
  tmp.posi = vec;
  tmp.size = 1.5;
  tmp.spd = 1000;
  document.dispatchEvent(tmp);

}
