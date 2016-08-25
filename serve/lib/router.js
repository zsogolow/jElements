'use strict'

var Route = require('./route')
var Layer = require('./layer')

function Router() {
    if (!(this instanceof Router)) {
        return new Router();
    }

    var self = this;

    var stack = [];
    self.stack = stack;
};

Router.prototype = {
    use: function (path, handler) {
        if (typeof path === 'function') {
            handler = path;
            path = 'all';
        }
        var self = this;
        var layer = new Layer(path, handler);
        self.stack.push(layer);
    },

    get: function (path, handler) {
        var self = this;
        var layer = new Layer(path, handler, 'get');
        self.stack.push(layer);
    },

    handle: function (req, res, done) {
        var self = this;

        var path = req.url;

        var ix = 0;
        var stack = self.stack;

        next();

        function next(err) {
            if (err) {
                return done(err);
            }

            if (ix >= stack.length) {
                return done();
            }

            var layer;
            var noMatch = true;
            while (noMatch && ix < stack.length) {
                layer = stack[ix++];
                
                if (layer.path === 'all' || layer.path == path) {
                    // match
                    noMatch = false;
                }
            }

            if (noMatch) {
                return done();
            }

            layer.handleRequest(req, res, next);
        }
    }
}

function createRouter() {
    return new Router();
}

module.exports = createRouter;