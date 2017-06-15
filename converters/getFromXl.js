"use strict";
var _ = require('underscore');
var xlsx = require('xlsx');
var xlToObjects = require('./xlToObjects');
let objects;
let fPath = '';

module.exports.getRow = (filePath, rowQuery) => {

    fPath = filePath;

    if (_.isEmpty(rowQuery)) {
        return xlToObjects.xlToObjects(filePath);
    }
    let count = 0;
    let keys = _.keys(rowQuery);
    objects = fPath === filePath ? objects : xlToObjects.xlToObjects(filePath);
    var query = {};

    let getLatestPair = function() {
        let val = rowQuery[keys[count]];
        count++;
        return { key: keys[count], val: val };
    };
    let pair = getLatestPair();

    let neededRow = _.find(objects, obj => {
        if (obj[pair.key] === rowQuery[pair.val]) {

            if (keys.length === 1) {
                return obj;
            }

            for (var i = 2; i <= keys.length; i++) {
                let newPair = getLatestPair();
                if (obj[newPair.key] !== rowQuery[newPair.val]) {
                    obj.break = true;
                    break;
                }
            }

            if (obj.break) {
                return null;
            } else {
                return obj;
            }
        }
    }) || null;

    return neededRow;
};

module.exports.getColoumn = (filePath) => {};

module.exports.getColoumns = (filePath) => {};