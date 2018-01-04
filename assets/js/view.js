"use strict";

// ----- SPOTIFY ----- //

// takes track search response and formats songs in DOM
const formatTrackSearchResults = data => {
    let songs = data.tracks.items;
    if (songs.length > 0) {
        $("#spotify-results").html("");
        songs.forEach(song => {
            $("#spotify-results").append(getTrackSearchCard(song));
        });
    }
};
// returns raw HTML of track search result
const getTrackSearchCard = song => {
    return `<song class="search-result" data-spotify-id="${song.id}">
        <img height="64" class="card-img-left" src="${song.album.images[2].url}">
        <div class="card-body">
            <h5 class="card-title">${song.name}</h5>
            <h6 class="card-subtitle text-muted">${song.artists[0].name}</h6>
        </div>
    </div>`;
};

// ----- TMDb ----- //

const formatMovieSearchResults = data => {
    let movies = data.results.slice(0,5);
    if (movies.length > 0) {
        $("#tmdb-results").html("");
        movies.forEach(movie => {
            $("#tmdb-results").append(getMovieSearchCard(movie));
        });
    }
};

const getMovieSearchCard = movie => {
    let card = `<movie class="search-result" data-tmdb-id="">`;
        if (movie.poster_path != null) {
            card += `<img height="64" width="auto" class="card-img-left" src="https://image.tmdb.org/t/p/w400_and_h600_bestv2${movie.poster_path}">`;
        }
        card += `<div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <h6 class="card-subtitle text-muted">${movie.release_date.substr(0,4)}</h6>
        </div>
    </div>`;
    return card;
};

module.exports = {formatTrackSearchResults, formatMovieSearchResults};