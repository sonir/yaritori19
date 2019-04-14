//config file for Yaritori2019

//TERMINAL_TYPE
// const TERMINAL_TYPE = SC_SIZE.IPHONE_X_W;
// const TERMINAL_TYPE = SC_SIZE.IPAD_PRO12_W;
// const TERMINAL_TYPE = SC_SIZE.AUTO;


//MODE
var PERFORMANCE_MODE = false;
var TEST_MODE = false;

//for Drone
const DENSITY_WITH_ACTIVE_ONLY = true;
//if false, the density is not decrease if some agents dead.


//////

//DANGEROUS_ZONE !!!!!
const INIT_AGENTS = false;
const INIT_AGENTS_CONFIRMATION = false;
//If you set the both params to true,
//when all data will be reset.


//////

//SCREEN SETUPS
var SC_DEBUG_FLG = false;
let BG_COLOR = 0;


//SCENE CONTROL
var INIT_SCENE = 0;//0
var FIRST_SCENE = 1;

//SYSTEM_VARIABLES
var UNIT_NUM = 12; //The iOS device max
var SYS_ID = 0;
var INTERVAL_OF_SYS_REPORT = 1000;
const INTERVAL_OF_SYS_BACKUP = 900000;//4000;//900000;

//CONTROL ROUTING
const OSC_ADR_FEED = '/ch6';
const KEY_VAL_FOR_FEED = 21.0;//12.0;//pre vol 6 apply to 1.95  //7.8;//1.95;//7.8; //FIX for change speed related ewith ag_num




//MODEL CONTROL
const AG_MOV_CTRL_MAX = 100.0;
var AG_MOV_CTRL = 1.0;
const AG_MAX = 100;
const AGM_INIT_NUM = 0;
