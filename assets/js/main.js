"use strict";

const eventController = require("./events");
eventController.initialize();

const linker = require("./links");
const _ = require("lodash");
linker.getTrackLinks().then(links => {
    let linkPromises = _.map(links, link => {
        return linker.loadLink(link);
    });
    Promise.all(linkPromises).then(loadedLinks => {
        console.log(loadedLinks);
    });
});