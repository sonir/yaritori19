const FINISHED_NOTHING = -1;
const RIPPLE_MAX_NUM = 128;
var RIPPLE_COLOR = 'white';


var Ripples = Ripples || {};

(function(_){

  let uid = 0;
  let buf = [];
  let del_count = 0;

  _.setup = function(e){

    // print('setup:Ripples')

  }
  document.addEventListener('/setup', Ripples.setup);



  _.update = function(e){

    // print('update:Ripples');
    // print(buf.length); //Check ring buffer

    //DEL ripples over the RIPPLE_MAX_NUM
    if(del_count){

      for(let i=0; i<del_count; i++){

        //Delete the most oldest element
        buf.shift();

      }

      //Reset the count
      del_count = 0;

    }


  }
  document.addEventListener('/update', Ripples.update);



  _.draw = function(e){

    noFill();
    for(let i=0; i<buf.length;i++){

      Ripples.drawOne(buf[i]);

    }

  }
  document.addEventListener('/draw', Ripples.draw);



  _.drawOne = function(rp){

    //Init Basic
    strokeWeight(1.5);
    // stroke( color(255, 255, 255, 255*(1-rp.now()) ) );
    stroke( color(255, 255, 255, 255*(1-rp.nowRaw()) ) );

    let size = rp.size*rp.now();
    circle(cal_x(rp.position.x), cal_y(rp.position.y), cal_x( rp.size*rp.now() ) );

  }



  _.add = function(e){

    if(!Ripples.sizeCheck()){

      del_count++;

    }

    let tmp = new Ripple(e.posi , e.size, e.spd);
    buf.push(tmp);

  }
  document.addEventListener('/ripples/add', Ripples.add);



  _.sizeCheck = function(){

    if(buf.length>=RIPPLE_MAX_NUM) return false;
    else return true;

  }



})(Ripples);





class Ripple {

  constructor(position, size, spd){

    this.position = position;
    this.size = size;
    this.mt = new MotionTimer(spd);

  }



  now(){

    return (this.mt.update() * this.size);

  }



  nowRaw(){

    return this.mt.update();

  }


}
