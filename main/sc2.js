const INDEX_OF_NODE_COUNT = 3;
const INDEX_OF_NODE = INDEX_OF_NODE_COUNT+1;


var sc2 = sc2 || {};

(function(_){

  let uid = 1;
  let feed_val = 0.0;

  // let feedTimer = new MotionTimer(500);

  _.setup = function(e){

    // print('setup:sc2')
    agmInit();


  }
  document.addEventListener('/setup', sc2.setup);



  _.update = function(e){

    // print('update:sc2');


  }
  document.addEventListener('/update', sc2.update);



  _.draw = function(e){

    if(e.layer[uid]){
      // print('draw:sc2', e.layer);
      agmUpdate();
      agmStateCheck();

    }

  }
  document.addEventListener('/draw', sc2.draw);



  //Event Handler for agentAdd with direct
  _.posted = function (e){ //OSC EVENT

    print("---POSTED()---");

    if(e.arg[1]==SYS_ID){
      print(">>posted " , e.arg[0], e.arg[1]);



      let my_nodes = [];
      let my_edges = [];
      let my_color = color(255, 255, 255);
      let shape = new Shape(my_nodes, my_edges, my_color); //Instanciate
      let node_count = int( e.arg[INDEX_OF_NODE_COUNT] );
      let index_of_edge_count = (node_count*2)+4;
      let index_of_edge = index_of_edge_count+1;
      let edge_count = int( e.arg[index_of_edge_count] );
      let index_of_hsv = int( e.arg[index_of_edge_count*2+7] );

      if(TEST_MODE==true){
        print('arg0 (adr) : ' + e.arg[0]);
        print('arg1 (uid) : ' + e.arg[1]);
        print('arg2 (color) : ' + e.arg[2]);
        print('arg3 (node_count): ' + e.arg[INDEX_OF_NODE_COUNT]);
        print('arg4: (node0.x)' + e.arg[4]);
        print('arg5: (node0.y)' + e.arg[5]);
        print('arg6: (edge_count)' + e.arg[index_of_edge_count]);
        print('arg7a: (edge0 st)' + e.arg[index_of_edge]);
        print('arg7b: (edge0 ed)' + e.arg[index_of_edge+1]);
        print('arg8: (h)' + index_of_hsv);
      }


      let node_index = 0;
      for(let i=0; i<(node_count*2); i=i+2){

        shape.nodes[node_index] = createVector( float(e.arg[i+INDEX_OF_NODE]) , float(e.arg[i+1+INDEX_OF_NODE]) );
        node_index+=1;

      }

      let edge_index = 0;
      for(let i=0; i<( (edge_count*2) ); i=i+2){

          let obj = new Object();
          obj.node_id_st = int( e.arg[ i+index_of_edge ] );
          obj.node_id_ed = int( e.arg[ i+1+index_of_edge ] );
          shape.edges[edge_index] = obj;
          edge_index+=1;

      }


      if(TEST_MODE==true){
        print('--STORED SHAPE--')
        print('arg3 (node_count): ' + shape.nodes.length);
        print('arg4: (node0.x)' + shape.nodes[0].x);
        print('arg5: (node0.y)' + shape.nodes[0].y);
        print('arg6: (edge_count)' + Object.keys(shape.edges).length);
        print('arg7a: (edge0 st)' + shape.edges[0].node_id_st);
        print('arg7b: (edge0 ed)' + shape.edges[0].node_id_ed);
        print('arg8: (h)' + index_of_hsv);
      }

      //Bang event to converted shape to agent
      let tmp = new CustomEvent('/convert_to_agent');
      tmp.shape = shape;
      document.dispatchEvent(tmp);
    }

  }
  document.addEventListener('/yaritori/post', sc2.posted);



  //Event Handler for agentAdd with direct
  // _.directPosted = function (e){ //OSC EVENT
  //
  //   if(e.arg[1]==SYS_ID){
  //     print(">>directPosted " , e.arg[0], e.arg[1]);
  //     let tmp = new Agent(agents.length);
  //     agmAdd(tmp);
  //   }
  //
  // }
  // document.addEventListener('/yaritori/post/direct', sc2.directPosted);
  //


  //Event Handler for StateChanged for ripple trigger
  _.stateWasChanged = function (e) {

    let tmp = new CustomEvent('/ripples/add');
    let vec = e.ag.position;
    tmp.posi = vec;
    tmp.size = e.ag.size*11.0;
    tmp.spd = 400+( 600*random() );
    document.dispatchEvent(tmp);


  }
  document.addEventListener('/state_changed' , sc2.stateWasChanged);



  _.addConvertedAgent = function (e) {

    agmAdd(e.ag);

  }
  document.addEventListener('/agent/converted' , sc2.addConvertedAgent);

})(sc2);
