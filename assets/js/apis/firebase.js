"use strict";

const keys = require("./keys");

// always need firebase/app
const firebase = require("firebase/app");
// don't declare variables for other firebase requires
require("firebase/auth");

const config = {
    apiKey: keys.firebase_key,
    authDomain: keys.firebase_app
};
firebase.initializeApp(config);

module.exports = firebase;