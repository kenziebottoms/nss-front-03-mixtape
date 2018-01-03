"use strict";

const activateButtons = () => {
    $("button.books").click(event => {
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=quilting&maxResults=5",
            crossDomain : true
        }).done(response => $("pre.books").html(JSON.stringify(response)));
    });
    $("button.spotify").click(event => {
        console.log("Spotify");
    });
    $("button.tmdb").click(event => {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/tv?api_key=d7208980a35f7aef364e81fcb05147a4&language=en-US&query=sense8"
        }).done(response => $("pre.tmdb").html(JSON.stringify(response)));
    });
};

module.exports = {activateButtons};