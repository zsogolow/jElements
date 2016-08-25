'use strict'

var http = require('http')
var finalhandler = require('finalhandler')
var Router = require('router')
var MyRouter = require('./router')
var staticServer = require('node-static')

/**
 * WebApp constructor
 */
function WebApp() {
    // ensure proper context
    if (!(this instanceof WebApp)) {
        return new WebApp();
    }

    var self = this;

    // create httpServer, store it on this
    const httpServer = http.createServer(requestHandler);
    self.server = httpServer;

    // const router = Router();
    // self.router = router;
    const myRouter = MyRouter();
    self.router = myRouter;

    const fileServer = new staticServer.Server();
    self.fileServer = fileServer;

    function requestHandler(req, res) {
        var done = finalhandler(req, res);
        self.router.handle(req, res, () => {
            self.fileServer.serve(req, res);
        });
    }
};

/**
 * WebApp prototype, functions accessed via instance dot call
 */
WebApp.prototype = {

    /**
     * facade call to server.listen, to begin excepting connections to the
     * specified port and host name. callback is invoked on the 'listening' 
     * event.
     */
    listen: function (port, hostname, callback) {
        var self = this;
        self.server.listen(port, hostname, callback);
    },
};

/**
 * creates a new instanace of WebApp
 */
var createWebApp = function () {
    var app = new WebApp();
    return app;
};

/**
 * expose the createWebApp function
 */
module.exports.createWebApp = createWebApp;