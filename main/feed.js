var feed = feed || {};

var FEED_MT_DURATION_FOR_INIT = 0.0;
var FEED_MT_DURATION = 1000;

(function(_){

  let uid = 0;
  let sel = null;
  let mod = 0.0;
  let mt = null;
  let tmp_fval = 1.0;


  //Event handler for performers feed
  _.osc = function(e){

    //EVENT for OSC
    if(e.arg[1]==SYS_ID){

      feed.updateMod();
      feed.mt.set(FEED_MT_DURATION);

    }

  }
  document.addEventListener(OSC_ADR_FEED , feed.osc);



  //Event for setup
  _.setup = function(e){

    feed.mt = new MotionTimer(FEED_MT_DURATION_FOR_INIT);
    feed.updateMod();

  }
  document.addEventListener('/setup', feed.setup);



  //Event for update
  _.update = function(e){

    //update params from 1 - 1+feed.mod(max)
    feed.tmp_fval = feed.mod *  ( 1.0 - feed.mt.update());
    AG_MOV_CTRL = 1.0 + (feed.tmp_fval*feed.tmp_fval);

  }
  document.addEventListener('/update', feed.update);



  //Event for draw
  _.draw = function(e){

    if(e.layer[uid]){
      //Do nothing
    }

  }
  document.addEventListener('/draw', feed.draw);


  //Update feed mode
  _.updateMod = function (){

    feed.mod = (KEY_VAL_FOR_FEED*agm_density);

  }



})(feed);


//////
