document.addEventListener('DOMContentLoaded', function () {
    var zoom = (function () {
        var util = {
            initHeader: function (header, scrollingContainer, extendoHeader) {
                if (!header || !scrollingContainer) {
                    // something is missing
                    return;
                }

                var lastPosition = 0;
                var scrolling = false;
                // function called on 'scroll' event
                function scroll(lastScrollPosition) {
                    if (extendoHeader) {
                        if (lastScrollPosition > 84) {
                            extendoHeader.classList.add('extendo');
                        } else {
                            extendoHeader.classList.remove('extendo');
                        }
                    }
                    if (lastScrollPosition > 4) {
                        header.classList.add('cast-shadow');
                    } else {
                        header.classList.remove('cast-shadow');
                    }
                }

                var requestAnimation = window.requestAnimationFrame || window.msRequestAnimationFrame;
                scrollingContainer.addEventListener('scroll', function (evt) {
                    lastPosition = scrollingContainer.scrollTop;
                    if (!scrolling) {
                        requestAnimation(function () {
                            scroll(lastPosition);
                            scrolling = false;
                        });
                    }
                    scrolling = true;
                });
            },
            /**
             * initializes the nav menu
             */
            initMenu: function (menuToggle, menuContainer, menuOverlay) {
                if (!menuToggle || !menuContainer || !menuOverlay) {
                    // something is missing
                    return;
                }
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
            }
        };

        var scrollingContainer = document.getElementsByClassName('zm-content-container')[0];
        var headerContainer = document.getElementsByClassName('zm-header-container')[0];
        var extendoHeader = document.getElementsByClassName('zm-extendo-header')[0];
        util.initHeader(headerContainer, scrollingContainer, extendoHeader);

        var menuToggle = document.getElementsByClassName('zm-nav-toggle')[0];
        var menuContainer = document.getElementsByClassName('zm-menu-container')[0];
        var menuOverlay = document.getElementsByClassName('zm-menu-overlay')[0];
        util.initMenu(menuToggle, menuContainer, menuOverlay);

        return util;
    })();
    window.zoom = zoom;
});

