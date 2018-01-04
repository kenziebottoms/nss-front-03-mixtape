"use strict";

const spotify = require("./apis/spotify");

const populateUserInfo = () => {
    let user = localStorage.getItem("spotify_user");
    if (user) {
        let content = getUserCard(user);
        $("#personal").html(content);
    } else {
        spotify.getUserInfo().then(user => {
            $("#personal").html(getUserCard(user));
        });
    }
};

const getUserCard = user => {
    return `<div class="img" data-uri="${user.uri}">
        <img src="${user.images[0].url}">
    </div>
    <div class="card-body">
        <span class="text-muted">You are logged in as:</span>
        <h5>${user.display_name} <span class="badge badge-success">${user.followers.total}</span></h5>
        <h6 class="text-muted">${user.id}</h6>
    </div>`;
};

module.exports = {populateUserInfo};