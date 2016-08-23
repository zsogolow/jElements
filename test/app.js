'use strict'

var finalhandler = require('finalhandler');
var http = require('http');

var Router = require('./server/router');

function App() {
    var options = Object.create(this.defaultOptions());
    var router = new Router();

    this.router = router;
    this.hostname = options.hostname;
    this.port = options.port;
    this.showIndexHtml = options.showIndexHtml;

    if (options.showIndexHtml) {
        // get index.html
        var router = this.router;
        router.get('/', function (req, res, done) {
            req.url = './index.html';
            router.handle(req, res, done);
        });
    }
}

App.prototype = {
    defaultOptions: function () {
        return {
            hostname: '127.0.0.1',
            port: 3000,
            showIndexHtml: true,
        };
    },
}

var app = new App();
var router = app.router;

router.get('/hi', function (req, res, done) {
    res.end('hey');
});

const server = http.createServer((req, res) => {
    var done = finalhandler(req, res);
    app.router.handle(req, res, done);
}).listen(app.port, app.hostname, () => {
    var port = app.port;
    var hostname = app.hostname;
    console.log(`Server running at http://${hostname}:${port}/`);
});
