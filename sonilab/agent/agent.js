var STATE = {

  CALM : 1,
  RUN : 2,
  CHASE : 3,
  DMG : 4,
  DEAD : 5

};

//Default Params
const AG_VIEW_DEF = 0.25//0.025//0.05;
var AG_VIEW_MOD = 0.0;
if(PERFORMANCE_MODE){

  AG_VIEW_MOD = 35.0;

}else{

  AG_VIEW_MOD = 0.25;//1.0;

}

const AG_MOV_DEF = 0.005;
const AG_NEAREST_DEF = -1;
const AG_STSTE_DEF = STATE.CALM;
const AG_DISTANT_WITH_NEAREST_DEF = 0.0;
const AG_DISTANCE_FOR_DMG = AG_VIEW_DEF*0.3;
const AG_DMG_TICK = 0.00000005;//0.0000035;
const AG_DEATH_THREATH =0.00005; //0.0001

//Fix or MOD for Interactions
const SIZE_MOD = 0.03;
const SPD_MOD =  0.00000125;//0.0000025;
// const SPD_ACTIVE_MOD = 3.0;
// const SPD_RUNCHASE_MOD = SPD_MOD*SPD_ACTIVE_MOD;
const SPD_RUNCHASE_MOD = 2.7;
const SPD_MAX = 0.00026;//0.00025;

const AG_NODE_MAX = 7;
const AG_NODE_MIN = 3;
const AG_ANIM_SPD = 0.03; //0.03
const AG_ANIM_LIM = 5.0;

const NODE_SIZE = 80;



class Agent {

  constructor(num){

    //System Params
    this.uid = num;
    this.active = true;
    this.state = AG_STSTE_DEF;
    this.prestate = AG_STSTE_DEF;

    //Basic Params
    this.size = random(0.01 , 1.0) * SIZE_MOD;
    this.view = random();//AG_VIEW_DEF;
    this.mov = AG_MOV_DEF;
    this.nearest_id =AG_NEAREST_DEF;
    this.nearest_ag = null;
    this.distance_with_nearest = AG_DISTANT_WITH_NEAREST_DEF;

    //Positon and Move
    this.position = createVector( random(0.0, 1.0) , random(0.0, 1.0) );
    this.spd = createVector( 0.0 , 0.0);
    this.color = color( random(0,255) , random(0,255) , random(0,255) );


    //Draw
    this.nodes = [AG_NODE_MAX];
    this.node_seeds = [AG_NODE_MAX]; //make seeds for animation
    this.node_count = Math.round( random(AG_NODE_MIN , AG_NODE_MAX) );
    for(let i=0; i<this.node_count; i++){
      this.nodes[i] = createVector( random(-1.0 , 1.0) , random(-1.0 , 1.0) );
      this.node_seeds[i] = createVector( random(0.0 , 1.0) , random(0.0 , 1.0) );
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
        v = createVector( (random(-1,1)*SPD_MOD) , (random(-1,1)*SPD_MOD) );
        this.spd = AgTools.calVel(v, this.spd);
        break;

      case STATE.RUN:
        theta = cal_deg(this.nearest_ag.position.x , this.nearest_ag.position.y , this.position.x , this.position.y);
        v = cal_pos(theta, random(0.0 , this.mov)*SPD_RUNCHASE_MOD);
        reaction(v,this);
        break;

      case STATE.CHASE:
        theta = cal_deg(this.position.x , this.position.y  , this.nearest_ag.position.x , this.nearest_ag.position.y);
        v = cal_pos(theta, random(0.0 , this.mov)*SPD_RUNCHASE_MOD);
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

    //Update node positions
    this.updateNodesPosition();
    /////
  }


  updateNodesPosition(){

    for(let i=0; i<this.node_count; i++){

      this.nodes[i].x += ( AgTools.scale2amp( noise(this.node_seeds[i].x) )*AG_ANIM_SPD );
      this.nodes[i].y += ( AgTools.scale2amp( noise(this.node_seeds[i].y) )*AG_ANIM_SPD );
      this.node_seeds[i].x += random(0.01, 0.04);
      this.node_seeds[i].y += random(0.01, 0.04);

    }

  }


  updateState(current){

    this.prestate = this.state;
    this.state = current;

  }



} //End of class
