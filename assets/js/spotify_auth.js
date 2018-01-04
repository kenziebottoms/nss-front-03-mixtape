"use strict";

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

module.exports = {getAccessToken};