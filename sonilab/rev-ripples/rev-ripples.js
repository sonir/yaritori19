const REV_FINISHED_NOTHING = -1;
const REV_RIPPLE_MAX_NUM = 128;
var REV_RIPPLE_COLOR = 'white';


var RevRipples = RevRipples || {};

(function(_){

  let uid = 0;
  let buf = [];
  let del_count = 0;
  let fill_flg = true;

  _.setup = function(e){

    // print('setup:RevRipples')

  }
  document.addEventListener('/setup', RevRipples.setup);



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
  document.addEventListener('/update', RevRipples.update);



  _.draw = function(e){

    if(fill_flg) fill(255);
    else noFill();

    for(let i=0; i<buf.length;i++){

      RevRipples.drawOne(buf[i]);

    }
    noFill();


  }
  document.addEventListener('/draw', RevRipples.draw);



  _.drawOne = function(rp){

    //Init Basic
    strokeWeight(1.5);
    // stroke( color(255, 255, 255, 255*(1-rp.now()) ) );
    stroke( color(255, 255, 255, 255*( rp.nowRaw()) ) );

    let size = rp.size* ( rp.now()*rp.now() ) ;
    circle(cal_x(rp.position.x), cal_y(rp.position.y), cal_x( rp.size*rp.now() ) );

  }



  _.add = function(e){

    if(!RevRipples.sizeCheck()){

      del_count++;

    }

    let tmp = new RevRipple(e.posi , e.size, e.spd);
    buf.push(tmp);

  }
  document.addEventListener('/rev-ripples/add', RevRipples.add);



  _.sizeCheck = function(){

    if(buf.length>=REV_RIPPLE_MAX_NUM) return false;
    else return true;

  }



})(RevRipples);





class RevRipple {

  constructor(position, size, spd){

    this.position = position;
    this.size = size;
    this.mt = new MotionTimer(spd);

  }



  now(){

    return (this.mt.updateInvert() * this.size);

  }



  nowRaw(){

    return this.mt.updateInvert();

  }


}
