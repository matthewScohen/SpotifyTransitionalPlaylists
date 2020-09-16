popup = window.open(
  "https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=code&redirect_uri=https://matthewscohen.github.io/SpotifyTransitionalPlaylists/&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",
  'Login with Spotify',
  'width=800,height=600'
)

// window.location.replace("https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=code&redirect_uri=&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",)

window.spotifyCallback = (payload) => {
  popup.close()
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${payload}`
    }
  }).then(response => {
    return response.json()
  }).then(data => {
    console.log(data);
  })
}

// token = window.location.hash.substr(1).split('&')[0].split("=")[1]
// if (token) {
//   window.opener.spotifyCallback(token)
// }
