document.addEventListener('DOMContentLoaded',function() {
   var _menuToggle = _('#menuToggle');
   var _bodyNav = _('#bodyNav');
   _menuToggle.bind('click', function() {
       _bodyNav.toggleClass('open');
       _menuToggle.toggleClass('open');
   });

   _(window).bind('resize', function(event) {
       var width = window.innerWidth / 16;
       if (width >= 38) {
           _bodyNav.removeClass('open');
           _menuToggle.removeClass('open');
    }
   });
});