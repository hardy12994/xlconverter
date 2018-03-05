"use strict";
let gettersFunc = require('./getters/getFromXl');

/**
 * for xl gameplay
*/

// to objects from excel
exports.xlToObjects = require('./xlConversions/xlToObjects').xlToObjects;

exports.xlToObjectsOfSheet = require('./xlConversions/xlToObjects').xlToObjectsOfSheet;

exports.getters = {
    row: gettersFunc.getRow,
    rows: gettersFunc.getRows,
    coloumn: gettersFunc.getColoumn,
    coloumns: gettersFunc.getColoumns,
    selectiveColoumnsOfRows: gettersFunc.getRowsOfCols
};

// to excel from objects
exports.objectsToXl = require('./xlConversions/objectsToXl').objectsToXl;

