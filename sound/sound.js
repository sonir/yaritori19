scount = 0;

var Snd = Snd || {};

(function(_){

  let s0 = null;
  let s1 = null;
  let silence = null;

  _.setup = function(e){

    silence = loadSound('assets/mute.mp3');
    s0 = loadSound('assets/c2.mp3');
    s1 = loadSound('assets/c1.mp3');


  }

  _.initPlay = function(){

    // silence.play();
    s0.play();


  }
  document.addEventListener('/init_play' , Snd.initPlay);


  _.trg = function(e){

    // print('trg!!')
    s1.play();
    let tmp = new CustomEvent('/send');
    tmp.data = '/foo 137 13.9';
    document.dispatchEvent(tmp);

  }
  document.addEventListener('/state_changed' , Snd.trg);


  _.update = function(e){

    // print('update:Snd');

  }
  document.addEventListener('/update', Snd.update);




})(Snd);


//////
