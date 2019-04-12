//Agents
let agents = [];
let ev_report = new CustomEvent("/sys/report");
let ev_draw = new CustomEvent("/draw_agent");
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
    ev_draw.ag = agents[i];
    // print(agents[i].nodes[1].x, agents[i].nodes[1].y);
    document.dispatchEvent(ev_draw);
    // drawAgent(agents[i].position.x, agents[i].position.y, agents[i].size, agents[i]);
  }

  //ev_report.density = agents.length/AG_MAX;
  if(DENSITY_WITH_ACTIVE_ONLY){
    ev_report.density = AgTools.countActive(agents)/AG_MAX;
    print('density: ' ,  ev_report.density );
  } else {
    ev_report.density = agents.length/AG_MAX;
    print('esc');
  }

  agm_density = ev_report.density;
  document.dispatchEvent(ev_report);
  // print(report_interval+=REPORT_INC);

}



function agmCycle(ag){

  // if(ag.uid==0)print('%%' , ag.nodes[1].x , ag.nodes[1].y);

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
      tmp.ag =agents[i];
      // print(scount + " SND[" , i , "] " , agents[i].state , " : " , agents[i].prestate);
      document.dispatchEvent(tmp);


    }

  }

  // scount++;

}


//////////////////////////////////////////////////////
