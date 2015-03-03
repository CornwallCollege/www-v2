(function($) {

	/* ISOTOPE FOR PORTFOLIO ITEMS */
	if ( $( "#career-grid" ).length ) {
		var $container = $('#career-grid').imagesLoaded( function() {
			var isotope = function () {
				$container.isotope({
					resizable: false,
					itemSelector: '.entry',
				});
			};
			isotope();
		});

		$('div.career-filter ul a').click(function(){
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				}
			});
			return false;
		});
		
		var $optionSets = $('div.career-filter ul'),
			$optionLinks = $optionSets.find('a');
		$optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
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
				queue: false,
			}
		});
		
 		$( ".career-popup" ).each(function(index){
			var popupName = $(this).attr("id");			

			$("[data-popup='"+popupName+"']" ).on('click',function() {
				var popupName = $(this).attr("data-popup");
				var popup = document.getElementById(popupName);
			 	classie.toggle( popup, 'cbp-spmenu-open' );
				$('.counter').counterUp({
				   delay: 60,
				   time: 1000
			   });
		 	});
	   });
	}	
})(jQuery);