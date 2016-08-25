'use strict'

function Route(path, handler, method) {
    if (!(this instanceof Route)) {
        return new Route(path, handler, method);
    }
    var self = this;

    self.path = path;
    self.handler = handler;
    self.method = method;
};

Route.prototype = {
};

module.exports = Route;