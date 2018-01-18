"use strict";

const firebase = require("./apis/firebase");
let activeUser = null;

const authUser = () => {
    return new Promise((resolve, reject) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            user.token = token;
            setActiveUser(user);
            resolve(user);
        }).catch(error => reject(error));
    });
};

const setActiveUser = user => {
    activeUser = user;
};

const getActiveUser = () => activeUser;

module.exports = {authUser};