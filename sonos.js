
var Sonos = require('./node_modules/sonos/index').Sonos
var util = require('util');
var Listener = require('./node_modules/sonos/lib/events/listener.js')
var _sonos = new Sonos(process.env.SONOS_HOST || '10.20.0.62')
var x = new Listener(_sonos);


//connect to sonos and emit when event occurs
module.exports = {
startlistening: function (socket){

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
}//end startlistening()

,veto:  function(){


}

}







