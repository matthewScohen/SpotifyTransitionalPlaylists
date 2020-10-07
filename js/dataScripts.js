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

function addPlaylistSongsToTable(playlistID, offset) //Can request a max of 100 songs at a time
{
  var names = [];
  spotifyApi.getPlaylistTracks(playlistID)
  .then(function (trackData) {
    var ids = [];
    console.log(trackData.items);
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
      //Limit the max title length
      var maxTitleCharacters = 25;
      var title = names[i];
      if(title.length > 25)
        title = title.substring(0,25).concat("...");
      var songData = {
        title: title,
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
    console.log(data.items[1]);
    return data.items[1].id;
  })
  .then(function (playlistID) {
    addPlaylistSongsToTable(playlistID);
  });
