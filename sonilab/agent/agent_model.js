//Agents
let agents = [];
let ev_report = new CustomEvent("/sys/report");
let agm_density = 0.0;



function agmUpdate(){

  let deadCheck = function(ag){

    if(ag.size<=AG_DEATH_THREATH){

      ag.active=false;
      return true;

    }

  }

  for(let i = 0; i<agents.length; i++){
    if(deadCheck(agents[i]))continue;
    agmCycle(agents[i]);
    drawAgent(agents[i].position.x, agents[i].position.y, agents[i].size, agents[i]);
  }

  ev_report.density = agents.length/AG_MAX;
  agm_density = ev_report.density;
  document.dispatchEvent(ev_report);
  // print(report_interval+=REPORT_INC);

}



function agmCycle(ag){

  ag.nearest_id = AgTools.seekNearest(ag, agents);

  if(ag.nearest_id != -1){
    ag.nearest_ag = agents[ag.nearest_id];
    ag.distance_with_nearest = AgTools.distance(ag.position , ag.nearest_ag.position);

    if( !AgTools.isViewRange(ag , ag.distance_with_nearest) ){
      ag.updateState(STATE.CALM);
      ag.walk();
    }else{

      if( AgTools.isLarge(ag.size , ag.nearest_ag.size) ) ag.updateState(STATE.CHASE);
      else ag.updateState(STATE.RUN);

    }

  }else{ //If agent is one only

    ag.updateState(STATE.CALM);

  }
  ag.walk();


}


function agmAdd(ag){

  ag.uid = agents.length;
  agents.push(ag);

}



function agmInit(){

  //Create First Init
  for(let i = 0; i<AGM_INIT_NUM; i++){
    agmAdd( (new Agent(i)) ) ;
  }

}


function agmStateCheck(){

  for(let i = 0; i<agents.length; i++){

    //Play sound when the agent state was changed
    if(agents[i].state != agents[i].prestate){

      let tmp = new CustomEvent('/state_changed');
      // print(scount + " SND[" , i , "] " , agents[i].state , " : " , agents[i].prestate);
      document.dispatchEvent(tmp);


    }

  }

  // scount++;

}


//////////////////////////////////////////////////////

// function drawAgent(x, y, scale, ag) {
//
//
//   push();
//   ////////////////////////
//
//   translate( cal_x(x) , cal_y(y) );
//   //square(0,0,NODE_SIZE*scale);
//
//
//   // Draw Nodes
//   noFill();
//   stroke(ag.color);
//   let size = ag.size*1000;
//   square(cal_x(0.0)-(size*0.5), cal_y(0.0)-(size*0.5), size);
//   circle(cal_x(0.0), cal_y(0.0), 2);
//   //Draw View
//   circle(cal_x(0.0), cal_y(0.0), wd*ag.view*AG_VIEW_MOD);
//   text(str(ag.state), 0.0, 0.0);
//   if(ag.uid==0)  circle(cal_x(0.0), cal_y(0.0), wd*ag.view*AG_VIEW_MOD*0.5);
//
//   //draw Nodes
//   // for(let i=0; i<ag.node_count;i++){
//   //
//   //   let p1x = ag.nodes[i].x;
//   //   let p1y = ag.nodes[i].y;
//   //   let p1x_scaled = p1x*scale*0.5;
//   //   let p1y_scaled = p1y*scale*0.5;
//   //
//   //
//   //   noStroke();
//   //   //COLOR TEST
//   //   fill(ag.color);
//   //   ellipse(cal_x(p1x_scaled), cal_y(p1y_scaled), NODE_SIZE*scale, NODE_SIZE*scale);
//   //
//   //   stroke(ag.color);
//   //   if(i!=0){
//   //
//   //     p2x_scaled = ag.nodes[(i-1)].x*scale*0.5;
//   //     p2y_scaled = ag.nodes[(i-1)].y*scale*0.5;
//   //     line( cal_x(p1x_scaled), cal_y(p1y_scaled), cal_x(p2x_scaled), cal_y(p2y_scaled) );
//   //
//   //   }
//   //
//   // }
//
//   ////////////////////////
//   pop();
//
// }
