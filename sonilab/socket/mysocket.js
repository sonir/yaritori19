var IP = 'localhost';
// var IP = window.location.host;

var connection = new WebSocket('ws://' + IP + ':8080' + '/maxmsp');

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

};


/////////////////////////////////////
