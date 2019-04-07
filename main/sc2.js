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


  //Event Handler for StateChanged for ripple trigger
  _.stateWasChanged = function (e) {

    let tmp = new CustomEvent('/ripples/add');
    // let vec = new createVector();
    let vec = e.ag.position;
    // vec.x = random();
    // vec.y = random();
    tmp.posi = vec;
    tmp.size = e.ag.size*11.0;
    tmp.spd = 400+( 600*random() );
    document.dispatchEvent(tmp);


  }
  document.addEventListener('/state_changed' , sc2.stateWasChanged);

})(sc2);
