"use strict";

const keys = require("./apis/keys");

const getCachedMedia = (typeId) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/media/${typeId}.json`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
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

module.exports = {getCachedMedia, loadLink};