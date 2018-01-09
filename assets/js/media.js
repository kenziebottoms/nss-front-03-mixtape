"use strict";

const keys = require("./apis/keys");

const getMediaById = (type, id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${keys.firebase_db}/media.json?id=${id}&type=${type}`
        })
        .done(response => resolve(response))
        .fail(error => reject(error));
    });
};

const getMediaListByIds = ids => {
    let promiseArray = ids.map((value, index, array) => {
        let type = value.split(":")[0];
        let id = value.split(":")[1];
        return getMediaById(type, id);
    });
    return Promise.all(promiseArray);
};

module.exports = {getMediaById, getMediaListByIds};