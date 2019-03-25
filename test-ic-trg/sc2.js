
// var PERFORMER = {
//
//   PF : 0,
//   TB : 1,
//   GT : 2,
//   BA : 3,
//
// }

//Default is PF
var me = 'PF';

var sc2 = sc2 || {};

(function(_){

  let uid = 1;
  let button = null;


  _.setup = function(e){


  }
  document.addEventListener('/setup', sc2.setup);



  _.update = function(e){

    if(e.layer[uid]){

    }

  }
  document.addEventListener('/update', sc2.update);



  _.draw = function(e){


    if(layer[uid]){

      if(me=='PF')background(255,0,0);
      else if(me=='TB')background(0,255, 0);
      else if(me=='GT')background(0,0, 255);
      else if(me=='BA')background(255,255, 0);

    }

  }
  document.addEventListener('/draw', sc2.draw);



  _.setPerformer = function(e){

    me = e.performer;
    // button = createButton(me);
    // button.position(cal_x(0.5),cal_y(0.5) );
    // button.mousePressed(sc2.send);

  }
  document.addEventListener('/set_performer', sc2.setPerformer);



  _.send = function(e){

    print("send");

  }


})(sc2);
