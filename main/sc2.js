var sc2 = sc2 || {};

(function(_){

  let uid = 1;

  _.setup = function(e){

    // print('setup:sc2')
    agm_init();

  }
  document.addEventListener('/setup', sc2.setup);



  _.update = function(e){

    // print('update:sc2');


  }
  document.addEventListener('/update', sc2.update);



  _.draw = function(e){

    if(e.layer[uid]){
      // print('draw:sc2', e.layer);
      agm_update();

    }

  }
  document.addEventListener('/draw', sc2.draw);


})(sc2);
