_(document).bind('DOMContentLoaded', function () {

    var _scrollContainer = _('.smooth-scrolling');

    var smoothScroll = undefined;
    var lax = undefined;

    function init() {

        smoothScroll = scroller(_scrollContainer.item(0));
        lax = parallax();

    }


    init();


});