function _(selector) {

    // every _ object will contain an
    // array of its html elements
    this.htmlElements = [];
    this.length = 0;

    if (selector) {
        // Avoid clobbering the window scope:
        // return a new _ object if we're in the wrong scope
        if (window === this) {
            return new _(selector);
        }

        // We're in the correct object scope:
        // Init our element object and return the object
        if (typeof selector === 'object') {
            // passed an object in the constructor
            if (selector instanceof HTMLElement) {
                // single html element
                this.htmlElements = [selector];
                return this;
            } else if (selector instanceof NodeList) {
                // list of html elements
                for (var i = 0; i < selector.length; i++) {
                    this.htmlElements.push(selector.item(i));
                }
                return this;
            } else if (selector instanceof Array) {
                // array of html elements
                for (var i = 0; i < selector.length; i++) {
                    this.htmlElements.push(selector[i]);
                }
                return this;
            } else if (selector instanceof Window) {
                this.htmlElements = [selector];
                return this;
            } else if (selector instanceof Document) {
                this.htmlElements = [selector];
                return this;
            }
        } else if (typeof selector === 'string') {
            // query selector
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                this.htmlElements.push(elements.item(i));
            }
            this.length = this.htmlElements.length;
            return this;
        }
    } else {
        // check scope, we don't want to return the window
        if (window === this) {
            return new _(null);
        } else {
            // correct scope, return the newly created _ object
            return this;
        }
    }
};

_.prototype.constructor.create = function (tagName) {
    var el = document.createElement(tagName);
    if (el) {
        return new _(el);
    }
}

_.prototype.constructor.each = function (context, handler) {
    if (arguments.length === 1 && typeof context === 'function') {
        // this allows support to hijack 
        // the each function though call/apply
        handler = context;
        context = this;
    }
    for (var prop in context) {
        if (context.hasOwnProperty(prop)) {
            handler(prop, context[prop]);
        }
    }
}

_.prototype = {

    each: function (handler) {
        _.each(this.htmlElements, handler);
    },

    // classie
    addClass: function (className) {
        var indieClasses = className.split(' ');
        this.each(function (i, element) {
            for (var j = 0; j < indieClasses.length; j++) {
                if (element.classList) {
                    element.classList.add(indieClasses[j]);
                } else {
                    // no support
                }
            }
        });
        return this;
    },
    removeClass: function (className) {
        var indieClasses = className.split(' ');
        this.each(function (i, element) {
            for (var j = 0; j < indieClasses.length; j++) {
                if (element.classList) {
                    element.classList.remove(indieClasses[j]);
                } else {
                    // no support
                }
            }
        });
        return this;
    },
    toggleClass: function (className) {
        var indieClasses = className.split(' ');
        this.each(function (i, element) {
            for (var j = 0; j < indieClasses.length; j++) {
                if (element.classList) {
                    element.classList.toggle(indieClasses[j]);
                } else {
                    // no support
                }
            }
        });
        return this;
    },

    // events
    bind: function (event, handler, capture) {
        for (var i = 0; i < this.htmlElements.length; i++) {
            var element = this.htmlElements[i];
            element.addEventListener(event, handler, capture === undefined ? false : capture);
        }
        return this;
    },
    unbind: function (event, handler, capture) {
        for (var i = 0; i < this.htmlElements.length; i++) {
            var element = this.htmlElements[i];
            element.removeEventListener(event, handler, capture === undefined ? false : capture);
        }
        return this;
    },

    // DOM manipulation
    append: function (element) {
        // TODO    
        console.log('todo');
        this.each(function (i, el) {
        });
        return this;
    },
    insertBefore: function (element, refElement) {
        // TODO    
        console.log('todo');
        this.each(function (i, el) {
        });
        return this;
    },
    insertAfter: function (element, refElement) {
        // TODO    
        console.log('todo');
        this.each(function (i, el) {
        });
        return this;
    },
    show: function () {
        // TODO    
        console.log('todo');
        this.each(function (i, el) {
        });
        return this;
    },
    hide: function () {
        // TODO    
        console.log('todo');
        this.each(function (i, el) {
        });
        return this;
    },
    html: function (innerHTML) {
        this.each(function (i, el) {
            el.innerHTML = innerHTML;
        });
        return this;
    },

    // Data
    data: function (name, value) {
        if (!value && arguments.length == 1) {
            return this.htmlElements.length > 0 ? this.htmlElements[0].dataset[name] : undefined;
        } else {
            this.each(function (i, el) {
                el.dataset[name] = value;
            });
            return this;
        }
    },

    children: function (selector) {
        var elements = [];
        this.each(function (i, el) {
            var children = el.querySelectorAll(selector);
            _.each(children, function (i, el) {
                elements.push(el);
            });
        });
        return _(elements);
    }
}

