"use strict";

const keys = require("./keys");

const searchMovieTitle = title => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdb_public}&language=en-US&query=${encodeURI(title)}`
        })
        .done(results => resolve(results))
        .fail(error => reject(error));
    });
};

const searchTVTitle = title => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/tv?api_key=${keys.tmdb_public}&language=en-US&query=${encodeURI(title)}`
        })
        .done(results => resolve(results))
        .fail(error => reject(error));
    });
};

module.exports = {searchMovieTitle, searchTVTitle};