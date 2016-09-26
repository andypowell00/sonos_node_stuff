
var Sonos = require('./node_modules/sonos/index').Sonos
var util = require('util');
var Listener = require('./node_modules/sonos/lib/events/listener.js')
var _sonos = new Sonos(process.env.SONOS_HOST || '10.20.0.62')
var x = new Listener(_sonos);
var isListening = false;
var sidholder = "";


//connect to sonos and emit when event occurs
module.exports = {
startlistening: function (io){

x.listen(function(err) {
  if (err) throw err;
  
  x.addService('/MediaRenderer/AVTransport/Event', function(error, sid) {
    if (error) throw err;
    console.log('Successfully subscribed, with subscription id', sid);
  });
  x.on('serviceEvent', function(endpoint, sid, data) {
    console.log('Received event from', endpoint, '(' + sid + ') with data:', data, '\n\n');
    isListening = true;
    sidholder = sid;
  currTrack(io);
 });
});
}//end startlistening()
,newConnect: function(io){
       currTrack(io);
}
,veto:  function(){

      /*_sonos.next(function (err, nexted) {
        if (!err || !nexted) {
          console.log('Complete');
        } else {
          console.log('errrrrrrrrrrrrrr');
        }});*/
        _sonos.play('http://www.freesfx.co.uk/rx2/mp3s/5/16800_1460741032.mp3', function (err, playing) {
          console.log([err, playing])
        });

}
,checkListener: function(){
  
  return isListening;
},
killListener: function(){
  x.removeService(sidholder,function(err){
  if(err) throw err;
  console.log('service killed');
  isListening = false;
  });
  
}

}

function currTrack(io){
        _sonos.currentTrack(function(err, track) {
        if(err) throw err;
        io.to('sonosroom').emit('newtrack', track); //broadcast changes to the room
        });
}







