_(document).bind('DOMContentLoaded', function () {

    var smoothScroll = undefined;
    var lax = undefined;

    function init() {

        smoothScroll = scroller(_('.smooth-scrolling').item(0));
        lax = parallax();
 

    }


    init();


});