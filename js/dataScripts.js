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

function updateTableWithPlaylist(playlistID)
{
  var names = [];
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
    for(var i = 0; i < names.length; i++) {
      var songData = {
        title: names[i],
        duration: songInfoObject.audio_features[i].duration_ms,
        time_sig: songInfoObject.audio_features[i].time_signature,
        key: songInfoObject.audio_features[i].key,
        mode: songInfoObject.audio_features[i].mode,
        acoust: songInfoObject.audio_features[i].acousticness,
        dance: songInfoObject.audio_features[i].danceability,
        energy: songInfoObject.audio_features[i].energy,
        instru: songInfoObject.audio_features[i].instrumentalness,
        liveness: songInfoObject.audio_features[i].liveness,
        loudness: songInfoObject.audio_features[i].loudness,
        speech: songInfoObject.audio_features[i].speechiness,
        valence: songInfoObject.audio_features[i].valence,
        tempo: songInfoObject.audio_features[i].tempo
      };
      addSongToTable(songData);
    }
  })
  .catch(function (error) {
    console.error(error);
  });
}

//Update table with info from the user's first playlist
spotifyApi
  .getUserPlaylists()
  .then(function (data) {
    return data.items[0].id;
  })
  .then(function (playlistID) {
    updateTableWithPlaylist(playlistID);
  });
