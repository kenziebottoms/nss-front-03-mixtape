"use strict";

const keys = require("./keys");
const events = require("../events");

const searchTracksTitle = (title, limit) => {
    return new Promise((resolve, reject) => {
        let token = getAccessToken();
        $.ajax({
            url: `https://api.spotify.com/v1/search?q=title:${encodeURI(title)}&type=track&limit=${limit ? limit : "20"}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .done(results => resolve(results))
        .fail(error => {
            handleAPIErrors(error);
            reject(error);
        });
    });
};

const getNowPlaying = () => {
    return new Promise((resolve, reject) => {
        let token = getAccessToken();
        if (token) {
            $.ajax({
                url: `https://api.spotify.com/v1/me/player/currently-playing`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .done(results => resolve(results))
            .fail(error => {
                handleAPIErrors(error);
                reject(error);
            });
        } else {
            reject("No token");
        }
    });
};

const printNowPlaying = () => {
    getNowPlaying().then(nowPlaying => {
        const template = require("../../templates/now-playing.hbs");
        $("#nowPlaying").append(template({nowPlaying}));
    }).catch(error => console.log(error));
};

const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        let token = getAccessToken();
        $.ajax({
            url: "https://api.spotify.com/v1/me",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .done(user => {
            setCurrentUser(user);
            resolve(user);
        })
        .fail(error => {
            handleAPIErrors(error);
            reject(error);
        });
    });
};

const getAccessToken = () => {
    let token = getLocalToken();
    if (!token) {
        let query = window.location.toString();
        let token_param = query.split(/[&#]/)[1];
        if (token_param) {
            token = token_param.split(/=/)[1];
            if (token) {
                setLocalToken(token);
                return token;
            }
        } else {
            logOut();
        }
    }
    return token;
};
const getLocalToken = () => {
    let token = localStorage.getItem("spotify_token");
    if (token) {
        return token;
    } else {
        return false;
    }
};
const setLocalToken = token => {
    localStorage.setItem("spotify_token", token);
};

const handleAPIErrors = error => {
    if (error.statusText == "Unauthorized") {
        logOut();
    }
};

const authorize = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${keys.spotify_public}&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback.html&scope=user-top-read%20user-read-currently-playing&response_type=token`;
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("spotify_user"));
};
const setCurrentUser = user => {
    localStorage.setItem("spotify_user", JSON.stringify(user));
};

const logOut = () => {
    localStorage.removeItem("spotify_user");
    localStorage.removeItem("spotify_token");
    $(".spotify.unauthorized").removeClass("d-none");
};

module.exports = {getAccessToken, authorize, searchTracksTitle, getUserInfo, logOut, getNowPlaying, printNowPlaying};