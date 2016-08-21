function parallax() {

    // Avoid clobbering the window scope:
    // return a new _ object if we're in the wrong scope
    if (window === this) {
        return new parallax();
    }

    this._parallaxParent = _('.parallax-scroller');
    this._parallaxContainer = _('.parallax-container');
    this._parallaxis = _('.parallax');

    (function (_scrollable, _container, _parallaxis) {

        _container.each(function (i, el) {
            el.style.height = _scrollable.attr('scrollHeight') + 'px';
        });

        _parallaxis.each(function (i, el) {
            var top = getComputedStyle(el).getPropertyValue('top');
            _(el).data('originTop', top);
        });

        function scroll(scrollPos, deltaY) {
            console.log(scrollPos + ' ' + deltaY);
            _parallaxis.each(function (i, el) {
                var speed = parseInt(_(el).data('laxSpeed'));
                var yPos = -(scrollPos / speed) + parseInt(_(el).data('originTop'));
                el.style.top = yPos + 'px';
            });
        }
        var lastScroll = 0;
        var lastDelta = 0;
        var ticking = false;
        _scrollable.bind('scroll', function (event) {
            var tempScroll = _scrollable.attr('scrollTop');
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


        function resize() {
            _container.each(function (i, el) {
                _(el).removeStyleProperty('height');
                el.style.height = _scrollable.attr('scrollHeight') + 'px';
            });
            _parallaxis.each(function (i, el) {
                _(el).removeStyleProperty('top');
                    var top = getComputedStyle(el).getPropertyValue('top');
                _(el).data('originTop', top);
                // el.style.top = (_scrollable.attr('scrollTop') + parseInt(top)) + 'px';
            });
        }
        var lastResizeEvent = undefined;
        var resizing = false;
        _(window).bind('resize', function (event) {
            lastResizeEvent = event;
            // if (!resizing) {
                // window.requestAnimationFrame(function () {
                    resize();
                    resizing = false;
                // });
            // }
            resizing = true;
        });

    })(this._parallaxParent, this._parallaxContainer, this._parallaxis);
}

parallax.prototype = {
    doSomething: function () {
    },
}