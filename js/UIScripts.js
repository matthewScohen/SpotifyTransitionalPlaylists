function clearSongTable()
{
  songTable.clear().draw();
}
function addSongToTable(songData)
{
  songTable.row.add( [
    songData.title,
    songData.duration,
    songData.time_sig,
    songData.key,
    songData.mode,
    songData.acoust,
    songData.dance,
    songData.energy,
    songData.instru,
    songData.liveness,
    songData.loudness,
    songData.speech,
    songData.valence,
    songData.tempo
  ] ).draw();
};

var exampleSongData = {
  title: "Title of song",
  duration: "4:05",
  time_sig: "4/4",
  key: "A",
  mode: "Major",
  acoust: 0.34,
  dance: 0.26,
  energy: 0.74,
  instru: 0.96,
  liveness: 0.24,
  loudness: 0.65,
  speech: 0.12,
  valence: 0.45,
  tempo: 45
};
clearSongTable();
// for(var i in firstPlaylistInfo.names)
// {
//   var songData = {
//     title: firstPlaylistInfo.names[i],
//     duration: firstPlaylistInfo.audio_features[i].duration_ms,
//     time_sig: firstPlaylistInfo.audio_features[i].time_signature,
//     key: firstPlaylistInfo.audio_features[i].key,
//     mode: firstPlaylistInfo.audio_features[i].mode,
//     acoust: firstPlaylistInfo.audio_features[i].acousticness,
//     dance: firstPlaylistInfo.audio_features[i].danceability,
//     energy: firstPlaylistInfo.audio_features[i].energy,
//     instru: firstPlaylistInfo.audio_features[i].instrumentalness,
//     liveness: firstPlaylistInfo.audio_features[i].liveness,
//     loudness: firstPlaylistInfo.audio_features[i].loudness,
//     speech: firstPlaylistInfo.audio_features[i].speechiness,
//     valence: firstPlaylistInfo.audio_features[i].valence,
//     tempo: firstPlaylistInfo.audio_features[i].tempo
//   }
//   addSongToTable(songData);
// }
