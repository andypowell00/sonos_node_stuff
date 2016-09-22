
var Sonos = require('./node_modules/sonos/index').Sonos
var util = require('util');
var Listener = require('./node_modules/sonos/lib/events/listener.js')
var _sonos = new Sonos(process.env.SONOS_HOST || '10.20.0.62')
var x = new Listener(_sonos);
var isConnected = false;


//start socket listening


var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  startSonosListener(socket);
  console.log('client connected');
  isConnected = true;
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
    isConnected = false;
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
        console.log('--track below--')
        //console.log(err, track);
        socket.emit('newtrack', track.title);
        console.log(track.title); });

 
 });
});
}







