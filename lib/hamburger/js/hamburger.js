'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var hamburger = (function () {
        function Hamburger(selector) {
            if (!selector)
                selector = '.menu-icon';
            var menuIcon = document.querySelector(selector);
            this.menuIcon = menuIcon;
        }
        return {
            init: function (selector) {
                this.hamburger = new Hamburger(selector);
                return this;
            },
            onClick: function (fn) {
                if (this.hamburger) {
                    this.hamburger.menuIcon.addEventListener('click', fn);
                    return true;
                }
                return false;
            },
        };
    })();
    window.hamburger = hamburger;
});