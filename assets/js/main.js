"use strict";

const eventController = require("./events");
eventController.initialize();

const linker = require("./links");
const view = require("./view");
const _ = require("lodash");

linker.getTrackLinks().then(links => {
    links = _.values(links);
    let media = _.mapKeys(links, link => link.media);
});