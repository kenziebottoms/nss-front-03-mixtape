"use strict";

const spotify = require("./apis/spotify");

const populateUserInfo = () => {
    let user = JSON.parse(localStorage.getItem("spotify_user"));
    if (user) {
        $("#personal").html(getUserCard(user));
    } else {
        if (spotify.getAccessToken()) {
            spotify.getUserInfo().then(user => {
                $("#personal").html(getUserCard(user));
            });
        } else {
            spotify.logOut();
        }
    }
};

const getUserCard = user => {
    const userTemplate = require("../templates/user-card.hbs");
    return userTemplate({user});
};

const getTrackLinkCard = loadedLink => {
    const cardTemplate = require("../templates/track-link-card.hbs");
    return cardTemplate({"link": loadedLink});
};

module.exports = {populateUserInfo, getTrackLinkCard};