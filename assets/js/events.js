"use strict";

const spotify = require("./spotify_auth");
const keys = require("./api_keys");
const view = require("./view");

const activateButtons = () => {
    activateSearchButtons();
};

const activateSearchButtons = () => {
    activateBookSearchButton();
    activateMovieSearchButton();
    activateTVSearchButton();
    initSpotifyAuth();
};

// ----- SEARCH BUTTONS ----- //

// google books
const activateBookSearchButton = () => {
    $("button.books").click(event => {
        let term = $("input.books").val();
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(term)}&maxResults=20`,
        }).done(response => {
            view.formatBookSearchResults(response);
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
            view.formatSongSearchResults(response);
        });
    });
};
// the movie database
const activateMovieSearchButton = () => {
    $("button.tmdb.movies").click(event => {
        let term = $("input.tmdb.movies").val();
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdb_public}&language=en-US&query=${encodeURI(term)}`
        }).done(response => {
            view.formatMovieSearchResults(response);
        });
    });
};
// the movie database: tv
const activateTVSearchButton = () => {
    $("button.tmdb.tv").click(event => {
        let term = $("input.tmdb.tv").val();
        $.ajax({
            url: `https://api.themoviedb.org/3/search/tv?api_key=${keys.tmdb_public}&language=en-US&query=${encodeURI(term)}`
        }).done(response => {
            view.formatTVSearchResults(response);
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