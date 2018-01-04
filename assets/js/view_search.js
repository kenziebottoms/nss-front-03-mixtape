"use strict";

// ----- EXECUTIVE ----- //
// process, format data and put it in the DOM

const formatSongSearchResults = data => {
    let songs = data.tracks.items;
    if (songs.length > 0) {
        $("#song-results").html("");
        songs.forEach(song => {
            $("#song-results").append(getSongSearchCard(song));
        });
    }
};

const formatMovieSearchResults = data => {
    if (data.total_results > 0) {
        $("#movie-results").html("");
        let movies = data.results.slice(0,5);
        movies.forEach(movie => {
            $("#movie-results").append(getMovieSearchCard(movie));
        });
    }
};

const formatBookSearchResults = data => {
    let books = data.items;
    books.sort((a,b) => {
        return b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount;
    });
    $("#book-results").html("");
    books.slice(0,5).forEach(book => {
        $("#book-results").append(getBookSearchCard(book));
    });
};

const formatTVSearchResults = data => {
    if (data.total_results > 0) {
        $("#tv-results").html("");
        let shows = data.results.slice(0,5);
        shows.forEach(show => {
            $("#tv-results").append(getTVSearchCard(show));
        });
    }
};

// ----- HTML GENERATORS ----- //
// generate the raw HTML for a single search result given the object in question

const getSongSearchCard = song => {
    return `<song class="search-result" data-spotify-id="${song.id}">
        <div class="img">
            <img height="64" class="card-img-left" src="${song.album.images[2].url}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${song.name}</h5>
            <h6 class="card-subtitle text-muted">${song.artists[0].name}</h6>
        </div>
    </song>`;
};

const getMovieSearchCard = movie => {
    let card = `<movie class="search-result" data-tmdb-id="">`;
        if (movie.poster_path != null) {
            card += `<div class="img">
                <img height="64" width="auto" class="card-img-left" src="https://image.tmdb.org/t/p/w400_and_h600_bestv2${movie.poster_path}">
            </div>`;
        }
        card += `<div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <h6 class="card-subtitle text-muted">${movie.release_date.substr(0,4)}</h6>
        </div>
    </movie>`;
    return card;
};

const getTVSearchCard = show => {
    let card = `<show class="search-result" data-tmdb-id="">`;
        if (show.poster_path != null) {
            card += `<div class="img">
                <img height="64" width="auto" class="card-img-left" src="https://image.tmdb.org/t/p/w400_and_h600_bestv2${show.poster_path}">
            </div>`;
        }
        card += `<div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <h6 class="card-subtitle text-muted">${show.first_air_date.substr(0,4)}</h6>
        </div>
    </show>`;
    return card;
};

const getBookSearchCard = book => {
    let card = `<book class="search-result" data-books-id="${book.id}">`;
        if (book.volumeInfo.imageLinks.smallThumbnail != null) {
            card += `<div class="img">
                <img class="card-img-left" src="${book.volumeInfo.imageLinks.smallThumbnail}">
            </div>`;
        }
        card += `<div class="card-body">
            <h5 class="card-title">${book.volumeInfo.title}</h5>
            <h6 class="card-subtitle text-muted">${book.volumeInfo.authors.join(", ")}</h6>
        </div>
    </book>`;
    return card;
};

module.exports = {formatSongSearchResults, formatMovieSearchResults, formatBookSearchResults, formatTVSearchResults};