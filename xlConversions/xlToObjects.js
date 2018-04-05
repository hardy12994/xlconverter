"use strict";
var xlsx = require('xlsx');
var _ = require('underscore');


let manangeSheets = function (workbookSheets) {

    let collection = {};
    for (const sheetIndex in workbookSheets) {

        if (!sheetIndex) {
            continue;
        }

        let data = [];
        let actualData = [];
        let headers = [];

        let sheetData = workbookSheets[sheetIndex];

        if (!sheetData || Object.keys(sheetData).length === 1) {
            collection[sheetIndex] = []; // equals to actualData
            continue;
        }

        let sheet1 = sheetData;
        let keys = _.keys(sheet1);
        let pattern = /[A-Z]/g;
        let lastCell = sheet1['!ref'].substr(sheet1['!ref'].match(':').index + 1, sheet1['!ref'].length);
        let numberOfRows = lastCell.substr(lastCell.match(/[0-9]/).index, lastCell.length) - 1;
        let newKeys = keys;


        _.each(keys, key => {

            if (!key.match(pattern)) {
                return;
            }
            sheet1[key].cell = key;
            sheet1[key].cellStrPart = key.substr(0, key.match(/[0-9]/).index);
            sheet1[key].cellNumPart = key.substr(key.match(/[0-9]/).index, key.length);


            if (!_.isEmpty(key.match(new RegExp("1", "g"))) && key.substr(key.match(/[0-9]/).index, key.length) == 1) {
                return headers.push(sheet1[key]);
            }
            return data.push(sheet1[key]);
        });

        let configureCells = cellsInRow => {
            let row = new Object();
            for (let i = 0; i <= headers.length - 1; i++) {
                let headerName = headers[i].h || headers[i].v || headers[i].w;
                let valueOfHeader = _.find(cellsInRow, item => item.cellStrPart === headers[i].cellStrPart);
                row[headerName] = valueOfHeader ? (valueOfHeader.v || valueOfHeader.w) : '';
            }
            actualData.push(row);
        };

        for (let i = 2; i <= numberOfRows + 1; i++) {
            let cellsInRow = _.filter(data, item => item.cellNumPart == i);
            configureCells(cellsInRow);
        }

        collection[sheetIndex] = actualData;
    }
    return collection;
}

module.exports.xlToObjects = (filePath, callback) => {

    if (!callback) {
        throw new Error('callback function is required');
    }

    const workbook = xlsx.readFile(filePath);

    if (!workbook.Sheets && _.isEmpty(workbook.Sheets)) {
        throw new Error('no sheets are present in excel');
    }

    let collection = manangeSheets(workbook.Sheets);
    return callback(null, collection);
};


module.exports.xlToObjectsOfSheet = (filePath, sheetName, callback) => {

    if (!sheetName) {
        throw new Error('sheetName is required');
    }

    if (!callback) {
        throw new Error('callback function is required');
    }

    const workbook = xlsx.readFile(filePath);

    if (!workbook.Sheets && _.isEmpty(workbook.Sheets)) {
        throw new Error('no sheets are present in excel');
    }

    const requiredSheet = workbook.Sheets[sheetName];

    if (!requiredSheet) {
        throw new Error('provided sheet name is not present in the file');
    }
    
    let obj = new Object();
    obj[sheetName] = workbook.Sheets[sheetName];

    let collection = manangeSheets(obj);
    return callback(null, collection);
};