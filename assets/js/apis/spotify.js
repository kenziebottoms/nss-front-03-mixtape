"use strict";

const keys = require("./api_keys");

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
        .fail(error => reject(error));
    });
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
        .fail(error => reject(error));
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
            return false;
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

const authorize = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${keys.spotify_public}&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback.html&scope=user-top-read%20user-read-currently-playing&response_type=token`;
};

const getCurrentUser = () => {
    return localStorage.getItem("spotify_user");
};
const setCurrentUser = user => {
    localStorage.setItem("spotify_user", JSON.stringify({
        "display_name": user.display_name,
        "uri": user.uri,
        "followers": user.followers,
        "id": user.id,
        "images": [
            {
                "url": user.images[0].url
            }
        ]
    }));
};

const logOut = () => {
    localStorage.removeItem("spotify_user");
    localStorage.removeItem("spotify_token");
};

module.exports = {getAccessToken, authorize, searchTracksTitle, getUserInfo, logOut};