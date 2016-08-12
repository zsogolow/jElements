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
        var sectionName =_(this).data('section'); 
        _('#bodyMain section').addClass('hidden');
        _('#' + sectionName).removeClass('hidden');
    });
});