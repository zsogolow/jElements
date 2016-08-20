_(document).bind('DOMContentLoaded', function () {
    var _menuToggle = _('#menuToggle'),
        _bodyNav = _('.navigation-container'),
        _bodyMain = _('.body-main'),
        _lis = _('.navigation-list-container ul li'),
        _moreButtons = _('.moreButton'),
        _sections = _('.body-main section'),
        _hiJacker = _('#hijackToggle');

    var smoothScroll = scroller();

    var wheelCount = 0;
    var lastDirection;
    var notScrolling = true;
    var isJacked = false;
    var isMobile = _.deviceType() == 'mobile';

    function init() {
        if (isMobile) {
            _hiJacker.remove();
            _bodyMain.data('hijacked', false);
        }
        isJacked = _bodyMain.data('hijacked') == 'true';
        if (isJacked) {
            _hiJacker.addClass('hijacked');
        } else {
            _hiJacker.removeClass('hijacked');
        }
    }

    _('.tiltLabel').appear(_bodyMain, function (element) { _(element).toggleClass('tilt') }, 10);
    _('.slideLabel').appear(_bodyMain, function (element) { _(element).toggleClass('slide-in') }, 10);
    _('.fadeLabel').appear(_bodyMain, function(element) {_(element).toggleClass('fade-in')}, 10);

    _hiJacker.bind('click', function () {
        isJacked = _bodyMain.data('hijacked') == 'true';
        isJacked = !isJacked;
        _bodyMain.data('hijacked', isJacked);

        if (isJacked) {
            _(this).addClass('hijacked');
        } else {
            _(this).removeClass('hijacked');
        }
    });

    _bodyMain.bind('wheel', function (event) {
        if (isJacked == true) {
            if (notScrolling) {
                if (!lastDirection || lastDirection == event.deltaY) {
                } else {
                    wheelCount = 0;
                }
                lastDirection = event.deltaY;
                wheelCount++;

                if (wheelCount % 3 == 0) {
                    var scroll = event.deltaY;

                    var _activeSection = _('.body-main section.active');
                    var index = parseInt(_activeSection.data('index'));
                    var _newSection;
                    if (scroll > 0) {
                        // down
                        _newSection = (index < (_sections.length - 1)) ? _('.body-main section[data-index="' + (index + 1) + '"]') : undefined;
                    } else {
                        _newSection = (index > 0) ? _('.body-main section[data-index="' + (index - 1) + '"]') : undefined;
                    }

                    if (_newSection) {
                        wheelCount = 0;
                        notScrolling = false;
                        smoothScroll.scrollToAnchor(_newSection, { speed: 800 }, function () {
                            notScrolling = true;
                        });
                    }
                }
            }
            return false;
        }
    });

    var scrolling = false;
    var lastKnownScroll = 0;
    var a = undefined;
    // window.requestAnimationFrame == requestAnimationFrame || msRequestAnimationFrame;
    _('.body-main').bind('scroll', function (event) {
        _('.moreButton').removeClass('fadeIn');
        _('.moreButton').addClass('fadeOut');
        clearTimeout(a);
        var scrollPosition = _bodyMain.attr('scrollTop');
        lastKnownScroll = scrollPosition;
        if (!scrolling) {
            window.requestAnimationFrame(function () {
                var height = _bodyMain.attr('scrollHeight');
                // console.log(scrollPosition);
                _sections.each(function (i, el) {
                    var _section = _(el);
                    var offsetTop = _section.attr('offsetTop');
                    var offsetHeight = _section.attr('offsetHeight');

                    if (offsetTop <= lastKnownScroll + (offsetHeight / 2)
                        && offsetTop >= lastKnownScroll - (offsetHeight / 2)) {
                        _sections.removeClass('active');
                        _lis.removeClass('active');
                        _('.navBubble').removeClass('active');
                        _lis.each(function (i, li) {
                            if (_(li).data('section') == el.id) {
                                _(li).addClass('active');
                                _section.addClass('active');
                                _('.navBubble[data-index="' + _section.data('index') + '"]').addClass('active');
                            }
                        });
                    }
                });
                a = setTimeout(function () {
                    _('.moreButton').removeClass('fadeOut');
                    _('.moreButton').addClass('fadeIn');
                }, 600);
                scrolling = false;
            });
        }
        scrolling = true;
    });

    _moreButtons.bind('click', function (evt) {
        var index = _(this).data('index');
        smoothScroll.scrollToAnchor(_('.body-main section[data-index="' + (parseInt(index) + 1) + '"]'), { speed: 500 });
    });

    _menuToggle.bind('click', function () {
        _bodyNav.toggleClass('open');
        _menuToggle.toggleClass('open');
    });

    _(window).bind('resize', function (event) {
        var width = window.innerWidth / 16;
        if (width >= 34.5) {
            _bodyNav.removeClass('open');
            _menuToggle.removeClass('open');
        }
        // need to remain scrolled to the top of active section
        _bodyMain.attr('scrollTop', (_('section.active').attr('offsetTop')));;

    });

    _lis.bind('click', function (event) {
        _bodyNav.removeClass('open');
        _menuToggle.removeClass('open');
        var section = _(this).data('section');
        sessionStorage.setItem('hash', section);
        smoothScroll.scrollToAnchor(_('#' + section), { speed: 800 }, function () {
        });
    });

    _lis.bind('mouseover', function (event) {
        var _li = _(this);
        _(this).bind('animationstart', animListener, false);
        _(this).bind('animationend', animListener, false);
        _(this).bind('animationiteration', animListener, false);

        var anim = _li.data('anim');
        var animLength = _li.data('animlength');

        if (anim && animLength) {
            _li.children('i').addClass(anim);
        }
    });

    function animListener(e) {
        var _el = _(e.target).parent('li');
        var anim = _el.data('anim');
        var animLength = _el.data('animlength');

        switch (e.type) {
            case "animationstart":
                break;
            case "animationend":
                _el.children('i').removeClass(anim);
                break;
            case "animationiteration":
                break;
        }
    }

    init();
});
