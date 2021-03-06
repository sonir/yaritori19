var sc2 = sc2 || {};

(function(_){

  let uid = 1;
  let feed_val = 0.0;
  // let feedTimer = new MotionTimer(500);

  _.setup = function(e){

    // print('setup:sc2')
    agmInit();


  }
  document.addEventListener('/setup', sc2.setup);



  _.update = function(e){

    // print('update:sc2');


  }
  document.addEventListener('/update', sc2.update);



  _.draw = function(e){

    if(e.layer[uid]){
      // print('draw:sc2', e.layer);
      agmUpdate();
      agmStateCheck();

    }

  }
  document.addEventListener('/draw', sc2.draw);


  //Event Handler for agentAdd
  _.posted = function (e){ //OSC EVENT

    if(e.arg[1]==SYS_ID){
      print(">>posted " , e.arg[0], e.arg[1]);
      let tmp = new Agent(agents.length);
      agmAdd(tmp);
    }

  }
  document.addEventListener('/yaritori/post', sc2.posted);


  //Event handler for performers feed
  _.feed = function(e){

    if(e.arg[1]==SYS_ID){

      // print("FEED" , arg[1]);
      // feed_val = (KEY_VAL_FOR_FEED*agm_density);

      // feed_val = e.arg[2]*(KEY_VAL_FOR_FEED*agm_density);
      // print('FB:' , KEY_VAL_FOR_FEED*agm_density);
      // AG_MOV_CTRL = 1.0 + (feed_val*AG_MOV_CTRL_MAX);

    }

  }
  document.addEventListener(OSC_ADR_FEED , sc2.feed);


})(sc2);
