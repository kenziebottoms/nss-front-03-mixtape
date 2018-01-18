"use strict";

// ----- EXECUTIVE ----- //
// process, format data and put it in the DOM

const formatSongSearchResults = data => {
    let songs = data.tracks.items;
    if (songs.length > 0) {
        $("#song-results").html("");
        const template = require("../templates/cards/search/song.hbs");
        songs.forEach(song => {
            $("#song-results").append(template({song}));
        });
    }
};

const formatMovieSearchResults = data => {
    if (data.total_results > 0) {
        $("#movie-results").html("");
        let movies = data.results.slice(0,5);
        const template = require("../templates/cards/search/movie.hbs");
        movies.forEach(movie => {
            movie.year = movie.release_date.substr(0,4);
            $("#movie-results").append(template({movie}));
        });
    }
};

const formatBookSearchResults = data => {
    let books = data.items;
    books.sort((a,b) => {
        return b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount;
    });
    $("#book-results").html("");
    const template = require("../templates/cards/search/book.hbs");
    books.slice(0,5).forEach(book => {
        book.authors = book.volumeInfo.authors.join(", ");
        $("#book-results").append(template({book}));
    });
};

const formatTVSearchResults = data => {
    if (data.total_results > 0) {
        $("#tv-results").html("");
        let shows = data.results.slice(0,5);
        const template = require("../templates/cards/search/tv.hbs");
        shows.forEach(show => {
            show.year = show.first_air_date.substr(0,4);
            $("#tv-results").append(template({show}));
        });
    }
};

module.exports = {formatSongSearchResults, formatMovieSearchResults, formatBookSearchResults, formatTVSearchResults};