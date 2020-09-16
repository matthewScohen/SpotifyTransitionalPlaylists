// popup = window.open(
//   "https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=code&redirect_uri=https://matthewscohen.github.io/SpotifyTransitionalPlaylists/&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",
//   'Login with Spotify',
//   'width=800,height=600'
// )
//
// // window.location.replace("https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=code&redirect_uri=&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",)
//
// window.spotifyCallback = (payload) => {
//   popup.close()
//   fetch('https://api.spotify.com/v1/me', {
//     headers: {
//       'Authorization': `Bearer ${payload}`
//     }
//   }).then(response => {
//     return response.json()
//   }).then(data => {
//     console.log(data);
//   })
// }
//
// // token = window.location.hash.substr(1).split('&')[0].split("=")[1]
// // if (token) {
// //   window.opener.spotifyCallback(token)
// // }
function implicitGrantFlow() {
/* If access token has been assigned in the past and is not expired, no request required. */
if (sessionStorage.getItem("accessToken") !== null &&
    sessionStorage.getItem("tokenTimeStamp") !== null &&
    upTokenTime < tokenExpireSec) {
        var timeLeft = (tokenExpireSec - upTokenTime);
        console.log("Token still valid: " + Math.floor(timeLeft / 60) + " minutes left.");

        /* Navigate to the home page. */
        $(location).attr('href', "home.jsp");
} else {
    console.log("Token expired or never found, getting new token.");
    $.ajax({
        url: "https://accounts.spotify.com/authorize?client_id=4f80521dc4c84c6eb92da6f9b5c06458&response_type=code&redirect_uri=https://matthewscohen.github.io/SpotifyTransitionalPlaylists/&scope=playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=34fFs29kd09",
        type: 'GET',
        contentType: 'application/json',
        data: {
            client_id: "4f80521dc4c84c6eb92da6f9b5c06458",
            redirect_uri: "https://matthewscohen.github.io/SpotifyTransitionalPlaylists/",
            response_type: response_type_token,
        }
    }).done(function callback(response) {
        /* Redirect user to home page */
        console.log("COULD THIS BE A SUCCESS?");
        $(location).attr('href', this.url);

    }).fail(function (error) {
        /* Since we cannot modify the server, we will always fail. */
        console.log("ERROR HAPPENED: " + error.status);
        console.log(this.url);
        $(location).attr('href', this.url);
    });
  }
}
function getAccessToken() {

    access_token = sessionStorage.getItem("accessToken");

    if (access_token === null) {
        if (window.location.hash) {
            console.log('Getting Access Token');

            var hash = window.location.hash.substring(1);
            var accessString = hash.indexOf("&");

            /* 13 because that bypasses 'access_token' string */
            access_token = hash.substring(13, accessString);
            console.log("Access Token: " + access_token);

            /* If first visit or regaining token, store it in session. */
            if (typeof(Storage) !== "undefined") {
                /* Store the access token */
                sessionStorage.setItem("accessToken", access_token); // store token.

                /* To see if we need a new token later. */
                sessionStorage.setItem("tokenTimeStamp", secondsSinceEpoch);

                /* Token expire time */
                sessionStorage.setItem("tokenExpireStamp", secondsSinceEpoch + 3600);
                console.log("Access Token Time Stamp: "
                + sessionStorage.getItem("tokenTimeStamp")
                + " seconds\nOR: " + dateNowMS + "\nToken expires at: "
                + sessionStorage.getItem("tokenExpireStamp"));
            } else {
                alert("Your browser does not support web storage...\nPlease try another browser.");
            }
        } else {
            console.log('URL has no hash; no access token');
        }
    } else if (upTokenTime >= tokenExpireSec) {
        console.log("Getting a new acess token...Redirecting");

        /* Remove session vars so we dont have to check in implicitGrantFlow */
        sessionStorage.clear();

        $(location).attr('href', 'index.html'); // Get another access token, redirect back.

    } else {
        var timeLeft = (tokenExpireSec - upTokenTime);
        console.log("Token still valid: " + Math.floor(timeLeft / 60) + " minutes left.");
    }
  }
