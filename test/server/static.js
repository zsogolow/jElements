'use strict'

var fs = require('fs');
var ejs = require('ejs');

function Static() {
};

Static.prototype = {
    serve: function (req, res, done) {
        var contentType = req.headers.accept;
        var path = './' + req.url;

        // check for .ejs extension
        if (req.url.endsWith('.ejs')) {
            ejs.renderFile(path, function (error, result) {
                if (error !== null) {
                    done(error);
                } else {
                    res.end(result);
                }
            });
        } else {
            // serve the static file 
            fs.readFile(path, 'utf-8', function (error, content) {
                if (error) {
                    done(error);
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        }
    },
};

module.exports = Static;