var Scene = Scene || {};
var layer = [true, false];

//instant function
(function(_){

  var ev_setup = new CustomEvent('/setup');
  var ev_update = new CustomEvent('/update');
  var ev_draw = new CustomEvent('/draw');


  _.setup = function(){

      document.dispatchEvent(ev_setup);

  }



  _.update = function(){

      ev_update.layer = layer;
      document.dispatchEvent(ev_update);

  }



  _.draw = function(){

      ev_draw.layer = layer;
      document.dispatchEvent(ev_draw);

  }


})(Scene);
