var _sonos = require('./sonos');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(80,'10.20.0.156');

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/index.html' );
});


io.on('connection', function (socket) {
  _sonos.startlistening(socket);
  console.log('client connected');
  
  
  socket.on('disconnect', function () {
    console.log('user disconnected');
    
  });
});
