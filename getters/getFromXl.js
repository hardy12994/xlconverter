"use strict";
var _ = require('underscore');
var xlToObjects = require('../xlConversions/xlToObjects');

exports.getRow = (filePath, rowQuery, sheetName, callback) => {

    let count = 0;
    let keys = _.keys(rowQuery);
    xlToObjects.xlToObjectsOfSheet(filePath, sheetName, function (err, objects) {
        if (err) {
            return callback(err);
        }
        let objectCollections = objects[sheetName];


        if (_.isEmpty(rowQuery)) {
            return callback(null, objectCollections);
        }

        let found = [];

        let neededRow = _.find(objectCollections, obj => {

            for (const key in rowQuery) {

                if (rowQuery[key].toString() === obj[key].toString()) {
                    found.push(1);
                }
            }
            if (found.length === Object.keys(rowQuery).length) {
                return obj;
            }
            found = [];
        }) || null;

        return callback(null, neededRow);
    });
};

exports.getRows = (filePath, rowQuery, sheetName, callback) => {

    let count = 0;
    let keys = _.keys(rowQuery);

    xlToObjects.xlToObjectsOfSheet(filePath, sheetName, function (err, objects) {
        if (err) {
            return callback(err);
        }
        let objectCollections = objects[sheetName];


        if (_.isEmpty(rowQuery)) {
            return callback(null, objectCollections);

        }


        let neededRows = _.filter(objectCollections, obj => {
            let found = [];

            for (const key in rowQuery) {

                if (rowQuery[key].toString() === obj[key].toString()) {
                    found.push(1);
                }
            }

            if (found.length === Object.keys(rowQuery).length) {
                return obj;
            }

        }) || [];

        return callback(null, neededRows);
    });
};


exports.getColoumn = (filePath, colQuery, sheetName, callback) => {

    xlToObjects.xlToObjectsOfSheet(filePath, sheetName, function (err, objects) {
        if (err) {
            return callback(err);
        }
        let objectCollections = objects[sheetName];

        if (_.isEmpty(colQuery)) {
            return callback(null, objectCollections);
        }

        let keys = _.keys(objectCollections[0]);

        let present = keys.forEach(item => {
            return item === colQuery;
        });

        if (!present) {
            return callback(null, []);
        }

        let filteredData = _.pluck(objectCollections, colQuery) || [];
        return callback(null, filteredData);
    });
};


exports.getColoumns = (filePath, colQueries, sheetName, callback) => {

    xlToObjects.xlToObjectsOfSheet(filePath, sheetName, function (err, objects) {
        
        if (err) {
            return callback(err);
        }

        let objectCollections = objects[sheetName];

        if (_.isEmpty(colQueries)) {
            return callback(null, objectCollections);
        }

        let returncoloumns = {};

        colQueries.forEach(col => {
            returncoloumns[col] = _.pluck(objectCollections, col) || [];
        });

        return callback(null, returncoloumns);
    });

};


exports.getRowsOfCols = (filePath, colomns, sheetName, callback) => {

    xlToObjects.xlToObjectsOfSheet(filePath, sheetName, function (err, objects) {
        if (err) {
            return callback(err);
        }
        let objectCollections = objects[sheetName];

        if (_.isEmpty(colomns)) {
            return callback(null, objectCollections);
        }

        let neededItems = [];
        objectCollections.forEach(item => {
            let obj = new Object();
            for (var key in item) {
                if (colomns.includes(key)) {
                    obj[key] = item[key];
                }
            }
            neededItems.push(obj);
        });

        return callback(null, neededItems);
    });

};