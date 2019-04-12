var wd = 0;
var ht = 0;
const SC_CENTER = 0.5;
const CENTER_X = SC_CENTER;
const CENTER_Y = SC_CENTER;
const RAD_KEY = Math.PI/180;


var SC_SIZE = {
    IPHONE_X : 1,
    IPHONE_X_W : 2,
    IPAD_PRO12 : 3,
    IPAD_PRO12_W : 4,
    AUTO : 5
};



function scSetup(x,y){

  wd = x;
  ht = y;
  // createCanvas(windowWidth, windowHeight);
  createCanvas(wd , ht);

}


function scSetupAuto(){


    scSetup(windowWidth, windowHeight);


}



function scSetupSemiAuto(sc){

  let x;
  let y;

  switch(sc){

    case SC_SIZE.IPHONE_X:
      x = 375;
      y = 812;
      //x = 374;
      //y = 767;
      break;

    case SC_SIZE.IPHONE_X_W:
      x = 812;
      y = 375;
      break;

    case SC_SIZE.IPAD_PRO12:
      x = 1024;
      y = 1366;
      break;

    case SC_SIZE.IPAD_PRO12_W:
      x = 1366;
      y = 1024;
      break;

    default:
      print("ERR : scSetupSemiAuto: Unknown screen was specified.");
      break;

  }

  scSetup(x,y);

}




function checkScreen(flg){

    if(flg==true){
        noFill();
        strokeWeight(1.0);
        stroke(255);
        rect(0,0, cal_x(1.0) , cal_y(1.0));
        line(0,0, cal_x(1.0) , cal_y(1.0));
        line(0,cal_y(1.0), cal_x(1.0) , 0);

        // nofill();
        strokeWeight(1);
        stroke(color('white'));
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
}




function cal_x(x) {

  return x*wd;

}



function cal_y(y) {

  return y*ht;

}



function cal_deg(x1, y1, x2, y2){

  a = x2 - x1;
  b = y2 - y1;
  let rad = Math.atan2(a,b);
  let deg = rad * 180 / Math.PI;

  if(deg<0){
    deg = deg+360;
  }
  return ( deg );
  // return 40;


}



function cal_pos(theta , dist){
  let rad = theta*RAD_KEY;
  let vec = createVector(0,0);
  vec.y = Math.cos(rad) * dist;
  vec.x = Math.sin(rad) * dist;
  return vec;

}
