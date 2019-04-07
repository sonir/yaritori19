const FINISHED_NOTHING = -1;
var RIPPLE_COLOR = 'white';

var Ripples = Ripples || {};

(function(_){

  let uid = 0;
  let buf = [];

  _.setup = function(e){

    // print('setup:Ripples')

    // buf[0] = 137;
    // buf[1] = 138;
    // buf[2] = 139;
    // Ripples.delOne(1);
    // print(buf[1]);

  }
  document.addEventListener('/setup', Ripples.setup);



  _.update = function(e){

    // print('update:Ripples');
    Ripples.delFinished();

  }
  document.addEventListener('/update', Ripples.update);



  _.draw = function(e){

    // print(buf.length);
    for(let i=0; i<buf.length;i++){

      Ripples.drawOne(buf[i]);

    }


  }
  document.addEventListener('/draw', Ripples.draw);



  _.add = function(e){

    let tmp = new Ripple(e.posi , e.size, e.spd);
    buf.push(tmp);

  }
  document.addEventListener('/ripples/add', Ripples.add);



  _.drawOne = function(rp){

    //Init Basic
    strokeWeight(1.5);
    stroke( color(255, 255, 255, 255*(1-rp.now()) ) );

    let size = rp.size*rp.now();
    circle(cal_x(rp.position.x), cal_y(rp.position.y), cal_x( rp.size*rp.now() ) );


  }



  _.delFinished = function(){

    let finished = null;
    finished = Ripples.existFinished();
    print(finished);
    Ripples.delOne(finished);
    // while(Ripples.existFinished() != FINISHED_NOTHING){
    //   finished = Ripples.existFinished();
    //   print('>del: ' , finished, 'length: ' , buf.length);
    //   Ripples.delOne(finished);
    // }

  }



  _.delOne = function(index){

    if(buf.length>1){
      buf.splice(index, index);
    }else if(buf.length==1){

      print('solo!!!!')

    }

    print('delOne:' , index);
    print('completed remain' , buf.length);

  }


  _.existFinished = function(){

    let rst = -1;
    for(let i=0; i<buf.length; i++){

      if(buf[i].now() >= buf[i].size){
        rst = i;
        print('finished one is found. : ' , i, 'now is' , buf[i].now());

      }

    }
    return rst;

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


}
