"use strict";

const activateButtons = () => {
    $("button.goodreads").click(event => {
        $.get("https://www.goodreads.com/search/index.xml?key=tFNCKRwqZ35i7OyfOa7QA&q=Ender%27s+Game", response => $("pre.goodreads").html(JSON.stringify(response)));
    });
    $("button.spotify").click(event => {
        console.log("Spotify");
    });
    $("button.tmdb").click(event => {
        $.get("https://api.themoviedb.org/3/search/tv?api_key=d7208980a35f7aef364e81fcb05147a4&language=en-US&query=sense8", response => $("pre.tmdb").html(JSON.stringify(response)));
    });
};

module.exports = {activateButtons};