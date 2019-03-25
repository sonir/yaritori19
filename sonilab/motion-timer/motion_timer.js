class MotionTimer {



  constructor(duration_ms){

    print('const!!!');
    this.set(duration_ms);

  }


  set(duration_ms){

    print('set');
    this.born_t = millis();
    this.duration = duration_ms;
    this.tick = 1.0/duration_ms;
    this.elapse = 0.0;
    this.now = 0;

  }


  update(){

    this.now = millis();
    this.elapse = this.now - this.born_t;
    return (this.elapse*this.tick);

  }



}
