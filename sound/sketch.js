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

  wd = windowWidth;
  ht = windowHeight;
  createCanvas(windowWidth, windowHeight);
  Snd.setup();


  test();
  // print(noise(0.5));
  //Play Sound
  // sample.loop();
}



function draw() {

  background(20);
  // fill(255,255,255);

}


function touchEnded() {

  Snd.initPlay();
  print('touch');
  let tmp = new CustomEvent('/state_changed');
  document.dispatchEvent(tmp);


}




//////////////////////////////////////
