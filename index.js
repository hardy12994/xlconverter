"use strict";
exports.xlToObjects = require('./converters/xlToObjects').xlToObjects;
exports.objectsToXl = require('./converters/objectsToXl').objectsToXl;
let getters = require('./getters/getFromXl');

for (var key in getters) {
    exports[key] = getters[key];
}