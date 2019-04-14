const LINE_WIDTH = 0.5;
const AG_ANIM_SPD = 0.0045;//0.032//0.064;//0.05;//0.00125;
const AG_ANIM_RANGE = 0.45;//0.0047;//0.02//0.005; //0,03;

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

    // print(ag.nodes[0].x , ag.nodes[0].y);

    push();
    ////////////////////////

    translate( cal_x(ag.position.x) , cal_y(ag.position.y) );

    if(TEST_MODE){

      noFill();
      stroke(ag.color);
      circle( cal_x(0.0), cal_y(0.0), ag.size*850 );
      //Draw View
      circle( cal_x(0.0), cal_y(0.0), wd*ag.view*AG_VIEW_MOD );
      //Indicate State
      text( str(ag.state), 0.0, 0.0 );

    }
    //Draw photo nodes
    if(ag.nodes_update==true){
      ag.updateNodesExe();
      ag.updateEdgesExe();
      ag.flgShapeUpdate2False(); //release the mutex flag
    }
    Animation.drawNodes(ag);
    Animation.drawEdges(ag);
    ////////////////////////
    pop();


  }
  document.addEventListener('/draw_agent' , Animation.drawAgent);



  _.drawEdges = function(ag){

    strokeWeight( LINE_WIDTH );

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

    //nodesUpdate
    Animation.updateNodePosition(ag);

    //draw Nodes
    for(let i=0; i<ag.nodes.length;i++){

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

      }

    } //End of for


  } //end of drawNodes



  _.updateNodePosition = function (ag){

    // for(let i=0; i<ag.node_count; i++){
    for(let i=0; i<ag.nodes.length; i++){

      //Update the now position with scaled noised param and origin position
      ag.nodes_now[i].x = ag.nodes[i].x + ( AgTools.scale2amp( noise( ag.node_seeds[i].x ) ) * AG_ANIM_RANGE );
      ag.nodes_now[i].y = ag.nodes[i].y + ( AgTools.scale2amp( noise( ag.node_seeds[i].y) ) * AG_ANIM_RANGE );

      //Step the seed
      ag.node_seeds[i].x += random( AG_ANIM_SPD*0.5 , AG_ANIM_SPD*2.0 );
      ag.node_seeds[i].y += random( AG_ANIM_SPD*0.5 , AG_ANIM_SPD*2.0 );;

    } //end of for
    ag.nodes_now = Animation.centering(ag.nodes_now);


  }



  _.centering = function (node){

    let center = Animation.calcCenter(node);

    //CalcCenter

    for(let i=0; i<node.length; i++){

      node[i] = p5.Vector.sub(node[i] , center);

    }

    return node;


  }



  _.calcCenter = function (node) {

    let center = createVector(0.0 , 0.0);

    for(let i=0; i<node.length; i++){
      center.x += node[i].x;
      center.y += node[i].y;
    }

    center = p5.Vector.div(center , node.length);
    return center;

  }




})(Animation);


//////
