"use strict";

const keys = require("./api_keys");

const searchTitle = title => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(title)}&maxResults=20`
        }).done(response => resolve(response))
        .fail(response => reject(response));
    });
};

module.exports = {searchTitle};