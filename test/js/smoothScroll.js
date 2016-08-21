function scroller(scrollable) {

    // Avoid clobbering the window scope:
    // return a new scroller object if we're in the wrong scope
    if (window === this) {
        return new scroller(scrollable);
    }

    this.scrollable = scrollable;
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
        var anchor = anchor;
        var anchorOffset = anchor.offsetTop;
        var currentScroll = this.scrollable.scrollTop;

        var distance = anchorOffset - currentScroll;
        var time = options.speed;
        var step = 16;
        var increment = distance / (time / step);
        var scrollable = this.scrollable;
        var stopAnimation;
        var smallStep = false;
        var smallStepIncrement = undefined;

        // Scroll the page by an increment, and check if it's time to stop
        var animateScroll = function () {
            if (smallStep) {
                scrollable.scrollTop = scrollable.scrollTop + smallStepIncrement;
            } else {
                scrollable.scrollTop = scrollable.scrollTop + increment;
            }
            stopAnimation(this.cancelScroll);
        };

        // If scrolling down
        if (increment >= 0) {
            // Stop animation when you reach the anchor OR the bottom of the page
            stopAnimation = function (force) {
                var traveled = scrollable.scrollTop;
                var offsetTop = scrollable.offsetTop;
                if (force === true
                    || (traveled <= anchorOffset + 0.5 && traveled >= anchorOffset - 0.5)
                    || traveled == scrollable.scrollHeight) {
                    clearInterval(runAnimation);
                    this.prevAnimation = -1;
                    if (callback) {
                        callback();
                    }
                }
                else if ((traveled > (anchorOffset - increment))) {
                    smallStepIncrement = anchorOffset - traveled;
                    smallStep = true;
                }
            };
        }
        // If scrolling up
        else {
            // Stop animation when you reach the anchor OR the top of the page
            stopAnimation = function (force) {
                var traveled = scrollable.scrollTop;
                if (force === true
                    || (traveled <= anchorOffset + 0.5 && traveled >= anchorOffset - 0.5)
                    || traveled == 0) {
                    clearInterval(runAnimation);
                    this.prevAnimation = -1;
                    if (callback) {
                        callback();
                    }
                }
                else if (traveled < (anchorOffset - increment)) {
                    smallStepIncrement = anchorOffset - traveled;
                    smallStep = true;
                }
            };
        }

        // Loop the animation function
        var runAnimation = setInterval(animateScroll, 16);
        this.prevAnimation = runAnimation;
    },

    scrollToPosition: function (position, options) {
        this.scrollable.scrollTop = position;
    }
}