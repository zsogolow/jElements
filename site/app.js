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
    req.url = './layout.ejs';
    router.handle(req, res, done);
});

router.get('/one', function(req, res, done) {
    req.url = './layout.ejs';
    req.data = 'one';
    router.handle(req, res, done);
});

router.get('/two', function(req, res, done) {
    req.url = './layout.ejs';
    req.data = 'two';
    router.handle(req, res, done);
});

router.get('/three', function(req, res, done) {
    req.url = './layout.ejs';
    req.data = 'three';
    router.handle(req, res, done);
});

router.get('/four', function(req, res, done) {
    req.url = './layout.ejs';
    req.data = 'four';
    router.handle(req, res, done);
});

// get hi lol
router.get('/hi', function (req, res, done) {
    res.end();
});

app.listen();
