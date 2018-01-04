"use strict";

const view = require("./view_search");
const spotify = require("./apis/spotify");
const tmdb = require("./apis/tmdb");

const activateListeners = () => {
    activateSearchButtons();
    activateSpotifyAuthButton();
    checkSpotifyAuth();
};

const activateSearchButtons = () => {
    activateBookSearchButton();
    activateMovieSearchButton();
    activateTVSearchButton();
};

const activateSpotifyAuthButton = () => {
    // "authorize spotify" button
    $("button.spotify.unauthorized").click(event => {
        spotify.authorize();
    });
};

// ----- SEARCH BUTTONS ----- //

// google books
const activateBookSearchButton = () => {
    const books = require("./apis/books");
    $("button.books").click(event => {
        let term = $("input.books").val();
        books.searchTitle(term).then(response => {
            view.formatBookSearchResults(response);
        });
    });
};
// spotify
const activateSongSearchButton = () => {
    $("button.spotify.authorized").click(event => {
        let term = $("input.spotify.authorized").val();
        spotify.searchTracksTitle(term, 5).then(response => {
            view.formatSongSearchResults(response);
        });
        // .catch(reponse => {
            // TODO catch an expired token, try again
        // })
    });
};
// the movie database
const activateMovieSearchButton = () => {
    $("button.tmdb.movies").click(event => {
        let term = $("input.tmdb.movies").val();
        tmdb.searchMovieTitle(term).then(response => {
            view.formatMovieSearchResults(response);
        });
    });
};
// the movie database: tv
const activateTVSearchButton = () => {
    $("button.tmdb.tv").click(event => {
        let term = $("input.tmdb.tv").val();
        tmdb.searchTVTitle(term).then(response => {
            view.formatTVSearchResults(response);
        });
    });
};

// spotify auth flow
const checkSpotifyAuth = () => {
    // populate correct spotify buttons
    let spotify_token = spotify.getAccessToken();
    if (spotify_token) {
        $(".spotify.authorized").removeClass("d-none");
        if (window.location.href.toString().search("callback") > 0) {
            window.location.href = "http://localhost:8080";
        } else {
            activateSongSearchButton(spotify_token);
        }
    } else {
        $(".spotify.unauthorized").removeClass("d-none");
    }
};

module.exports = {activateListeners};