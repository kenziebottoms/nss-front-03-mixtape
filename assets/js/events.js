"use strict";

const view = require("./view");
const search = require("./view_search");
const spotify = require("./apis/spotify");
const tmdb = require("./apis/tmdb");

const initialize = () => {
    activateSpotifyAuthButton();
    checkSpotifyAuth();
    view.populateUserInfo();
    view.displayRecentMedia();
};

const activateSpotifyAuthButton = () => {
    // "authorize spotify" button
    $("button.spotify.unauthorized").click(event => {
        spotify.authorize();
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
        }
    } else {
        spotify.logOut();
        $(".spotify.unauthorized").removeClass("d-none");
    }
};

module.exports = {initialize, checkSpotifyAuth};