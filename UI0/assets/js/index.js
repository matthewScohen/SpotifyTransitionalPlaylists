function clearSongTable()
{
  songTable.clear();
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
addSongToTable(exampleSongData);
addSongToTable(exampleSongData);
addSongToTable(exampleSongData);
