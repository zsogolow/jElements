'use strict'

function Route(path, method, handler) {
    this.path = path;
    this.fn = handler;
    this.method = method;
};

Route.prototype = {
};

module.exports = Route;