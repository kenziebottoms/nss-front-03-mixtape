"use strict";

const keys = require("./keys");

const getAllCachedTracks = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/songs.json`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

const getCachedTrackById = id => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/tracks.json?id=${id}`
        })
        // sample basically flattens the object
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

// promises a list of tracks associated with the given ids
const getCachedTrackListByIds = ids => {
    let promiseArray = ids.map(id => getCachedTrackById(id));
    return Promise.all(promiseArray);
};

module.exports = {getCachedTrackById, getAllCachedTracks};