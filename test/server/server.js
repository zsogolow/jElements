'use strict'

var finalhandler = require('finalhandler');
var http = require('http');

var Router = require('./router');

function App(options) {
    var options = Object.create(options || this.defaultOptions());

    // for simple routing
    var router = new Router();

    // expose the router and other props
    this.router = router;
    this.hostname = options.hostname;
    this.port = options.port;

    // create the server
    const server = http.createServer((req, res) => {
        var done = options.finalhandler(req, res);
        this.router.handle(req, res, done);
    });
    this.server = server;
}

App.prototype = {
    defaultOptions: function () {
        return {
            hostname: '127.0.0.1',
            port: 3000,
            finalhandler: finalhandler,
        };
    },
    listen: function () {
        var app = this;
        app.server.listen(app.port, app.hostname, () => {
            console.log(`Server running at http://${app.hostname}:${app.port}/`);
        });
    }
}

module.exports = App;