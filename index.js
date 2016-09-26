var _sonos = require('./sonos');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(5337,'0.0.0.0');

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/index.html' );
});


io.on('connection', function (socket) {
  socket.join('sonosroom'); //throw all connections into same room
  console.log('client connected');  
  
  socket.on('disconnect', function () {
    console.log('user disconnected');   
    
  });
  socket.on('listen', function() {
    console.log('start listening....');
    _sonos.startlistening(io);
  });
});
