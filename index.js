"use strict";
exports.xlToObjects = require('./converters/xlToObjects').xlToObjects;
exports.objectsToXl = require('./converters/objectsToXl').objectsToXl;


let express = require('express'),
    appRoot = require('app-root-path'),
    path = require('path'),
    app = express();
var port = process.env.PORT || 3050,
    server = app.listen(port, function() {
        console.log('listening on ' + port);

        // app.post('/toXl', function(req, res) {
        //     exports.objectsToXl(["name", "age"], [
        //         { name: "hardeep", age: 21 },
        //         { name: "hardeep1", age: 212 },
        //         { name: "hardeep2", age: 213 }
        //     ], appRoot.path, "ABC", function(err, data) {
        //         if (err) {
        //             throw err;
        //         }
        //         console.log(data);
        //     });
        // });
    });