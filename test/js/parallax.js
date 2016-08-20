function parallax() {

    // Avoid clobbering the window scope:
    // return a new _ object if we're in the wrong scope
    if (window === this) {
        return new parallax();
    }

    this._scrollable = _('.parallax-scroll-container');

    (function (scrollable) {
        var lastScroll = 0;
        var lastDelta = 0;
        var ticking = false;

        _('.parallax').each(function (i, el) {
            var top = getComputedStyle(el).getPropertyValue('top');
            _(el).data('top', top);
        });

        function scroll(scrollPos, deltaY) {
            console.log(scrollPos + ' ' + deltaY);
            _('.parallax').each(function (i, el) {
                var speed = parseInt(_(el).data('laxSpeed'));
                var yPos = -(scrollPos / speed) + parseInt(_(el).data('top'));

                el.style.top = yPos + 'px';
            });
        }

        scrollable.bind('scroll', function (event) {
            var tempScroll = scrollable.attr('scrollTop');
            lastDelta = lastScroll > tempScroll ? -1 : 1;
            lastScroll = tempScroll;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    scroll(lastScroll, lastDelta);
                    ticking = false;
                });
            }
            ticking = true;
        });
    })(this._scrollable);
}

scroller.prototype = {
    doSomething: function () {
    },
}