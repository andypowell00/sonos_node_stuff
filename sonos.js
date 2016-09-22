
var Sonos = require('./node_modules/sonos/index').Sonos
var util = require('util');
var Listener = require('./node_modules/sonos/lib/events/listener.js')
var _sonos = new Sonos(process.env.SONOS_HOST || '10.20.0.62')
var x = new Listener(_sonos);

//start socket listening

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(80);

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/index.html' );
});


io.on('connection', function (socket) {
  startSonosListener(socket);
  console.log('client connected');
  

  socket.on('disconnect', function () {
    console.log('user disconnected');
    
  });
});

//connect to sonos and emit when event occurs
function startSonosListener(socket){

x.listen(function(err) {
  if (err) throw err;
  
  x.addService('/MediaRenderer/AVTransport/Event', function(error, sid) {
    if (error) throw err;
    console.log('Successfully subscribed, with subscription id', sid);
    
  });

  x.on('serviceEvent', function(endpoint, sid, data) {
    console.log('Received event from', endpoint, '(' + sid + ') with data:', data, '\n\n');

 _sonos.currentTrack(function(err, track) {
        socket.emit('newtrack', track);
        });

 
 });
});
}







