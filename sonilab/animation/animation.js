const AG_ANIM_SPD = 0.032//0.064;//0.05;//0.00125;
const AG_ANIM_RANGE = 0.0047;//0.02//0.005; //0,03;

let p1x = null;
let p1y = null;
let p1x_scaled = null;
let p1y_scaled = null;
let p2x = null;
let p2y = null;
let p2x_scaled = null;
let p2y_scaled = null;

// let ag = null

var Animation = Animation || {};

(function(_){

  let uid = 0;
  let sel = null;



  _.setup = function(e){


  }



  _.update = function(e){



  }



  _.drawAgent = function(e){

    let ag = e.ag;

    push();
    ////////////////////////

    translate( cal_x(ag.position.x) , cal_y(ag.position.y) );

    if(TEST_MODE){

      noFill();
      stroke(ag.color);
      // square(cal_x(0.0)-(ag.size*0.5), cal_y(0.0)-(ag.size*0.5), ag.size);
      circle(cal_x(0.0), cal_y(0.0), ag.size*850);
      // //Draw View
      circle(cal_x(0.0), cal_y(0.0), wd*ag.view*AG_VIEW_MOD);
      text(str(ag.state), 0.0, 0.0);

    }
    //Draw photo nodes
    Animation.drawNodes(ag);
    Animation.drawEdges(ag);
    ////////////////////////
    pop();


  }
  document.addEventListener('/draw_agent' , Animation.drawAgent);



  _.drawAgentOld = function(e){

    let ag = e.ag;

    push();
    ////////////////////////

    translate( cal_x(ag.position.x) , cal_y(ag.position.y) );

    if(TEST_MODE){

      noFill();
      stroke(ag.color);
      // square(cal_x(0.0)-(ag.size*0.5), cal_y(0.0)-(ag.size*0.5), ag.size);
      circle(cal_x(0.0), cal_y(0.0), ag.size*850);
      // //Draw View
      circle(cal_x(0.0), cal_y(0.0), wd*ag.view*AG_VIEW_MOD);
      text(str(ag.state), 0.0, 0.0);

    }
    //Draw photo nodes
    Animation.drawNodes(ag);
    Animation.drawEdges(ag);
    ////////////////////////
    pop();


  }
  document.addEventListener('/draw_agent/old' , Animation.drawAgentOld);



  _.drawEdges = function(ag){

    for(let i=0; i<Object.keys(ag.edges).length;i++){

      let p1 = ag.nodes_now[ag.edges[i].node_id_st];
      let p2 = ag.nodes_now[ag.edges[i].node_id_ed];

      p1x_scaled = p1.x*ag.size*0.5;
      p1y_scaled = p1.y*ag.size*0.5;
      p2x_scaled = p2.x*ag.size*0.5;
      p2y_scaled = p2.y*ag.size*0.5;

      line( cal_x(p1x_scaled), cal_y(p1y_scaled), cal_x(p2x_scaled), cal_y(p2y_scaled) );

    }

  }



  _.drawNodes = function(ag){

    if(ag.nodes_update)ag.updateNodesExe();
    if(ag.edges_update)ag.updateEdgesExe();

    Animation.updateNodePosition(ag);

    //draw Nodes
    for(let i=0; i<ag.node_count;i++){

      p1x = ag.nodes_now[i].x;
      p1y = ag.nodes_now[i].y;

      p1x_scaled = p1x*ag.size*0.5;
      p1y_scaled = p1y*ag.size*0.5;


      noStroke();
      //COLOR TEST
      fill(ag.color);
      ellipse(cal_x(p1x_scaled), cal_y(p1y_scaled), NODE_SIZE*ag.size, NODE_SIZE*ag.size);

      stroke(ag.color);
      if(i!=0){

        p2x_scaled = ag.nodes_now[(i-1)].x*ag.size*0.5;
        p2y_scaled = ag.nodes_now[(i-1)].y*ag.size*0.5;
        // line( cal_x(p1x_scaled), cal_y(p1y_scaled), cal_x(p2x_scaled), cal_y(p2y_scaled) );

      }

    } //End of for



  } //end of drawNodes



  _.updateNodePosition = function (ag){

    // for(let i=0; i<ag.node_count; i++){
    for(let i=0; i<ag.nodes.length; i++){

      //Update the now position with scaled noised param and origin position
      ag.nodes_now[i].x = ag.nodes[i].x + ( AgTools.scale2amp( noise( ag.node_seeds[i].x ) ) * AG_ANIM_RANGE );
      ag.nodes_now[i].y = ag.nodes[i].y + ( AgTools.scale2amp( noise( ag.node_seeds[i].y) ) * AG_ANIM_RANGE );

      ag.node_seeds[i].x += random( AG_ANIM_SPD*0.5 , AG_ANIM_SPD*2.0 );
      ag.node_seeds[i].y += random( AG_ANIM_SPD*0.5 , AG_ANIM_SPD*2.0 );;

    } //end of for

  }


})(Animation);


//////
