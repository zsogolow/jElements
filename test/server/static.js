'use strict'

var fs = require('fs');

function Static() {
};

Static.prototype = {
    serve: function (req, res, done) {
        var contentType = req.headers.accept;
        var path = './' + req.url;
        fs.readFile(path, function (error, content) {
            if (error) {
                done(error);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    },
};

module.exports = Static;