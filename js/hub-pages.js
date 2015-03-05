(function ($) {
    "use strict";
	/* ISOTOPE FOR PORTFOLIO ITEMS */
	if ($("#career-grid").length) {
		var $container = $('#career-grid').imagesLoaded(function () {
			var isotope = function () {
				$container.isotope({
					resizable: false,
					itemSelector: '.entry'
				});
            };
			isotope();
		});

		$('div.career-filter ul a').click(function () {
            var selector = $(this).attr('data-filter');
			$('html, body').animate({
                scrollTop: $('#career-grid-anchor').offset().top
            }, 500);
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});
		
		var $optionSets = $('div.career-filter ul'),
			$optionLinks = $optionSets.find('a');
		$optionLinks.click(function () {
			var $this = $(this);
			// don't proceed if already selected
			if ($this.hasClass('selected')) {
				return false;
			}
			var $optionSet = $this.parents('div.career-filter ul');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
		});

		$container.isotope({
			filter: "load",
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});


        $("[data-popup]").on('click', function () {
            $('html, body').addClass('noscroll');
            var popupName = 'engineering';//$(this).attr("data-popup");
            var popup = document.getElementById(popupName);
            $.get('./career-pages/' + popupName + '.html', function (data) {
                $("#career-content").html(data);
                $('.career-popup').addClass('cbp-spmenu-open');
                $("#close").addClass('show-close');
                $('.counter').counterUp({
                    delay: 100,
                    time: 3000
                });
            });
        });
		
		$(".career-help-bar > .ls-close").on('click', function () {
			$('html, body').removeClass('noscroll');
			$(this).parent().parent().removeClass('cbp-spmenu-open');
            $("#close").removeClass('show-close');
		});
	}
})(jQuery);
