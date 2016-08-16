document.addEventListener('DOMContentLoaded', function () {
    var _menuToggle = _('#menuToggle'),
        _bodyNav = _('#bodyNav'),
        _lis = _('#bodyNav ul li'),
        _moreButton = _('#more');

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
        _(this).addClass('active');
        var sectionName = _(this).data('section');
        _('#bodyMain section').addClass('hidden');
        _('#' + sectionName).removeClass('hidden');
        _bodyNav.removeClass('open');
        _menuToggle.removeClass('open'); 
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
});
