//SYSTEM DEFINES
const V_FIX = 0.02;//ORG 0.005; //Basic param for View
const S_FIX = 0.0008;//0.00075;//ORG 0.0055; //0.00017 //Basic param for Size
const M_FIX = 0.025;//ORG 0.035; //0.0005 //Basic param for move
const NODE_AVG = 20;
const AG_SIZE_MIN = 0.0003;//ORG 0.05;
const MOV_MINIMUM = 0.0005;


var Shape2Agent = Shape2Agent || {};

(function(_){

  let uid = 0;

  _.setup = function(e){

    // print('setup:Shape2Agent')

  }
  document.addEventListener('/setup', Shape2Agent.setup);



  _.convertToAgent = function(e){

    print('Shape received. :: node num :' + e.shape.nodes.length);
    print('Edge num is ' + Object.keys(e.shape.edges).length);
    //e.shape.edges[i].node_id_st
    //e.shape.edges[i].node_id_ed

    //Calc new agent parameters
    let ag = Shape2Agent.process(e.shape);
    print('An agent was created.');
    print('view: ' , ag.view);
    print('size: ' , ag.size);
    print('mov: ' , ag.mov);
    print('node_count: ' , ag.nodes.length);
    print('edge_count: ' , Object.keys(ag.edges).length);

    //Bang event to add new agent to the model
    let tmp = new CustomEvent('/agent/converted');
    tmp.ag = ag;
    document.dispatchEvent(tmp);

  }
  document.addEventListener('/convert_to_agent', Shape2Agent.convertToAgent);



  _.process = function(shape){

      ag = new Agent(agents.length);

      ag.view = Object.keys(shape.edges).length * V_FIX;

      ag.size = shape.nodes.length * S_FIX;

      // size minimum limit
      if(ag.size < AG_SIZE_MIN){

        ag.size = AG_SIZE_MIN;

      }


      //Calc MOV
      if(shape.nodes.length != 0){

        ag.mov = ( NODE_AVG / shape.nodes.length ) * M_FIX;

      } else {

        ag.mov = (NODE_AVG*2) * M_FIX;

      }


      if(ag.mov < MOV_MINIMUM){

        ag.mov = MOV_MINIMUM;

      }

      // //OverWrite the agent position with cetering with 3sceen
      // ag.posi = makePositionToAdd();

      //Ignore it in p5 version

      //ag.nodes = shape.nodes;
      // ag.updateNodes(shape.nodes);
      //ag.nodes_now = ag.nodes;
      // ag.updateEdges(shape.edges);

      shape.nodes = Animation.centering(shape.nodes);
      ag.updateShape(shape.nodes,shape.edges);
      ag.updateNodesExe();
      ag.updateEdgesExe();
      ag.flgShapeUpdate2False(); //release the mutex flag

      ag.color = shape.color;

      return ag;


  }



})(Shape2Agent);




class Shape {

  constructor(nodes, edges, color){

    this.nodes = nodes;
    this.edges = edges;
    this.color = color;


  }

  foo(){


  }

}


//ORIGINAL C++
// typedef struct ag_shape_t {
//
//     node_t nodes[NODE_MAX];
//     edge_t edges[EDGE_MAX];
//
//     float color;
//     int node_count;
//     int edge_count;
//
//
// } ag_shape_t;
