'use strict'

var Route = require('./route');
var fileServer = require('./static');

function Router(options) {
    this.routes = [];
    this.fileServer = new fileServer();
};

Router.prototype = {
    handle: function (req, res, done) {
        var fn = undefined; 
        var fileServer = this.fileServer;
        this.routes.forEach(function (route, i) {
            if (route.path == req.url && route.method == req.method.toLowerCase()) {
                fn = route.fn;
            }
        });

        if (fn) {
            fn(req, res, done);
        } else {
            fileServer.serve(req, res, done);
        }
    },

    get: function (path, handler) {
        this.routes.push(new Route(path, 'get', handler));
    },

    post: function (path, handler) {
        this.routes.push(new Route(path, 'post', handler));
    },

};

module.exports = Router;