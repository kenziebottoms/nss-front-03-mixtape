"use strict";

const keys = require("./apis/keys");

const getCachedMedia = (type, id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/media.json?id=${id}&type=${type}`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

const getCachedMediaList = typeIds => {
    let promiseArray = typeIds.map(typeId => {
        return getCachedMedia(typeId);
    });
    return Promise.all(promiseArray);
};

const loadLink = link => {
    return new Promise((resolve, reject) => {
        getCachedMedia(link.media).then(media => {
            let newLink = Object.assign({}, link);
            newLink.media = media;
            resolve(newLink);
        });
    });
};

module.exports = {getCachedMediaList, getCachedMedia, loadLink};