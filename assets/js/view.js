"use strict";

const formatTrackSearchResults = data => {
    $("#spotify-results").html("");
    let songs = data.tracks.items;
    songs.forEach(song => {
        $("#spotify-results").append(getTrackSearchCard(song));
    });
};

const getTrackSearchCard = song => {
    return `<song class="search-result" data-spotify-id="3cfOd4CMv2snFaKAnMdnvK">
        <img height="64" class="card-img-left" src="${song.album.images[2].url}">
        <div class="card-body">
            <h5 class="card-title">${song.name}</h5>
            <h6 class="card-subtitle text-muted">${song.artists[0].name}</h6>
        </div>
    </div>`;
};

module.exports = {formatTrackSearchResults};