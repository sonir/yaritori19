
var GLITCH_MODE = {
    MONO : 1,
    POLY : 2
};


class Glitch {


  constructor(filename){

    this.buf = loadSound(filename, this.initSound);
    this.tick = 0.1;
    this.mode = GLITCH_MODE.POLY;
    this.duration = 0.1;
    this.index_max = this.calcIndexMax();
    this.dice = 0;

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

    this.dice = int(random()*this.index_max);
    // print(dice , "|",this.index_max,"|",this.tick, "|" , this.buf.duration());
    // print(this.calcIndexMax());
    this.play(this.dice);
  }



  play(index){


    if( !this.buf.isLoaded() ){

      print("CAUTION :: The sound is loading now. Ignore this trigger.");
      return;

    }

    //This sound trigger is monophonic. Ignore trigger until the end of playback.
    if( this.buf.isPlaying() ){

      // print('the sound is playing now. ignore it');
      return;

    }

    // this.buf.stop(); //This glitch is monophonic.
    try {
      this.buf.jump(index*this.tick, this.duration);
    }
    catch {
      this.buf.jump(index*this.tick);
    }

  }


}
