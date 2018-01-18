"use strict";

const keys = require("./apis/keys");
const _ = require("lodash/fp");
const media = require("./media");
const music = require("./music");

const getTrackLinks = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/links.json?type=track`
        })
        .done(links => resolve(links))
        .fail(error => reject(error));
    });
};

// links => media, tracks
const splitLinks = links => {
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
    return {media, tracks};
};

// replaces music and media references with objects
const loadLink = link => {
    return new Promise((resolve, reject) => {
        media.loadLink(link).then(loadedLink => {
            resolve(music.loadLink(loadedLink));
        }).catch(error => console.log(error));
    });
};

module.exports = {getTrackLinks, loadLink};