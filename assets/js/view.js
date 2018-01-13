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
    let $cards = $(".card-images");
    [...$cards].forEach(card => {
        let $card = $(card);
        let music = $card.find("img.music");
        let media = $card.find("img.media");
        if (music.width() != 0 && music.height() != 0) {
            let fullWidth = music.width() + media.width();
            let $parent = $card.parent();
            let parentPadding = parseInt($parent.css("padding-left")) +
                                parseInt($parent.css("padding-right"));
            let parentWidth = $parent.width() - parentPadding;
            let ratio = parseFloat(parentWidth/fullWidth);
            media.width(media.width()*ratio);
            media.height(media.height()*ratio);
            music.width(music.width()*ratio);
            music.height(music.height()*ratio);
        } else {
            setTimeout(() => {
                blockifyLinkCards();
            }, 100);
        }
    });
};

module.exports = {populateUserInfo, getTrackLinkCard, blockifyLinkCards};