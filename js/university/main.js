/*
	01. Smooth scrolling
	02. FitText
	03. Magnific Popup
	04. Sliders
	05. Fading divs
	06. Contactform
	07. Menu toggle
	08. Fixed menu
	09. Equal height
*/


// 01. Smooth scrolling - Smooth scroll after clicking an element with the class 'smoothscroll'
$(function(){
	$('.smoothscroll').bind('click.smoothscroll',function (e){
		e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
			'scrollTop': $target.offset().top-0
        }, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
});


// 02. FitText
$(window).load(function(){
	setTimeout(function(){
		$('h1.fittext').fitText(1, { minFontSize: '50px', maxFontSize: '100px' });
		$('h2.fittext').fitText(1, { minFontSize: '40px', maxFontSize: '80px' });
		$('h3.fittext').fitText(1, { minFontSize: '30px', maxFontSize: '60px' });
		$('h4.fittext').fitText(1, { minFontSize: '20px', maxFontSize: '40px' });
		$('h5.fittext').fitText(1, { minFontSize: '15px', maxFontSize: '30px' });
		$('h6.fittext').fitText(1, { minFontSize: '10px', maxFontSize: '20px' });
	}, 200);
});

$('h1.fittext').fitText(1, { minFontSize: '50px', maxFontSize: '100px' });
$('h2.fittext').fitText(1, { minFontSize: '40px', maxFontSize: '80px' });
$('h3.fittext').fitText(1, { minFontSize: '30px', maxFontSize: '60px' });
$('h4.fittext').fitText(1, { minFontSize: '20px', maxFontSize: '40px' });
$('h5.fittext').fitText(1, { minFontSize: '15px', maxFontSize: '30px' });
$('h6.fittext').fitText(1, { minFontSize: '10px', maxFontSize: '20px' });


// 03. Magnific Popup - Magnific Popup for images
$('.popup, popup-image').magnificPopup({ 
	type: 'image',
	fixedContentPos: false,
	fixedBgPos: false,
	mainClass: 'mfp-no-margins mfp-with-zoom',
	image: {
		verticalFit: true
	},
	zoom: {
		enabled: true,
		duration: 300
	}
});

// Magnific Popup for soundcloud
$('.popup-soundcloud').magnificPopup({ 
	type: 'iframe',
	mainClass: 'soundcloud-popup'
});

// Magnific Popup for videos and google maps
$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	disableOn: 700,
	type: 'iframe',
	fixedContentPos: false,
	fixedBgPos: false,
	mainClass: 'mfp-fade',
	removalDelay: 160,
	preloader: false
});

// Magnific Popup for a normal inline element
$('.popup-inline').magnificPopup({
	type: 'inline'
});

// Magnific Popup for a project with rich content
$('.popup-project').magnificPopup({
	type: 'inline',
	alignTop: true
});

// Magnific Popup for an ajax popup without rich content
$('.popup-ajax').magnificPopup({
	type: 'ajax',
	alignTop: true
});


// 04. Sliders
$(window).load(function() {

	// Featured work slider
	$('#cornwall-slider').bxSlider({
		auto: false,
		mode: 'fade',
		pager: true,
		controls: true,
		nextText: '',
		prevText: ''
	});
	
});


// 05. Fading divs - Fade a div except the one that's hovered
if($('html').hasClass('no-touch')){
	$('.fade-it, .portfolio-thumb, .image-thumb, .service-item').hover(function(){
		$(this).siblings().addClass('fade');
	}, function(){
		$(this).siblings().removeClass('fade');
	});
}


// 06. Contactform
$(function(){

	$('#contactform').submit(function(){

		var action = $(this).attr('action');

		$('#message').slideUp(300,function() {
		$('#message').hide();

 		$('#submit')
			.after('<img src="images/status.gif" class="loader">')
			.attr('disabled','disabled');

		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			phone: $('#phone').val(),
			//dob: $('#dob').val(),	
			//address: $('#address').val(),	
			course_area: $('#course_area').val(),		
			marketing: $('#marketing').is(':checked'),	
			//subject: $('#subject').val(),
			comments: $('#comments').val(),
			verify: $('#verify').val()
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown(300);
				$('#contactform img.loader').fadeOut(300,function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp(300);
			}
		);

		});

		return false;

	});

});


// 07. Menu toggle
$(function(){
    $('#toggle').click(function (e){
		e.stopPropagation();
    });
	$('html').click(function (e){
		if (!$('.toggle').is($(e.target))){
			$('#toggle').prop("checked", false);
		}
	});
});


// 08. Fixed menu - Fix the menu to the top after you scroll past it
$(window).load(function(){
	'use strict';
	$(".fixedmenu").sticky({ topSpacing: 0 });
});


/* 09. Use the .equal class on a row if you want the columns to be equal in height */
$(document).ready(function(){
	$('.equal').children('.columns').equalizeHeight();
	$(window).resize(function(){
			$('.equal').children('.columns').equalizeHeight();
	})
})