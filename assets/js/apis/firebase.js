"use strict";

const firebase = require("firebase");

const db = "https://fanmix-app.firebaseio.com";
const app = "fanmix-app.firebaseapp.com";
const keys = require("./keys");

const init = () => {
    var config = {
        apiKey: keys.firebase,
        authDomain: app,
        databaseURL: db,
        storageBucket: "bucket.appspot.com"
    };
    firebase.initializeApp(config);
};

const getSongs = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db}/songs.json`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

const getRecentTrackLinks = () => {
    getRawTrackLinks().then(links => {
        // get list of media items to query
        let media = [];
        let tracks = [];
        Object.keys(links).forEach(key => {
            media.push(links[key].media);
            tracks.push(links[key].track_id);
        });
        let uniqueMedia = media.filter(unique);
        let uniqueTracks = tracks.filter(unique);

        console.log(uniqueMedia, uniqueTracks);
    });
};

const getRawTrackLinks = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db}/links/tracks.json`
        })
        .done(links => resolve(links))
        .fail(error => reject(error));
    });
};

const unique = (element, index, array) => {
    return array.indexOf(element) === index;
};

module.exports = {init, getSongs, getRecentTrackLinks};