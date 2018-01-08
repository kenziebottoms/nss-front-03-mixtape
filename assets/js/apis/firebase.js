"use strict";

const firebase = require("firebase");

const db = "https://fanmix-app.firebaseio.com";
const app = "fanmix-app.firebaseapp.com";
const keys = require("./keys");

const _ = require("lodash");

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

// currently gets all track links
const getRecentTrackLinks = () => {
    getRawTrackLinks().then(links => {
        // get list of media items to query
        let media = [];
        let tracks = [];
        // separate into lists of media and tracks to fetch
        _.forEach(links, (value, key) => {
            media.push(links[key].media);
            tracks.push(links[key].track_id);
        });
        // filter for uniqueness
        media = _.uniq(media);
        tracks = _.uniq(tracks);
        // return all media info and map it out
        getMediaQueue(media).then(mediaQueue => {
            mediaQueue.forEach(media => {
                media = _.sample(media);
                _.forEach(links, link => {
                    if (link.media == `${media.type}:${media.id}`) {
                        link.media = media;
                    }
                });
            });
            return links;
        });
    });
};

const getMediaById = (type, id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db}/media.json?id=${id}&type=${type}`
        })
        .done(response => {
            resolve(response);
        })
        .fail(error => reject(error));
    });
};

const getSongById = id => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db}/songs.json?id=${id}`
        })
        // sample basically flattens the object
        .done(response => resolve(_.sample(response)))
        .fail(error => reject(error));
    });
};

const getMediaQueue = queue => {
    let promiseArray = queue.map((value, index, array) => {
        let type = value.split(":")[0];
        let id = value.split(":")[1];
        return getMediaById(type, id);
    });
    return Promise.all(promiseArray);
};

const getTrackQueue = queue => {
    let promiseArray = queue.map((value, index, array) => {
        let id = value;
        return getSongById(id);
    });
    return Promise.all(promiseArray);
};

const getRawTrackLinks = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db}/links.json?type=track`
        })
        .done(links => resolve(links))
        .fail(error => reject(error));
    });
};

const unique = (element, index, array) => {
    return array.indexOf(element) === index;
};

module.exports = {init, getSongs, getRecentTrackLinks};