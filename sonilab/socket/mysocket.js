var IP = '192.168.100.200';
// var IP = '192.168.100.201';
var PORT = '8080'
// var IP = window.location.host;

var connection = new WebSocket('ws://' + IP + ':' + PORT + '/maxmsp');

/////////////////////////////////////

//Conection Callback
connection.onopen = function(e) {

  console.log('Connected.');

  //This is start keyword
  var message = 'update on';
  connection.send(message);

};

//Receiving Callback
connection.onmessage = function(e) {

    console.log(e.data);

    var str = e.data;
    rcv = str.split(' ') //Store the params into an array
    //ADR= rcv[1] , arg1 = rcv[2] , arg3[3] ...
    print( rcv[1]+ " , " + float(rcv[2])+" , "+float(rcv[3]));
    rcv.shift(); //Del first element(rx)
    let tmp = new CustomEvent(rcv[0]);
    tmp.arg = rcv;

    document.dispatchEvent(tmp);

};


/////////////////////////////////////

var Sock = Sock || {};

(function(_){

  _.send = function(e){

    print('sockSend(): ', e.data);
    connection.send(e.data);

  }
  document.addEventListener('/send' , Sock.send);



})(Sock);


//////
