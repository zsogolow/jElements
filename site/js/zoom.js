document.addEventListener('DOMContentLoaded', function () {

    var scrollingContainer = document.getElementsByClassName('zm-content-container')[0];
    var headerContainer = document.getElementsByClassName('zm-header-container')[0];

    if (scrollingContainer) {

        var lastPosition = 0;
        var scrolling = false;

        function scroll(lastScrollPosition) {
            if (lastScrollPosition > 4) {
                headerContainer.classList.add('cast-shadow');
            } else {
                headerContainer.classList.remove('cast-shadow');
            }
        }

        var requestAnimation = window.requestAnimationFrame || window.msRequestAnimationFrame;
        scrollingContainer.addEventListener('scroll', function (evt) {
            lastPosition = scrollingContainer.scrollY || scrollingContainer.scrollTop;
            if (!scrolling) {
                requestAnimation(function () {
                    scroll(lastPosition);
                    scrolling = false;
                });
            }
            scrolling = true;
        });
    }


    var menuToggle = document.getElementsByClassName('zm-nav-toggle')[0];
    var menuContainer = document.getElementsByClassName('zm-menu-container')[0];
    var menuOverlay = document.getElementsByClassName('zm-menu-overlay')[0];

    menuToggle.addEventListener('click', function () {
        toggleMenu(!menuToggle.classList.contains('open'));
    });

    function toggleMenu(open) {
        if (open) {
            menuContainer.classList.add('open');
            menuToggle.classList.add('open');
            menuOverlay.classList.add('open');
        } else {
            menuToggle.classList.remove('open');
            menuContainer.classList.remove('open');
            menuOverlay.classList.remove('open');
        }
        console.log('toggle');
    }

    menuOverlay.addEventListener('click', function () {
        console.log('click');
        toggleMenu(false);
    });

});