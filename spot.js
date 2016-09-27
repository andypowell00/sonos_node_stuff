var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
const util = require('util')


module.exports = {

  search: function(name){
      spotifyApi.searchArtists(name)
  .then(function(data) {

    console.log('test = ' + util.inspect(data.body.artists.items[0]));

  }, function(err) {
    console.error(err);
  });
  /*spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then(function(data) {
    console.log('Artist information', data.body);
  }, function(err) {
    console.error(err);
  });*/
  }

}