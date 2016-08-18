function scroller() {

    // Avoid clobbering the window scope:
    // return a new _ object if we're in the wrong scope
    if (window === this) {
        return new scroller();
    }

    this._scrollable = _('.smoothScrolling');
    this.prevAnimation = -1;
    this.cancelScroll = false;
}

scroller.prototype = {

    /*
        anchor => HTMLElement, valid selector
        options => {
            speed: 1000
        }
    */
    scrollToAnchor: function (anchor, options, callback) {
        if (this.prevAnimation != -1) {
            clearInterval(this.prevAnimation);
        }
        var _anchor = _(anchor);
        var anchorOffset = _anchor.attr('offsetTop');
        var currentScroll = this._scrollable.attr('scrollTop');

        var distance = anchorOffset - currentScroll;
        var time = options.speed;
        var step = 16;
        var increment = distance / (time / step);
        var _scrollable = this._scrollable;
        var stopAnimation;
        var smallStep = false;
        var smallStepIncrement = undefined;

        // Scroll the page by an increment, and check if it's time to stop
        var animateScroll = function () {
            if (smallStep) {
                _scrollable.attr('scrollTop', _scrollable.attr('scrollTop') + (increment > 0 ? 1 : -1));
            } else {
                _scrollable.attr('scrollTop', _scrollable.attr('scrollTop') + increment);
            }
            stopAnimation(this.cancelScroll);
        };

        // If scrolling down
        if (increment >= 0) {
            // Stop animation when you reach the anchor OR the bottom of the page
            stopAnimation = function (force) {
                var traveled = _scrollable.attr('scrollTop');
                var offsetTop = _scrollable.attr('offsetTop');
                if (force === true || traveled == (anchorOffset || _scrollable.attr('scrollHeight'))) {
                    clearInterval(runAnimation);
                    this.prevAnimation = -1;
                    if (callback) {
                        callback();
                    }
                }
                else if ((traveled > (anchorOffset - increment))) {
                    smallStep = true;
                }
            };
        }
        // If scrolling up
        else {
            // Stop animation when you reach the anchor OR the top of the page
            stopAnimation = function (force) {
                var traveled = _scrollable.attr('scrollTop');
                if (force === true || traveled == (anchorOffset || 0)) {
                    clearInterval(runAnimation);
                    this.prevAnimation = -1;
                    if (callback) {
                        callback();
                    }
                }
                else if (traveled < (anchorOffset - increment)) {
                    smallStep = true;
                }
            };
        }

        // Loop the animation function
        var runAnimation = setInterval(animateScroll, 16);
        this.prevAnimation = runAnimation;
    },

    scrollToPosition: function (position, options) {
        this._scrollable.attr('scrollTop', position);
    }
}