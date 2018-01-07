"use strict";

const eventController = require("./events");
const firebase = require("./apis/firebase");

eventController.initialize();
firebase.getRecentTrackLinks()
.then(response => console.log(response));