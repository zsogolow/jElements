document.addEventListener('DOMContentLoaded', function () {
    var _menuToggle = _('#menuToggle'),
        _bodyNav = _('#bodyNav'),
        _bodyMain = _('#bodyMain'),
        _lis = _('#bodyNav ul li'),
        _moreButton = _('#moreButton'),
        _sections = _('#bodyMain section');

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
                console.log(el.id);
                _lis.removeClass('active');
                _lis.each(function (i, li) {
                    if (_(li).data('section') == el.id) {
                        _(li).addClass('active');
                    }
                });
            }
        });

    });

    function scrollIntoView(section) {
        var _section = _('#' + section);
        _bodyMain.attr('scrollTop', _section.attr('offsetTop'));
    }

    _moreButton.bind('click', function (evt) {
        scrollIntoView('code');
    });

    _menuToggle.bind('click', function () {
        _bodyNav.toggleClass('open');
        _menuToggle.toggleClass('open');
    });

    _(window).bind('resize', function (event) {
        var width = window.innerWidth / 16;
        if (width >= 42) {
            _bodyNav.removeClass('open');
            _menuToggle.removeClass('open');
        }
    });

    _lis.bind('click', function (event) {
        _lis.removeClass('active');
        _('#bodyMain section').removeClass('active');
        _(this).addClass('active');
        _('#' + _(this).data('section')).addClass('active');
        _bodyNav.removeClass('open');
        _menuToggle.removeClass('open');

        sessionStorage.setItem('hash', _(this).data('section'));
        scrollIntoView(sessionStorage.getItem('hash'));
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

    function init() {
    }

    init();
});
