document.addEventListener('DOMContentLoaded', function () {
    var _menuToggle = _('#menuToggle'),
        _bodyNav = _('#bodyNav'),
        _lis = _('#bodyNav ul li');

    _menuToggle.bind('click', function () {
        _bodyNav.toggleClass('open');
        _menuToggle.toggleClass('open');
    });

    _(window).bind('resize', function (event) {
        var width = window.innerWidth / 16;
        if (width >= 38) {
            _bodyNav.removeClass('open');
            _menuToggle.removeClass('open');
        }
    });

    _lis.bind('click', function (event) {
        _lis.removeClass('active');
        _(this).addClass('active');
    });

    _lis.bind('mouseover', function (event) {
        var _icon = _(this).children('i');
        var anim = _icon.htmlElements[0].dataset.anim;
        var animLength = _icon.htmlElements[0].dataset.animlen;
        _icon.addClass(anim);
        setTimeout(function() {
            _icon.removeClass(anim);
         }, parseInt(animLength));
    });
});