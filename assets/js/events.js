"use strict";

const spotify = require("./spotify_auth");
const keys = require("./api_keys");
const view = require("./view");

const activateButtons = () => {
    activateSearchButtons();
};

const activateSearchButtons = () => {
    activateGoogleBooksSearchButton();
    activateMoveDatabaseSearchButton();
    initSpotifyAuth();
};

// ----- SEARCH BUTTONS ----- //

// google books
const activateGoogleBooksSearchButton = () => {
    $("button.books").click(event => {
        let term = $("input.books").val();
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(term)}&maxResults=5`,
        }).done(response => {
            $("pre.books").html(JSON.stringify(response));
        });
    });
};
// spotify
const activateSpotifySearchButton = token => {
    $("button.spotify.authorized").click(event => {
        let term = $("input.spotify.authorized").val();
        $.ajax({
            url: `https://api.spotify.com/v1/search?q=title:${encodeURI(term)}&type=track&limit=5`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).done(response => {
            $("pre.spotify").html(JSON.stringify(response));
            view.formatTrackSearchResults(response);
        });
    });
};
// the movie database
const activateMoveDatabaseSearchButton = () => {
    $("button.tmdb").click(event => {
        let term = $("input.tmdb").val();
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=d7208980a35f7aef364e81fcb05147a4&language=en-US&query=${encodeURI(term)}`
        }).done(response => {
            $("pre.tmdb").html(JSON.stringify(response));
            view.formatMovieSearchResults(response);
        });
    });
};

// spotify auth flow
const initSpotifyAuth = () => {
    // authorize spotify button
    $("button.spotify.unauthorized").click(event => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${keys.spotify_public}&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback.html&scope=user-top-read%20user-read-currently-playing&response_type=token`;
    });
    // populate correct spotify buttons
    let spotify_token = spotify.getAccessToken();
    if (spotify_token) {
        $(".spotify.authorized").removeClass("d-none");
        if (window.location.href.toString().search("callback") > 0) {
            window.location.href = "http://localhost:8080";
        } else {
            activateSpotifySearchButton(spotify_token);
        }
    } else {
        $(".spotify.unauthorized").removeClass("d-none");
    }
};

module.exports = {activateButtons};