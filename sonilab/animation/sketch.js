// var wd = 0;
// var ht = 0;
// const SC_CENTER = 0.5;
// const CENTER_X = SC_CENTER;
// const CENTER_Y = SC_CENTER;



function setup() {


  scSetupAuto ();
  ag = new Agent(0);
  ag.size = ag.size*3.;

  ag2 = new Agent(1);
  ag2.size = ag2.size*3.;


}



function draw() {

  // print(ag.node_seeds[0].x);

  background(20);
  let tmp = new CustomEvent('/draw_agent');
  ag.position.x = 0.5;
  ag.position.y = 0.5;
  tmp.ag = ag;

  document.dispatchEvent(tmp);

  ag2.position.x = 0.25;
  ag2.position.y = 0.25;
  tmp.ag = ag2;
  document.dispatchEvent(tmp);

}
