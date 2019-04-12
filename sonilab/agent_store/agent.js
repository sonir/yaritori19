var STATE = {

  CALM : 1,
  RUN : 2,
  CHASE : 3,
  DMG : 4,
  DEAD : 5

};

//Default Params
const AG_VIEW_DEF = 0.25//0.025//0.05;
var AG_VIEW_MOD = 1.0;
var AG_DMG_TICK = 0.00000005;//0.0000035;

if(PERFORMANCE_MODE){

  AG_VIEW_MOD = 0.5;
  AG_DMG_TICK = 0.000005;

}else{

  AG_VIEW_MOD = 0.25;//1.0;
  AG_DMG_TICK = 0.00000005;

}

const AG_MOV_DEF = 0.005;
const AG_NEAREST_DEF = -1;
const AG_STSTE_DEF = STATE.CALM;
const AG_DISTANT_WITH_NEAREST_DEF = 0.0;
const AG_DISTANCE_FOR_DMG = AG_VIEW_DEF*0.3;


const AG_DEATH_THREATH = 0.00005;//1.0;//0.00005; //0.0001

//Fix or MOD for Interactions
const SIZE_MOD = 0.03;
const SPD_MOD =  0.00000125;//0.0000025;
// const SPD_ACTIVE_MOD = 3.0;
// const SPD_RUNCHASE_MOD = SPD_MOD*SPD_ACTIVE_MOD;
const SPD_RUNCHASE_MOD = 2.7;
const SPD_MAX = 0.00026;//0.00025;

const AG_NODE_MAX = 7;
const AG_NODE_MIN = 3;
// const AG_ANIM_SPD = 0.3;//0.03; //0.03
const AG_ANIM_LIM = 5.0;

const NODE_SIZE = 80;



class Agent {

  constructor(num){

    //System Params
    this.uid = num;
    this.active = true;
    this.state = AG_STSTE_DEF;
    this.prestate = AG_STSTE_DEF;
    this.nodes_update = false; //mutex flag for nodesUpdate
    // this.edges_update = false; //mutex flag for edgesUpdate

    //Basic Params
    this.size = random(0.01 , 1.0) * SIZE_MOD;
    this.view = random();//AG_VIEW_DEF;
    this.mov = random()*AG_MOV_DEF;
    this.nearest_id =AG_NEAREST_DEF;
    this.nearest_ag = null;
    this.distance_with_nearest = AG_DISTANT_WITH_NEAREST_DEF;

    //Positon and Move
    this.position = createVector( random(0.0, 1.0) , random(0.0, 1.0) );
    this.spd = createVector( 0.0 , 0.0);
    this.color = color( random(0,255) , random(0,255) , random(0,255) );


    //Draw
    this.nodes = [AG_NODE_MAX];
    this.nodes_now = [AG_NODE_MAX];
    this.node_seeds = [AG_NODE_MAX]; //make seeds for animation
    this.edges = [];
    this.node_count = Math.round( random(AG_NODE_MIN , AG_NODE_MAX) );
    // this.node_count = 3;
    for(let i=0; i<this.node_count; i++){
      this.nodes[i] = createVector( random(-1.0 , 1.0) , random(-1.0 , 1.0) );
      this.nodes_now[i] = this.nodes[i]; //Init the node position array for animation with same value of the origin
      this.node_seeds[i] = createVector( random(0.0 , 1.0) , random(0.0 , 1.0) );
    }
    //Make Edges
    for(let i=0; i<this.nodes.length; i++){

      let obj = new Object();
      obj.node_id_st = i;
      obj.node_id_ed = i+1;

      //Make loop
      if(i == (this.nodes.length-1)){

        obj.node_id_ed = 0;

      }

      this.edges[i]=obj;

    }


  }


  walk(){

    let v; //variable for vector
    let theta; //theta

    let reaction = function(v,me){

      me.spd = AgTools.calVel(v , me.spd);

    }



    switch(this.state){


      case STATE.CALM:
        v = createVector( (random(-1,1)*SPD_MOD*AG_MOV_CTRL) , (random(-1,1)*SPD_MOD*AG_MOV_CTRL) );
        this.spd = AgTools.calVel(v, this.spd);
        break;

      case STATE.RUN:
        theta = cal_deg(this.nearest_ag.position.x , this.nearest_ag.position.y , this.position.x , this.position.y);
        v = cal_pos(theta, random(0.0 , this.mov)*SPD_RUNCHASE_MOD*AG_MOV_CTRL);
        reaction(v,this);
        break;

      case STATE.CHASE:
        theta = cal_deg(this.position.x , this.position.y  , this.nearest_ag.position.x , this.nearest_ag.position.y);
        v = cal_pos(theta, random(0.0 , this.mov)*SPD_RUNCHASE_MOD*AG_MOV_CTRL);
        reaction(v,this);
        // DMG check
        if(this.distance_with_nearest<AG_DISTANCE_FOR_DMG){

          this.size += AG_DMG_TICK;
          this.nearest_ag.size -= AG_DMG_TICK;

        }
        break;

      case STATE.DMG:
        break;

      case STATE.DEAD:
        break;

      default:
        break;

    }
    this.position.add(this.spd);

    //Limitter
    if(this.position.x>1.0){
      this.position.x = 0.0;
    }else if(this.position.x<0.0){
      this.position.x = 1.0;
    }

    if(this.position.y>1.0){
      this.position.y = 0.0;
    }else if(this.position.y<0.0){
      this.position.y = 1.0;
    }

  } //end of agent



  updateState(current){

    this.prestate = this.state;
    this.state = current;

  }


  updateNodes(nds){

    this.nodes_tmp = [];
    this.nodes_tmp = nds.slice(); //Copy the array

  }



  updateNodesExe(){ //actual reflect the received param

    this.nodes = [];
    this.nodes_now = [];
    this.node_seeds = [];
    this.nodes = this.nodes_tmp.slice(); //Copy the array
    this.nodes_now = this.nodes_tmp.slice();

    for(let i=0; i<this.nodes.length;i++){

      let tmp = createVector( random(0.0 , 1.0) , random(0.0 , 1.0) );
      this.node_seeds.push(tmp);

    } //end of for


  }



  updateEdges(eds){

    this.edges_tmp = [];
    this.edges_tmp = eds.slice();

  }



  updateEdgesExe(){ //actual reflect the received param

    this.edges = [];
    this.edges = this.edges_tmp.slice();

  }


  updateShape(nds,eds){

    this.updateNodes(nds);
    this.updateEdges(eds);
    this.flgShapeUpdate2True();


  }



  flgShapeUpdate2True(){

    this.nodes_update = true;

  }



  flgShapeUpdate2False(){

    this.nodes_update = false;

  }



  updateColor(clr){

    this.color = clr;

  }



} //End of class
