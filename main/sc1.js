var sc1 = sc1 || {};

(function(_){

  let uid = 0;
  let sel = null;



  _.setup = function(e){

    // print('setup:sc1');
    let i = 0;
    sel = createSelect();
    sel.position(cal_x(0.5) , cal_y(0.5));
    sel.option('ID');
    while(i<UNIT_NUM){

      sel.option(str(i));
      i++;

    }
    sel.changed(sc1.selectID);

  }
  document.addEventListener('/setup', sc1.setup);



  _.update = function(e){

    // print('update:sc1');
    if(e.layer[uid]){
    }

  }
  document.addEventListener('/update', sc1.update);



  _.draw = function(e){

    if(e.layer[uid]){

      // print('draw:sc1');
      // fill(255,0,0);
      // square(cal_x(0.5)-50,cal_y(0.5)-50,100);

    }

  }
  document.addEventListener('/draw', sc1.draw);



  _.selectID = function(){

    SYS_ID = int(sel.value());
    SC_DEBUG_FLG = false;
    layer[0]= !layer[0];
    layer[FIRST_SCENE]= true;
    print(SYS_ID);
    sel.hide();

  }



})(sc1);


//////
