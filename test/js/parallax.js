function parallax() {

    // Avoid clobbering the window scope:
    // return a new parallax object if we're in the wrong scope
    if (window === this) {
        return new parallax();
    }

    this.parallaxScrollers = document.getElementsByClassName('parallax-scroller');

    (function (scrollables) {
        function each(els, handler) {
            for (var i = 0; i < els.length; i++) {
                handler(i, els[i]);
            }
        }

        function removeInlineStyle(element, prop) {
            if (element.style.removeProperty) {
                element.style.removeProperty(prop);
            } else {
                element.style.removeAttribute(prop);
            }
        }

        each(scrollables, function (i, scrollable) {
            each(scrollable.querySelectorAll('.parallax-container'), function (i, container) {
                container.style.height = scrollable.scrollHeight + 'px';
            });
            each(scrollable.querySelectorAll('.parallax'), function (i, parallax) {
                var top = getComputedStyle(parallax).getPropertyValue('top');
                parallax.dataset.originTop = top;
            });
        });

        function scroll(scrollPos, deltaY) {
            each(scrollables, function (i, scrollable) {
                each(scrollable.querySelectorAll('.parallax'), function (i, parallax) {
                    var speed = parseInt(parallax.dataset.laxSpeed);
                    var yPos = -(scrollPos / speed) + parseInt(parallax.dataset.originTop);
                    parallax.style.top = yPos + 'px';
                });
            });
        }
        var lastScroll = 0;
        var lastDelta = 0;
        var ticking = false;
        each(scrollables, function (i, scrollable) {
            scrollable.addEventListener('scroll', function (event) {
                var tempScroll = scrollable.scrollTop;
                lastDelta = lastScroll > tempScroll ? -1 : 1;
                lastScroll = tempScroll;
                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        scroll(lastScroll, lastDelta);
                        ticking = false;
                    });
                }
                ticking = true;
            })
        });

        function resize() {
            each(scrollables, function (i, scrollable) {
                each(scrollable.querySelectorAll('.parallax-container'), function (i, container) {
                    removeInlineStyle(container, 'height');
                    container.style.height = scrollable.scrollHeight + 'px';
                });
                each(scrollable.querySelectorAll('.parallax'), function (i, parallax) {
                    removeInlineStyle(parallax, 'top');
                    var top = getComputedStyle(parallax).getPropertyValue('top');
                    parallax.dataset.originTop = top;
                });
            });

        }
        var lastResizeEvent = undefined;
        var resizing = false;
        window.addEventListener('resize', function (event) {
            lastResizeEvent = event;
            if (!resizing) {
                window.requestAnimationFrame(function () {
                    resize();
                    resizing = false;
                });
            }
            resizing = true;
        });

    })(this.parallaxScrollers);
}

parallax.prototype = {
    doSomething: function () {
    },
}