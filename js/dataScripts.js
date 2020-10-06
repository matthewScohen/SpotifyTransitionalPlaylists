if(window.location.hash == "")
{
  window.location.replace("https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=token&redirect_uri=https://matthewscohen.github.io/SpotifyTransitionalPlaylists/&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",)
}
// token = window.location.hash;
token = window.location.hash.substr(1).split('&')[0].split("=")[1]

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//Get the users ID
var userId = spotifyApi.getMe().then(
  function(data) {
    console.log(data.id);
  },
  function (err) {
    console.error(err);
  }
);

function getPlaylistSongInfo(playlistID)
{
  var names = [];
  var audio_features = [];

  spotifyApi.getPlaylistTracks(playlistID)
  .then(function (trackData) {
    var ids = [];
    for(track in trackData.items)
    {
      ids.push(trackData.items[track].track.id);
      names.push(trackData.items[track].track.name);
    }
    return ids;
  })
  .then(function (trackIds) {
    return spotifyApi.getAudioFeaturesForTracks(trackIds);
  })
  .then(function (songInfoObject) {
    for(feature in songInfoObject.audio_features)
      audio_features.push(songInfoObject.audio_features[feature]);
  })
  .catch(function (error) {
    console.error(error);
  });
  return {
    names,
    audio_features
  };
}

spotifyApi
  .getUserPlaylists()
  .then(function (data) {
    return data.items[0].id;
  })
  .then(function (playlistID) {
    var info = getPlaylistSongInfo(playlistID);
    console.log(info.audio_features);
  });
