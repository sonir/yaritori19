const AGM_NUM = 2;
const AGM_MAX = AGM_NUM;
const AGM_INIT_NUM = 6;
//const SIZE_MOD = 0.03;


//Agents
let agents = [];


function agm_update(){

  let deadCheck = function(ag){

    if(ag.size<=AG_DEATH_THREATH){

      ag.active=false;
      return true;

    }

  }

  for(let i = 0; i<agents.length; i++){
    if(deadCheck(agents[i]))continue;
    agm_cycle(agents[i]);
    drawAgent(agents[i].position.x, agents[i].position.y, agents[i].size, agents[i]);
  }

}


function agm_cycle(ag){

  ag.nearest_id = seekNearest(ag, agents);

  if(ag.nearest_id != -1){
    ag.nearest_ag = agents[ag.nearest_id];
    ag.distance_with_nearest = distance(ag.position , ag.nearest_ag.position);

    // ag.state = STATE.CALM;

    if( !isViewRange(ag , ag.distance_with_nearest) ){
      ag.state = STATE.CALM;
      ag.walk();
    }else{

      if( isLarge(ag.size , ag.nearest_ag.size) ) ag.state=STATE.CHASE;
      else ag.state=STATE.RUN;

    }

  }else{ //If agent is one only

    ag.state = STATE.CALM;

  }
  ag.walk();


}


function agm_add(ag){

  ag.uid = agents.length;
  agents.push(ag);

}



function agm_init(){

  //Create First Init
  for(let i = 0; i<AGM_INIT_NUM; i++){
    agm_add( (new Agent(i)) ) ;
  }

}


//////////////////////////////////////////////////////
// Tools

function distance(a, b){

  let dist_x = b.x - a.x;
  let dist_y = b.y - a.y;

  return Math.sqrt( (dist_x * dist_x) + (dist_y * dist_y) );

}


function seekNearest(ag,ags){

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
    val = distance(ag.position , ags[i].position);
    if(val < nearest_val){
      nearest_id = i;
      nearest_val = val;
    }
  }

  return nearest_id;

}



function isViewRange(ag, dist){

  if(ag.view > dist) return true;
  else return false;

}

function isLarge(f1, f2){

  if(f1>f2){
    return 1;
  }else if(f1<f2){
    return 0;
  }else if(f1==f2){
    return -1;
  }

}


/////////////////////////////////////

function calVel(vec, vel){

   // vel.add( createVector( (random(-1,1)*SPD_MOD) , (random(-1,1)*SPD_MOD) ) );
   vel.add( vec );

   //SPD Limitter
   if(vel.x>SPD_MAX){
     vel.x = SPD_MAX;
   }else if(vel.x <= (SPD_MAX*-1) ){
     vel.x = (SPD_MAX*-1);
   }else{
   }

   if(vel.y>SPD_MAX){
     vel.y = SPD_MAX;
   }else if(vel.y <= (SPD_MAX*-1) ){
     vel.y = (SPD_MAX*-1);
   }else{
   }

   return vel;

}

//Convert param from 0-1 to -1 to 1
function scale2amp(val){

  return amp = (val - 0.5)*2.0;

}



//////////////////////////////////////



function drawAgent(x, y, scale, ag) {


  push();
  ////////////////////////

  translate( cal_x(x) , cal_y(y) );
  //square(0,0,NODE_SIZE*scale);


  // Draw Nodes
  noFill();
  stroke(ag.color);
  let size = ag.size*1000;
  square(cal_x(0.0)-(size*0.5), cal_y(0.0)-(size*0.5), size);
  circle(cal_x(0.0), cal_y(0.0), 2);


  // for(let i=0; i<ag.node_count;i++){
  //
  //   let p1x = ag.nodes[i].x;
  //   let p1y = ag.nodes[i].y;
  //   let p1x_scaled = p1x*scale*0.5;
  //   let p1y_scaled = p1y*scale*0.5;
  //
  //
  //   noStroke();
  //   //COLOR TEST
  //   fill(ag.color);
  //   ellipse(cal_x(p1x_scaled), cal_y(p1y_scaled), NODE_SIZE*scale, NODE_SIZE*scale);
  //
  //   stroke(ag.color);
  //   if(i!=0){
  //
  //     p2x_scaled = ag.nodes[(i-1)].x*scale*0.5;
  //     p2y_scaled = ag.nodes[(i-1)].y*scale*0.5;
  //     line( cal_x(p1x_scaled), cal_y(p1y_scaled), cal_x(p2x_scaled), cal_y(p2y_scaled) );
  //
  //   }
  //
  // }

  ////////////////////////
  pop();

}
