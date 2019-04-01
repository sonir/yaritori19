let ev_send = new CustomEvent("/send")
let rep_timer = null;

function reportSetup(){

  rep_timer = new MotionTimer(INTERVAL_OF_SYS_REPORT);

}
document.addEventListener('/setup', reportSetup);


function report(e){

  // print("report!!: " , e.density);
  // print(rep_timer.update());
  if(rep_timer.update() > 1.0){
    // print("report!!: " , e.density);
    ev_send.data = '/sys/report ' + str(SYS_ID) + ' ' + str(e.density);
    document.dispatchEvent(ev_send);
    rep_timer.reset();
  }


}
document.addEventListener("/sys/report" , report);
