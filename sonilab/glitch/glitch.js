
var GLITCH_MODE = {
    MONO : 1,
    POLY : 2
};


class Glitch {


  constructor(filename){

    this.buf = loadSound(filename);
    this.tick = 0.1;
    this.mode = GLITCH_MODE.POLY;
    this.duration = 0.1;
    this.index_max = this.calcIndexMax();

  }



  setTickSec(fval){

    this.tick = fval;


  }


  calcIndexMax(){

    return int(this.buf.duration()/this.tick);

  }



  setPlaybackMode(specified_glitch_mode){

    //THIS VERSION IS MONOPHONIC !!! IT DOES NOT WORK.

    this.mode = specified_glitch_mode;

    switch(this.mode){

      case GLITCH_MODE.MONO:
        // this.buf.playMode('restart');
        break;

      case GLITCH_MODE.POLY:
        // this.buf.playMode('sustain');
        break;

      default:
      print('ERR :: Glitch::unoknown playback mode was specifird.')
      break;

    }

  }



  setDuration(fval){

    this.duration = fval;
    this.index_max = this.calcIndexMax();

  }



  playWithRandom(){

    let dice = int(random()*this.index_max);
    this.play(dice);
  }



  play(index){
    print(index);

    try {
      this.buf.jump(index*this.tick, this.duration);
    }
    catch {
      this.buf.jump(index*this.tick);
    }
    // print('play with index: ' , index, ' current: ' , index*this.tick );
    // print(this.duration);

  }


}
