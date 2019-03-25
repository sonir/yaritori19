var sc1 = sc1 || {};

(function(_){

  let uid = 0;

  _.setup = function(e){

    // print('setup:sc1')

  }
  document.addEventListener('/setup', sc1.setup);



  _.update = function(e){

    // print('update:sc1');


  }
  document.addEventListener('/update', sc1.update);



  _.draw = function(e){

    if(e.layer[uid]){
      // print('draw:sc1');
      fill(255,0,0);
      square(cal_x(0.5)-50,cal_y(0.5)-50,100);
    }

  }
  document.addEventListener('/draw', sc1.draw);


})(sc1);
