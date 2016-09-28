_(document).bind('DOMContentLoaded', function () {

    if ('ontouchstart' in document.documentElement) {
        document.body.classList.add('touch-enabled');
    }

    // elements
    var _menuToggle = _('.menu-icon'),
        _fullScreenNav = _('.full-screen-nav'),
        _navItems = _('.nav-item'),
        _navBubbles = _('.nav-bubble'),
        _scrollable = _('.smooth-scrolling'),
        _sections = _('.main-section'),
        _appearItems = _('.appear-item'),
        _toTop = _('.back-to-top');

    // utils
    var smoothScroll = undefined;
    var lax = undefined;

    // init method
    function init() {
        smoothScroll = scroller();
        lax = parallax();

        scroll(_scrollable.attr('scrollTop'));

        _appearItems.appear(_scrollable, function (el) {
            _(el).toggleClass('appear');
        }, 100);

    }

    // init events
    _menuToggle.bind('click', function () {
        _menuToggle.toggleClass('open');
        _fullScreenNav.toggleClass('open');
    });

    _toTop.bind('click', function () {
        smoothScroll.scrollToAnchor(_('#intro').item(0), { speed: 500 });
    });

    _navItems.bind('click', function () {
        _menuToggle.toggleClass('open');
        _fullScreenNav.toggleClass('open');
        _navItems.removeClass('active');
        var _this = _(this);
        var dataNav = _this.data('nav');
        _this.addClass('active');
        smoothScroll.scrollToAnchor(_('#' + dataNav).item(0), { speed: 500 });
    });

    _navBubbles.bind('click', function () {
        var _this = _(this);
        var dataNav = _this.data('nav');
        smoothScroll.scrollToAnchor(_('#' + dataNav).item(0), { speed: 500 });
    });

    function resize(event) {
    }
    var lastResizeEvent = undefined;
    var resizing = false;
    _(window).bind('resize', function (event) {
        lastResizeEvent = event;
        if (!resizing) {
            window.requestAnimationFrame(function () {
                resize(lastResizeEvent);
                resizing = false;
            });
        }
        resizing = true;
    });

    function scroll(lastScroll) {
        _sections.each(function (i, el) {
            var _section = _(el);
            var offsetTop = _section.attr('offsetTop');
            var offsetHeight = _section.attr('offsetHeight');

            if (offsetTop <= lastScroll + (offsetHeight / 2)
                && offsetTop >= lastScroll - (offsetHeight / 2)) {
                _sections.removeClass('active');
                _navItems.removeClass('active');
                _navBubbles.removeClass('active');
                _navItems.each(function (i, li) {
                    var _li = _(li);
                    var dataNav = _(li).data('nav');
                    if (dataNav == el.id) {
                        _li.addClass('active');
                        _section.addClass('active');
                        _('.nav-bubble[data-nav="' + dataNav + '"]').addClass('active');
                    }
                });
            }
        });
    }

    var lastScroll;
    var scrolling;
    _scrollable.bind('scroll', function (event) {
        lastScroll = _scrollable.attr('scrollTop');
        if (!scrolling) {
            window.requestAnimationFrame(function () {
                scroll(lastScroll);
                scrolling = false;
            });
        }
        scrolling = true;
    });

    // finally, call the init method
    init();
});

function animListener(e) {
    switch (e.type) {
        case "animationstart":
            break;
        case "animationend":
            break;
        case "animationiteration":
            break;
    }
}