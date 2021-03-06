"use strict";

const keys = require("./apis/keys");

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

const loadLink = link => {
    return new Promise((resolve, reject) => {
        getCachedMusic(link.music).then(music => {
            let newLink = Object.assign({}, link);
            newLink.music = music;
            resolve(newLink);
        });
    });
};

module.exports = {getCachedMusic, loadLink};