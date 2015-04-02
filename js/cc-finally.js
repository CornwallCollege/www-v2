"use strict";
(function ($) {
    $(document).ready(function () {
        $.each(window.loadFuncs, function (i, func) {
            func();
        });

        /* PORTFOLIO EXPANDER GRID INITIALIZER */
        if ($("#og-grid").length) {
            Grid.init();
        }

    });
})(jQuery);