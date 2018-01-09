"use strict";

const keys = require("./apis/keys");

const getAllCachedTracks = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/songs.json`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

const getCachedMusic = typeId => {
    let type = typeId.split(":")[0];
    let id = typeId.split(":")[1];
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/tracks/${id}.json`
        })
        // sample basically flattens the object
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

// promises a list of tracks associated with the given ids
const getCachedMusicList = typeIds => {
    let promiseArray = typeIds.map(typeId => getCachedMusic(typeId));
    return Promise.all(promiseArray);
};

const loadLink = link => {
    return new Promise((resolve, reject) => {
        getCachedMusic(link.music).then(music => {
            let newLink = Object.assign({}, link);
            console.log(music);
            newLink.music = music;
            resolve(newLink);
        });
    });
};

module.exports = {getCachedMusicList, getCachedMusic, loadLink};