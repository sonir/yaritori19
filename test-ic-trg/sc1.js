var sc1 = sc1 || {};

(function(_){

  let uid = 0;

  var button1 = null;
  var button2 = null;
  var button3 = null;
  var button4 = null;



  _.setup = function(e){

    // print('setup:sc1')
    let BT_OFF_SET = 0.1;
    var button_count = 0;

    button1 = createButton('PF');
    button1.position(cal_x(0.5),cal_y(0.1*button_count+BT_OFF_SET) );
    button1.mousePressed(sc1.bt_pf);
    // button1.mousePressed(sc1.bt_pf);
    button_count++;

    button2 = createButton('TB');
    button2.position(cal_x(0.5),cal_y(0.1*button_count+BT_OFF_SET) );
    button2.mousePressed(sc1.bt_tb);
    button_count++;

    button3 = createButton('GT');
    button3.position(cal_x(0.5),cal_y(0.1*button_count+BT_OFF_SET) );
    button3.mousePressed(sc1.bt_gt);
    button_count++;

    button4 = createButton('BA');
    button4.position(cal_x(0.5),cal_y(0.1*button_count+BT_OFF_SET) );
    button4.mousePressed(sc1.bt_ba);
    button_count++;


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



  _.bt_pf = function(){

    layer[0]=false;
    layer[1]=true;
    sc1.bt_rm();

    e = new CustomEvent('/set_performer');
    e.performer = 'PF';
    document.dispatchEvent(e);

  }



  _.bt_tb = function(){

    layer[0]=false;
    layer[1]=true;
    sc1.bt_rm();

    e = new CustomEvent('/set_performer');
    e.performer = 'TB';
    document.dispatchEvent(e);

  }



  _.bt_gt = function(){

    layer[0]=false;
    layer[1]=true;
    sc1.bt_rm();

    e = new CustomEvent('/set_performer');
    e.performer = 'GT';
    document.dispatchEvent(e);

  }



  _.bt_ba = function(){

    layer[0]=false;
    layer[1]=true;
    sc1.bt_rm();

    e = new CustomEvent('/set_performer');
    e.performer = 'BA';
    document.dispatchEvent(e);

  }


  _.bt_rm = function(){
    
    button1.remove();
    button2.remove();
    button3.remove();
    button4.remove();

  }

})(sc1);
