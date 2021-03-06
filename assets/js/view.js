"use strict";

const spotify = require("./apis/spotify");
const media = require("./media");
const _ = require("lodash");

const populateUserInfo = () => {
    let user = JSON.parse(localStorage.getItem("spotify_user"));
    if (user) {
        $("#personal").prepend(getUserCard(user));
    } else {
        if (spotify.getAccessToken()) {
            spotify.getUserInfo().then(user => {
                $("#personal").prepend(getUserCard(user));
            }).catch(error => console.log(error));
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

const displayRecentMedia = () => {
    media.getRecentMedia(20).then(media => {
        _.forEach(media, item => {
            console.log(item);
            if (item.type == "tv") {
                item.year = item.date.substr(0,4);
                const template = require("../templates/cards/tv.hbs");
                $(`#${item.type}`).append(template({item}));
            } else if (item.type == "movie") {
                item.year = item.date.substr(0,4);
                const template = require("../templates/cards/movie.hbs");
                $(`#${item.type}`).append(template({item}));
            }
        });
    }).catch(error => console.log(error));
};

module.exports = {populateUserInfo, getTrackLinkCard, displayRecentMedia};