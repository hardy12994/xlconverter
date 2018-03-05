"use strict";
var _ = require('underscore');
var excelbuilder = require('msexcel-builder');

module.exports.objectsToXl = (headers, objects, path, fileName, sheetName, callback) => {

    if (!headers || _.isEmpty(headers)) {
        throw 'headers are Required';
    }
    if (!_.isArray(headers)) {
        throw 'headers must be in Array';
    }


    if (!objects || _.isEmpty(objects)) {
        throw 'headers are Required';
    }
    if (!_.isArray(objects)) {
        throw 'objects must be in Array';
    }


    if (!path) {
        throw 'path is Required';
    }
    if (typeof(path) !== "string") {
        throw 'path must be string';
    }


    if (!fileName) {
        throw 'fileName is Required';
    }
    if (typeof(fileName) !== "string") {
        throw 'fileName must be string';
    }


    if (!sheetName) {
        throw 'sheetName is Required';
    }
    if (typeof(sheetName) !== "string") {
        throw 'sheetName must be string';
    }

    let workbook = excelbuilder.createWorkbook(path, `${fileName}.xlsx`);
    var sheet1 = workbook.createSheet(sheetName || 'sheet1', headers.length, objects.length + 1);
    let headersInXl = [];
    let count = 0;

    headers.forEach(header => {
        sheet1.font(headers.indexOf(header) + 1, 1, { bold: 'true' });
        sheet1.set(headers.indexOf(header) + 1, 1, header.toUpperCase());
        headersInXl.push({
            priority: ++count,
            header: header
        });
    });

    for (var i = 0; i < objects.length; i++) {
        for (let index in objects[i]) {
            let priority = _.find(headersInXl, item => index === item.header).priority;
            console.log(objects[i][index]);
            sheet1.set(priority, i + 2, objects[i][index]);
        }
    }
    workbook.save(function(err) {
        if (!err) {
            return callback(null, `${sheetName} sheet successfully created`);
        }
        workbook.cancel();
        return callback(`${sheetName} sheet not created`);
    });
};