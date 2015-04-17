$(document).ready(function () {        
    if (location.pathname.indexOf("skrollr") !== -1) {
        window.s = skrollr.init();
        skrollr.refresh = function() {
            window.s.destroy();
            window.s = skrollr.init();
        };        
    };
});