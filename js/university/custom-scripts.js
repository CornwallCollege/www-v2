$(document).ready(function(){ 
        $("#main-menu").load("/global-menu.html");
        $("#footer").load("/global-footer.html");
    
    /* MENU TOGGLING - 1.7 update*/
    if ($("#cbp-spmenu-s2").length) {
        var openRightPush = document.getElementById('openRightPush'),
            menuRight = document.getElementById('cbp-spmenu-s2'),
            body = document.body;

        openRightPush.onclick = function () {
            classie.toggle(this, 'active');
            classie.toggle(menuRight, 'cbp-spmenu-open');
        };

    }

    /* the id="menu-container" has to be added to the one-page template,
       to the <div class="container"> of the <nav id="cbp-spmenu-s2">

    */

    if ($("#menu-container").length) {
        var menuContainer = document.getElementById('menu-container'),
            menuRight = document.getElementById('cbp-spmenu-s2'),
            body = document.body;

        menuContainer.onclick = function () {
            classie.toggle(this, 'active');
            classie.toggle(menuRight, 'cbp-spmenu-open');
        };

    }    
    
});

$(document).ready(function(){
	var onMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { onMobile = true; }
	if( ( onMobile === false ) ) {
		// The videoplayer - controlled background video
		$(".fullscreen-video").mb_YTPlayer({
			containment: "body",
			opacity: 1, // Set the opacity of the player;
			mute: true, // Mute the audio;
			// ratio: "4/3" or "16/9" to set the aspect ratio of the movie;
			// quality: "default" or "small", "medium", "large", "hd720", "hd1080", "highres";
			// containment: The CSS selector of the DOM element where you want the video background; if not specified it takes the "body"; if set to "self" the player will be instanced on that element;
			// optimizeDisplay: True will fit the video size into the window size optimizing the view;
			loop: false, // True or false loops the movie once ended.
			// vol: 1 to 100 (number) set the volume level of the video.
            addRaster: true,
			startAt: 0, // Set the seconds the video should start at.
			autoPlay: true, // True or false play the video once ready.
			showYTLogo: false, // Show or hide the YT logo and the link to the original video URL.
			showControls: false // Show or hide the controls bar at the bottom of the page.
		});

		// First we're going to hide these elements
		$(".video-controls").hide();

		// Start the movie
		$("#video").on("YTPStart",function(){
			$(".video-controls").show().css({opacity: 0, visibility: "visible"}).animate({opacity: 1},300);
			//$(".fullscreen-img, .home-content").css({opacity: 1, visibility: "hidden"}).animate({opacity: 0},300);
		});
        //Hide the UI 
        $( ".play-btn-normal" ).click(function() {
            $(".fullscreen-img, .home-content").css({opacity: 1, visibility: "hidden"}).animate({opacity: 0},300);
            $(".raster").css({opacity: 1, visibility: "hidden"}).animate({opacity: 0},300);               
		});
		// Pause the movie
		$("#video").on("YTPPause",function(){
			$(".fullscreen-img, .home-content").css({opacity: 0, visibility: "visible"}).animate({opacity: 1},300);
			$(".video-controls").css({opacity: 1, visibility: "hidden"}).animate({opacity: 0},300);
		});

		// After the movie
		$("#video").on("YTPEnd",function(){
			$(".video-controls").hide();
			$(".fullscreen-img, .home-content").css({opacity: 0, visibility: "visible"}).animate({opacity: 1},300);
		});
	} else {
		// Fallback for mobile devices
		$("#home").removeClass(".video");
		$(".fullscreen-video, .video-controls, .play-btn-normal").hide();
	}

    
    $( ".tile1" ).click(function() {
        $( ".content1" ).slideToggle( "slow", "swing");
        $( ".content2" ).slideUp( "slow", "swing");
        $( ".content3" ).slideUp( "slow", "swing");
        $( ".content4" ).slideUp( "slow", "swing");
    
    $( ".tile2" ).click(function() {
        $( ".content2" ).slideToggle( "slow", "swing");
        $( ".content1" ).slideUp( "slow", "swing");
        $( ".content3" ).slideUp( "slow", "swing");
        $( ".content4" ).slideUp( "slow", "swing");
    });
    
    $( ".tile3" ).click(function() {
        $( ".content3" ).slideToggle( "slow", "swing");
        $( ".content1" ).slideUp( "slow", "swing");
        $( ".content2" ).slideUp( "slow", "swing");
        $( ".content4" ).slideUp( "slow", "swing");
    });
    
    $( ".tile4" ).click(function() {
        $( ".content4" ).slideToggle( "slow", "swing");
        $( ".content1" ).slideUp( "slow", "swing");
        $( ".content2" ).slideUp( "slow", "swing");
        $( ".content3" ).slideUp( "slow", "swing");
    });
    


    /* end of 1.7 update */
   })
})
