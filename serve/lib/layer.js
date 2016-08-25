'use strict'

var Route = require('./route')

function Layer(path, handler, method) {
    if (!(this instanceof Layer)) {
        return new Layer(path, handler, method)
    }

    var self = this;
    self.path = path;
    self.handler = handler;

    self.route = new Route(path, handler, method);
};

Layer.prototype = {
    handleRequest:function(req, res, next) {
        var self = this;
        self.handler(req,res,next);
    }
};

module.exports = Layer;