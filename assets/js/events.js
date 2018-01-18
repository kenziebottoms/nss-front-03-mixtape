"use strict";

const view = require("./view");
const search = require("./view_search");
const spotify = require("./apis/spotify");
const tmdb = require("./apis/tmdb");
const users = require("./users");

const initialize = () => {
    activateSearchButtons();
    activateSpotifyAuthButton();
    checkSpotifyAuth();
    view.populateUserInfo();
    activateLogInButton();
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
        books.searchTitle(term).then(results => {
            search.formatBookSearchResults(results);
        });
    });
};
// spotify
const activateSongSearchButton = () => {
    $("button.spotify.authorized").click(event => {
        let term = $("input.spotify.authorized").val();
        spotify.searchTracksTitle(term, 5).then(results => {
            search.formatSongSearchResults(results);
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
        tmdb.searchMovieTitle(term).then(results => {
            search.formatMovieSearchResults(results);
        });
    });
};
// the movie database: tv
const activateTVSearchButton = () => {
    $("button.tmdb.tv").click(event => {
        let term = $("input.tmdb.tv").val();
        tmdb.searchTVTitle(term).then(results => {
            search.formatTVSearchResults(results);
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
        spotify.logOut();
        $(".spotify.unauthorized").removeClass("d-none");
    }
};

const activateLogInButton = () => {
    $("#google-auth").on("click", event => {
        users.authUser().then(user => {
            console.log(user);
        });
    });
};

module.exports = {initialize};