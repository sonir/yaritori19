scount = 0;
const GENRE_NUM = 6;
const GLITCH_DUR = 0.025;

var Snd = Snd || {};

(function(_){

  let s0 = null;
  let s1 = null;
  let silence = null;

  let glitch = null;

  let bank = {

    classic : null,
    hiphop : null,
    dance : null,
    jazz : null,
    pop : null,
    rock : null

  }


  _.preload = function(e){

    silence = loadSound('assets/mute.mp3');
    s0 = loadSound('assets/c2.mp3');
    s1 = loadSound('assets/c1.mp3');
    bank.classic = new Glitch('assets/1-cl.mp3');
    bank.hiphop = new Glitch('assets/2-hp.mp3');
    bank.dance = new Glitch('assets/3-dc.mp3');
    bank.jazz = new Glitch('assets/4-jz.mp3');
    bank.pop = new Glitch('assets/5-pp.mp3');
    bank.rock = new Glitch('assets/6-rk.mp3');
    glitch = bank.classic; //Set default bank

  }



  _.setup = function(e){


  }



  _.setGlitch = function(e){

    print(e.sys_id);
    let genre_id = e.sys_id%GENRE_NUM;
    switch(genre_id){

      case 0:
        glitch = bank.classic;
        print('set classic as glitch.')
        break;

      case 1:
        glitch = bank.hiphop;
        print('set hiphop as glitch.')
        break;

      case 2:
        glitch = bank.dance;
        print('set dance as glitch.')
        break;

      case 3:
        glitch = bank.jazz;
        print('set jazz as glitch.')
        break;

      case 4:
        glitch = bank.pop;
        print('set pop as glitch.')
        break;

      case 5:
        glitch = bank.rock;
        print('set rock as glitch.')
        break;

      default:
        print('ERR :: SOUND :: setGlitch() :: unknown genre was selected.');


    }
    //Set basic params
    glitch.setTickSec(0.1);
    glitch.setDuration(GLITCH_DUR);


  }
  document.addEventListener('/set_glitch' , Snd.setGlitch);



  _.initPlay = function(){

    // silence.play();
    s0.play();
    glitch.playWithRandom();

  }
  document.addEventListener('/init_play' , Snd.initPlay);


  _.trg = function(e){

    // s1.play();
    glitch.playWithRandom();

    let tmp = new CustomEvent('/send');
    tmp.data = '/sound/trg ' + SYS_ID;
    document.dispatchEvent(tmp);

  }
  document.addEventListener('/state_changed' , Snd.trg);


  _.update = function(e){

    // print('update:Snd');

  }
  document.addEventListener('/update', Snd.update);




})(Snd);


//////
