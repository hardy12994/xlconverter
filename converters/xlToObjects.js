"use strict";
var xlsx = require('xlsx');
var _ = require('underscore');
var excelbuilder = require('msexcel-builder');

module.exports.xlToObjects = (filePath, callback) => {
    const workbook = xlsx.readFile(filePath);
    if (!workbook.Sheets) {
        throw ('no sheets is present excel');
    }
    let data = [];
    let headers = [];
    let actualData = [];
    let sheet1 = workbook.Sheets.Sheet1;
    if (!sheet1 && callback) {
        callback('sheet1 is required');
    }
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
            let headerName = headers[i].h;
            let valueOfHeader = _.find(cellsInRow, item => item.cellStrPart === headers[i].cellStrPart);
            row[headerName] = valueOfHeader ? valueOfHeader.v : '';
        }
        actualData.push(row);
    };

    for (let i = 2; i <= numberOfRows + 1; i++) {
        let cellsInRow = _.filter(data, item => item.cellNumPart == i);
        configureCells(cellsInRow);
    }

    if (callback) {
        return callback(null, actualData)
    }
    return actualData;
};