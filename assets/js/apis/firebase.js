"use strict";

const firebase = require("firebase");

const db = "https://fanmix-app.firebaseio.com";
const app = "fanmix-app.firebaseapp.com";
const keys = require("./api_keys");

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
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db}/links/tracks.json`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

module.exports = {init, getSongs, getRecentLinks};