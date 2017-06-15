"use strict";
var _ = require('underscore');
var xlToObjects = require('./xlToObjects');

module.exports.getRow = (filePath, rowQuery) => {

    if (_.isEmpty(rowQuery)) {
        return xlToObjects.xlToObjects(filePath);
    }
    let count = 0;
    let keys = _.keys(rowQuery);
    let objects = xlToObjects.xlToObjects(filePath);

    let getLatestPair = function() {
        let val = rowQuery[keys[count]];
        let returnPair = { key: keys[count], val: val };
        count++;
        return returnPair;
    };
    let pair = getLatestPair();

    let neededRow = _.find(objects, obj => {
        if (obj[pair.key].search(new RegExp(rowQuery[pair.key], 'gi')) >= 0) {

            if (keys.length === 1) {
                return obj;
            }

            for (var i = 2; i <= keys.length; i++) {
                let newPair = getLatestPair();
                if (obj[newPair.key].search(new RegExp(rowQuery[pair.key], 'gi')) < 0) {
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

module.exports.getRows = (filePath, rowQuery) => {

    if (_.isEmpty(rowQuery)) {
        return xlToObjects.xlToObjects(filePath);
    }
    let count = 0;
    let keys = _.keys(rowQuery);
    let objects = xlToObjects.xlToObjects(filePath);

    let getLatestPair = function() {
        let val = rowQuery[keys[count]];
        let returnPair = {
            key: keys[count],
            val: val
        };
        count++;
        return returnPair;
    };
    let pair = getLatestPair();

    let neededRow = _.filter(objects, obj => {
        if (obj[pair.key].search(new RegExp(rowQuery[pair.key], 'gi')) >= 0) {

            if (keys.length === 1) {
                return obj;
            }

            for (var i = 2; i <= keys.length; i++) {
                let newPair = getLatestPair();
                if (obj[newPair.key].search(new RegExp(rowQuery[pair.key], 'gi')) < 0) {
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


module.exports.getColoumn = (filePath, colQuery) => {

    if (_.isEmpty(colQuery)) {
        return xlToObjects.xlToObjects(filePath);
    }

    let objects = xlToObjects.xlToObjects(filePath);
    let keys = _.keys(objects[0]);

    if (!keys.includes[colQuery]) {
        return [];
    }
    return _.pluck(objects, colQuery);

};


module.exports.getColoumns = (filePath, colQueries) => {

    let objects = xlToObjects.xlToObjects(filePath);

    if (_.isEmpty(colQueries)) {
        return xlToObjects.xlToObjects(filePath);
    }


    let returncoloumns = {};

    colQueries.forEach(col => returncoloumns[col] = []);

    objects.forEach(obj => {
        for (var key in obj) {
            if (colQueries.includes(key)) {
                returncoloumns[key].push(obj[key]);
            }
        }
    });
    return returncoloumns;
};


module.exports.getObjectsOfCols = (filePath, colomns) => {

    let objects = xlToObjects.xlToObjects(filePath);

    if (_.isEmpty(colomns)) {
        return xlToObjects.xlToObjects(filePath);
    }
    let neededItems = [];
    objects.forEach(item => {
        let obj = new Object();
        for (var key in item) {
            if (colomns.includes(key)) {
                obj[key] = item[key];
            }
        }
        neededItems.push(obj);
    });

    return neededItems;
};