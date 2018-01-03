"use strict";

const keys = require("./api_keys");

const activateButtons = () => {
    $("button.books").click(event => {
        let term = $("input.books").val();
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=5`,
            crossDomain : true
        }).done(response => $("pre.books").html(JSON.stringify(response)));
    });
    $("button.spotify").click(event => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${keys.spotify_public}&response_type=code&redirect_uri=localhost:8080&scope=${encodeURIComponent("user-top-read user-read-currently-playing")}`;
    });
    $("button.tmdb").click(event => {
        let term = $("input.tmdb").val();
        $.ajax({
            url: `https://api.themoviedb.org/3/search/tv?api_key=d7208980a35f7aef364e81fcb05147a4&language=en-US&query=${term}`
        }).done(response => $("pre.tmdb").html(JSON.stringify(response)));
    });
};

module.exports = {activateButtons};