function scroller() {

    // Avoid clobbering the window scope:
    // return a new _ object if we're in the wrong scope
    if (window === this) {
        return new scroller();
    }

    this._scrollable = _('.smoothScrolling');
}

scroller.prototype = {

    /*
        anchor => HTMLElement, valid selector
        options => {
            speed: 1000
        }
    */
    scrollToAnchor: function (anchor, options, callback) {
        var _anchor = _(anchor);
        var anchorOffset = _anchor.attr('offsetTop');
        var currentScroll = this._scrollable.attr('scrollTop');

        var distance = anchorOffset - currentScroll;
        var time = options.speed;
        var step = 16;
        var increment = distance / (time / step);
        var _scrollable = this._scrollable;
        var stopAnimation;


        // Scroll the page by an increment, and check if it's time to stop
        var animateScroll = function () {
            _scrollable.attr('scrollTop', _scrollable.attr('scrollTop') + increment);
            stopAnimation();
        };

        // If scrolling down
        if (increment >= 0) {
            // Stop animation when you reach the anchor OR the bottom of the page
            stopAnimation = function () {
                var traveled = _scrollable.attr('scrollTop');
                if ((traveled >= (anchorOffset - increment)) || _scrollable.attr('scrollTop') == _scrollable.attr('scrollHeight')) {
                    clearInterval(runAnimation);
                    if (callback) {
                        callback();
                    }
                }
            };
        }
        // If scrolling up
        else {
            // Stop animation when you reach the anchor OR the top of the page
            stopAnimation = function () {
                var traveled = _scrollable.attr('scrollTop');
                if (traveled <= (anchorOffset || 0)) {
                    clearInterval(runAnimation);
                    if (callback) {
                        callback();
                    }
                }
            };
        }

        // Loop the animation function
        var runAnimation = setInterval(animateScroll, 16);

    },

    scrollToPosition: function (position, options) {
        this._scrollable.attr('scrollTop', position);
    }
}