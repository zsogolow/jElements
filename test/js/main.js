_(document).bind('DOMContentLoaded', function () {
    var _menuToggle = _('#menuToggle'),
        _bodyNav = _('#bodyNav'),
        _bodyMain = _('#bodyMain'),
        _lis = _('#bodyNav ul li'),
        _moreButtons = _('.moreButton'),
        _sections = _('#bodyMain section');

    var smoothScroll = scroller();

    function init() {
        window.addEventListener('scroll', function (event) {
            if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 10);
            }
        }, false);
    }

    function scrollPage() {
        didScroll = false;
    }

    var wheelCount = 0;
    var lastDirection;
    var notScrolling = true;

    var isHijacked = _bodyMain.data('hijacked');
    if (isHijacked == 'true') {
        _bodyMain.bind('wheel', function (event) {
            if (notScrolling) {
                if (!lastDirection || lastDirection == event.deltaY) {
                } else {
                    wheelCount = 0;
                }
                lastDirection = event.deltaY;
                wheelCount++;

                if (wheelCount % 3 == 0) {
                    var scroll = event.deltaY;

                    var _activeSection = _('#bodyMain section.active');
                    var index = parseInt(_activeSection.data('index'));
                    var _newSection;
                    if (scroll > 0) {
                        // down
                        _newSection = (index < (_sections.length - 1)) ? _('#bodyMain section[data-index="' + (index + 1) + '"]') : undefined;
                    } else {
                        _newSection = (index > 0) ? _('#bodyMain section[data-index="' + (index - 1) + '"]') : undefined;
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
        });
    }

    _('#bodyMain').bind('scroll', function (event) {
        var scrollPosition = _bodyMain.attr('scrollTop');
        var height = _bodyMain.attr('scrollHeight');
        console.log(scrollPosition);

        _sections.each(function (i, el) {
            var _section = _(el);
            var offsetTop = _section.attr('offsetTop');
            var offsetHeight = _section.attr('offsetHeight');

            if (offsetTop <= scrollPosition + (offsetHeight / 2)
                && offsetTop >= scrollPosition - (offsetHeight / 2)) {
                _sections.removeClass('active');
                _lis.removeClass('active');
                _lis.each(function (i, li) {
                    if (_(li).data('section') == el.id) {
                        _(li).addClass('active');
                        _section.addClass('active');
                    }
                });
            }
        });
    });

    _moreButtons.bind('click', function (evt) {
        var index = _(this).data('index');
        smoothScroll.scrollToAnchor(_('#bodyMain section[data-index="' + (parseInt(index) + 1) + '"]'), { speed: 500 });
    });

    _menuToggle.bind('click', function () {
        _bodyNav.toggleClass('open');
        _menuToggle.toggleClass('open');
    });

    _(window).bind('resize', function (event) {
        var width = window.innerWidth / 16;
        if (width >= 48) {
            _bodyNav.removeClass('open');
            _menuToggle.removeClass('open');
        }
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
