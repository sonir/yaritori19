class MotionTimer {



  constructor(duration_ms){

    this.set(duration_ms);
    this.rst = 0.0;

  }


  set(duration_ms){

    this.born_t = millis();
    this.duration = duration_ms;
    this.tick = 1.0/duration_ms;
    this.elapse = 0.0;
    this.now = 0;

  }


  update(){

    this.now = millis();
    this.elapse = this.now - this.born_t;
    this.rst = this.elapse*this.tick;
    if(this.rst > 1.0)this.rst = 1.0;
    return this.rst;

  }


  updateInvert(){

    return 1 - this.update();

  }


  reset(){

    this.set(this.duration);

  }



}
