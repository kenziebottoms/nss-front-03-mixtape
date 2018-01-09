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
    if (loadedLink.media.type == "tv") {
        loadedLink.media.image = "https://image.tmdb.org/t/p/w400_and_h600_bestv2" + loadedLink.media.image;
    }
    const cardTemplate = require("../templates/track-link-card.hbs");
    return cardTemplate({"link": loadedLink});
};

const blockifyLinkCards = () => {
};

module.exports = {populateUserInfo, getTrackLinkCard, blockifyLinkCards};