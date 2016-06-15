var req = require('request');
var SerialPort = require('serialport').SerialPort;

var serial = new SerialPort("/dev/ttyACM0", {
	baudrate: 9600
}, false);

function main(){
	if(err)
		console.log(err.message);
	req('http://infinite-brushlands-67485.herokuapp.com/same', function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var jsonObj = JSON.parse(body);
			process(jsonObj);	
		}
	});
}

serial.open(function(err) {
	while(true){
		main();
		var stop2 = new Date().getTime();
		while(new Date().getTime() < stop2 + 5000);
	}
});


function process(object){
	object.forEach(function(o) {
		console.log((Math.floor(o['angle1']*(1023/Math.PI))+660)+","+Math.floor(o['angle2']*(1023/Math.PI))+","+(Math.floor(o['angle3']*(1023/Math.PI))+460));
		var stop = new Date().getTime();
		while(new Date().getTime() < stop + 2000);
		console.log('D'+(Math.floor(o['angle1']*(1023/Math.PI))+660)+' C'+(Math.floor(o['angle2']*(1023/Math.PI))+0)+' B'+(Math.floor(o['angle3']*(1023/Math.PI))+460)+' ');
		serial.write('D'+(Math.floor(o['angle1']*(1023/Math.PI))+660)+' C'+(Math.floor(o['angle2']*(1023/Math.PI))+0)+' B'+(Math.floor(o['angle3']*(1023/Math.PI))+460)+' ', function(err,bytesWritten){
			if(err) {
				console.log('Error: ',err.message);
			}
		});
		serial.write('A0 ');
	});
}
