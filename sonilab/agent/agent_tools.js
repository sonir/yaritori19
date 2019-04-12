var AgTools = AgTools || {};

(function(_){



  _.distance= function (a, b){

    let dist_x = b.x - a.x;
    let dist_y = b.y - a.y;

    return Math.sqrt( (dist_x * dist_x) + (dist_y * dist_y) );

  }



  _.seekNearest = function (ag,ags){

    if(ags.length<=1){
      print("agents array is too small. return -1");
      return -1;
    }

    let nearest_id = -1;
    let val = 0.0;
    let nearest_val = 999.9;

    let len = ags.length;
    for(var i=0; i<len;i++){

      if(ags[i].active ==false || ag.uid == i) continue;
      val = AgTools.distance(ag.position , ags[i].position);
      if(val < nearest_val){
        nearest_id = i;
        nearest_val = val;
      }
    }

    return nearest_id;

  }



  _.isViewRange = function (ag, dist){

    if(ag.view*AG_VIEW_MOD > dist) return true;
    else return false;

  }



  _.isLarge = function (f1, f2){

    if(f1>f2){
      return 1;
    }else if(f1<f2){
      return 0;
    }else if(f1==f2){
      return -1;
    }

  }



  /////////////////////////////////////

  _.calVel = function (vec, vel){

     // vel.add( createVector( (random(-1,1)*SPD_MOD) , (random(-1,1)*SPD_MOD) ) );
     vel.add( vec );

     //SPD Limitter
     if(vel.x>SPD_MAX*AG_MOV_CTRL){
       vel.x = SPD_MAX*AG_MOV_CTRL;
     }else if(vel.x <= (SPD_MAX*AG_MOV_CTRL*-1) ){
       vel.x = (SPD_MAX*-1);
     }else{
     }

     if(vel.y>SPD_MAX*AG_MOV_CTRL){
       vel.y = SPD_MAX*AG_MOV_CTRL;
     }else if(vel.y <= (SPD_MAX*AG_MOV_CTRL*-1) ){
       vel.y = (SPD_MAX*AG_MOV_CTRL*-1);
     }else{
     }

     return vel;

  }

  //Convert param from 0-1 to -1 to 1
  _.scale2amp = function (val){

    return amp = (val - 0.5)*2.0;

  }



  //Count active agent
  _.countActive = function(agents){

    let count = 0;

    for(let i=0; i<agents.length;i++){

      if(agents[i].active) count++;

    }

    return count;

  }



})(AgTools);
