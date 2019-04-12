//config file for Yaritori2019

//TERMINAL_TYPE
// const TERMINAL_TYPE = SC_SIZE.IPHONE_X_W;
// const TERMINAL_TYPE = SC_SIZE.IPAD_PRO12_W;
// const TERMINAL_TYPE = SC_SIZE.AUTO;


//MODE
var PERFORMANCE_MODE = true;
var TEST_MODE = true;

//SCREEN SETUPS
var SC_DEBUG_FLG = false;
let BG_COLOR = 20;


//SCENE CONTROL
var INIT_SCENE = 0;//0
var FIRST_SCENE = 1;

//SYSTEM_VARIABLES
var UNIT_NUM = 12; //The iOS device max
var SYS_ID = 0;
var INTERVAL_OF_SYS_REPORT = 1000;

//CONTROL ROUTING
const OSC_ADR_FEED = '/ch6';
const KEY_VAL_FOR_FEED = 21.0;//12.0;//pre vol 6 apply to 1.95  //7.8;//1.95;//7.8; //FIX for change speed related ewith ag_num

//MODEL CONTROL
const AG_MOV_CTRL_MAX = 100.0;
var AG_MOV_CTRL = 1.0;
const AG_MAX = 100;
const AGM_INIT_NUM = 0;
