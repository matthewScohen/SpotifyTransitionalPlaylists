if(window.location.hash == "")
{
  window.location.replace("https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=token&redirect_uri=https://matthewscohen.github.io/SpotifyTransitionalPlaylists/&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",)
}
token = window.location.hash;
// token = window.location.hash.substr(1).split('&')[0].split("=")[1]
console.log(token);
