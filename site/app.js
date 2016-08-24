'use strict'

var finalhandler = require('finalhandler');
var Router = require('./server/router');
var App = require('./server/server');

var options = {
    port: 3001,
    hostname: '127.0.0.1',
    finalhandler: finalhandler,
}

var app = new App(options);
var router = app.router;

// get index.html
router.get('/', function (req, res, done) {
    req.url = './index.html';
    router.handle(req, res, done);
});

// get hi lol
router.get('/hi', function (req, res, done) {
    res.end('hey');
});

app.listen();
