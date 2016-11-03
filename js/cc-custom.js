
jQuery(document).ready(function () {
    jQuery("#main-menu").load("/global-menu.html");
    jQuery("#footer").load("/global-footer.html");
});

jQuery(document).on("click", "#question", function (e) {
    var pageURL = jQuery(location).attr("href");
    //var formURL = 'https://network.cornwall.ac.uk/form/'
    e.preventDefault();
    //window.location.href = $(this).attr("href") + '?' + pageURL;  
    window.location.href = jQuery(this).attr("href") + 'referrer=' + pageURL;
});




$(document).ready(function () {

    if(is_IOS()){
        //background:; cover fix
        $('.jumbotron').css({ 'background-size': "initial" });
        $('.fulltime-bar').css({ 'background-size': "initial", 'background-attachment': "initial", });
    }      
    
    function is_IOS() {
      var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);  
        return isIOS;
    }  
});
    

    // resposive logo; first click open second click follow link
    $('.brand-image').click(function (e) {
        var scroll = $(window).scrollTop();
        var window = $( window ).width();
        if (scroll >= 301 || window <= 600){

            if (!$('#logo-wrap').children().hasClass('active')) {
                //$('#logo-wrap').removeClass('active');
                $('#logo-wrap').children().addClass('active');
                e.preventDefault();
            } else {
                $('#logo-wrap').children().removeClass('active');
               return true;
            }

        }
    });   


// click off and collapse
$(document).click(function (e) {
    if ($(e.target).is('.brand-image') === false) {
        $("#logo-wrap").children().removeClass("active");
    }
});

/* Shrink logo on scroll */
$(function () {
    var logoWrap = $("#logo-wrap");
    var currentBrand = $(".current-brand");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 300) {
            //if page scrolls add scroll class and remove active class
            logoWrap.removeClass("logo-wrap").addClass("logo-wrap-scroll");
            currentBrand.addClass("current-brand-scroll");
            $("#logo-wrap").children().removeClass("active");

            // Add click to expand logo cluster
            $(".brand-image").click(function () {
                logoWrap.removeClass("logo-wrap-scroll")
            });

            //add active class to white bg behind logos (slides down)
            $('#white-nav-bg').addClass('active');
        } else {
            // if its at the top of the page
            logoWrap.removeClass("logo-wrap-scroll").addClass('logo-wrap');
            //remove active class at the top of the page
            $('#white-nav-bg').removeClass('active');

        }
  
  
    });
});


/* SUPER SLIDES OPTIONS */
if ($("#slides").length) {
    $('#slides').superslides({
        animation: 'fade',
        play: 5000
    });
}

/* BACK BUTTON */
function goBack() {
    window.history.back()
}
/* BACK BUTTON ENDS*/

"use strict";

cc = {};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function incrementCount(counter) {
    var max = Number($(counter).attr("data-count-to"));
    var stepSize = Number($(counter).attr("data-count-step"));
    var numberText = $(counter).html();
    var current = Number(numberText.replace(',', '').replace('£', ''));
    var prefix = '';
    if (numberText.substring(0, 1) === '£') {
        prefix = '£';
    }
    if (current < max) {
        var nextNumber = current + stepSize
        var nextNumber = Number(nextNumber.toFixed(0));
        if (nextNumber > max) {
            nextNumber = Number(max.toFixed(0));
        }
        $(counter).html(prefix + numberWithCommas(nextNumber));
        window.setTimeout(function () {
            incrementCount(counter)
        }, 10);
    }
}

(function ($) {

    /* Set brand cookie on home */
    $(function () {


                $('.logo').removeClass('current-brand');
                $('.logo').addClass('sub-brand grow');
                $( Cookies.get('brand') ).removeClass('grow');
                $( Cookies.get('brand') ).addClass('current-brand');
                //bring the active logo to the front
                $( Cookies.get('brand') ).css("z-index", "999");

                //apply z-index to correctly stack the logos
                var offset = 1;
                $( Cookies.get('brand') ).prevAll().each(function(index){
                   $(this).css("z-index", 999 - offset);
                    offset++;
                });
                $( Cookies.get('brand') ).nextAll().each(function(index){
                   $(this).css("z-index", 999 - offset);
                    offset++;

                });


    });
    
    
    $(document).ready(function () {
        $('#loader').fadeOut(400);
        /*
            $(window).load(function() { // makes sure the whole site is loaded

            var hash = location.hash.replace('#', '').toLowerCase();
            if(hash.length)
            {
                showPopup(hash);
            }
        */
        
       /* EXPANDER GRID INITIALIZER (used in location facilities) */
       if ( $( "#og-grid" ).length ) {
          Grid.init();
       }

       /* FULL-TIME-HUB - Job Lookup */
       $(document).ready(function () {
           if (location.pathname.indexOf("career-hub") !== -1) {
               SimpleJekyllSearch.init({
                   searchInput: document.getElementById('jobs-input'),
                   resultsContainer: document.getElementById('jobs-results'),
                   dataSource: '/data/jobs.json',
                   searchResultTemplate: '<li><a href="/career-pages/{url}/index.html" title="{title}">{title}</a></li>',
                   noResultsText: '<li>None found, please choose from below</li>',
                   limit: 10,
                   fuzzy: false,
               })
           }
       });

    });


    /* MENU TOGGLING - 1.7 update*/
    if ($("#cbp-spmenu-s2").length) {
        var openRightPush = document.getElementById('openRightPush'),
            menuRight = document.getElementById('cbp-spmenu-s2'),
            body = document.body;

        openRightPush.onclick = function () {
            classie.toggle(this, 'active');
            $('.menu-icon > i').toggleClass("fa-bars");
            $('.menu-icon > i').toggleClass("fa-times");
            $('.menu-text').html($('.menu-text').html() == 'MENU' ? 'CLOSE' : 'MENU');
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

    /* end of 1.7 update */

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
            if (selector) {
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
            }
            return true;
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

        var thenDoThis1 = function (e, p) {
            if ($(window).width() <= 480) {
                e.style.opacity = Math.min(1, p);
                return;
            }
            if ($(window).width() <= 1024) {
                e.style.opacity = Math.min(1, p * 1.5);
            }
        };
        window.trackScrollAndMouseDistance("auto-hover", thenDoThis1, 6, 33);

        var thenDoThis2 = function (e, p) {
            if ($(window).width() <= 480) {
                e.style.opacity = 0.25 + Math.max(0, p);
            }
        };
        window.trackScrollAndMouseDistance("cluster-hover", thenDoThis2, 3, 50);

    }

    /* CAREER-slide - Job Lookup */
    $(document).ready(function () {
        if (location.pathname === "career-pages") {
            SimpleJekyllSearch.init({
                searchInput: document.getElementById('jobs-input'),
                resultsContainer: document.getElementById('jobs-results'),
                dataSource: '/data/jobs.json',
                searchResultTemplate: '<li><a href="/career-pages/{url}/index.html" title="{title}">{title}</a></li>',
                noResultsText: '<li>None found, please choose from below</li>',
                limit: 10,
                fuzzy: false,
            })
        }
    });


    /* CAREER PAGES */
    $(document).ready(function () {
        if (location.pathname.indexOf("career-pages") !== -1) {

            $(document).on("click", "[aria-expanded]", function (event) {
                var item = $(this).attr("aria-controls");
                if ($("#" + item).hasClass("in") === false) {
                    $("#" + item).find(".counter").each(function () {
                        var countTo = 0;
                        if ($(this).attr("data-count-to") == undefined) {
                            var max = Number($(this).html().replace(",", "").replace('£', ''));
                            $(this).attr("data-count-to", max);
                            var stepSize = max / 2 / 100;
                            $(this).attr("data-count-step", stepSize);
                        }
                        var html = $(this).html();
                        if (html.substring(0, 1) === '£') {
                            $(this).html("£0");
                        } else {
                            $(this).html("0");
                        }
                        countTo = $(item).attr("data-count-to");
                        incrementCount(this);
                    });
                }
            });



        }
    });

    $(function () {
        window.smoothScrollTo = function (id) {
            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - 50
                //scrollTop: $('#' + id).offset().top
            }, 500);
            return false;
        }
    });

    $(function () {
        window.desktopRedirectOrMobileSmoothScrollTo = function (id, url) {
            if ($(window).width() <= 480) {
                $('html, body').animate({
                    scrollTop: $('#' + id).offset().top - 50
                }, 500);
            } else {
                window.location.href = url;
            }
            return false;
        };
    });

    $(function () {
        window.restoreZoomAndScrollTo = function (id) {
            //var scale = 'scale(1)';
            //document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
            //document.body.style.msTransform =   scale;       // IE 9
            //document.body.style.transform = scale;
            $('#' + id).blur();
            window.smoothScrollTo(id);
            return false;
        };
    });

    // prevent default action on example career expand
    jQuery('.collapsed').bind('click', function (e) {
        e.preventDefault();
    });

})(jQuery);



//Campus Google Map script

$(document).ready(function () {
    //GOOGLE MAP
    if (location.pathname.indexOf("career-pages") !== -1 ||
        location.pathname.indexOf("location-hub") !== -1 ||
        location.pathname.indexOf("location-pages") !== -1) {
        function initMap() {
            var map = new google.maps.Map(document.getElementById('gmap_canvas'), {
                zoom: 9,
                center: {
                    lat: 50.304513,
                    lng: -5.000000
                },
                scrollwheel: false,
                styles: [
                    {
                        "featureType": "administrative",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "road",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "landscape",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [{ "saturation": -13 },
                            { "color": "#52b3d9" },
                            { "visibility": "on" }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [{ "color": "#ffffff" },
                            { "visibility": "on" },
                            { "weight": 5.2 }]
                    }
                ]


            });
            if (location.pathname.indexOf("location-pages") !== -1) {
                var map = new google.maps.Map(document.getElementById('gmap_canvas'), {
                    zoom: 9,
                    center: {
                        lat: 50.304513,
                        lng: -5.000000
                    },
                    scrollwheel: false,
                    styles: [

                        {
                            "featureType": "poi",
                            "stylers": [{ "visibility": "off" }]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry.fill",
                            "stylers": [{ "color": "#ffffff" },
                                { "visibility": "on" },
                                { "weight": 5.2 }]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [{ "saturation": -13 },
                                { "color": "#52b3d9" },
                                { "visibility": "on" }]
                        }
                    ]
                });
            };

            map.fitBounds(setMarkers(map));

        }

        function setMarkers(map) {
            var bounds = new google.maps.LatLngBounds();

            // Data for the markers consisting of a name, a LatLng and a zIndex for the
            // order in which these markers should display on top of each other.

            //init the info window and set the max width
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 200
            });

            //Loop through the locations
            for (var i = 0; i < campuses.length; i++) {
                var campus = campuses[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: campus[1],
                        lng: campus[2]
                    },
                    map: map,
                    //icon: image,
                    //shape: shape,
                    title: campus[0],
                    anchor: campus[4]
                    //zIndex: beach[3]
                });
                if (location.pathname.indexOf("location-hub") !== -1) {

                    // stuff just for the location hub map
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            //window.location.href = this.anchor;
                            //window.smoothScrollTo = this.anchor;
                            window.smoothScrollTo(this.anchor)
                        }
                    })(marker, i));
                
                } else if (location.pathname.indexOf("location-pages") !== -1) {

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent('<h4>' + campuses[i][0] + '</h4>');
                            infowindow.open(map, marker);
                        }
                    })(marker, i));                    
                    
                } else {

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent('<h4>' + campuses[i][0] + '</h4>' + '<a href="' + campuses[i][3] + '" class="campus-button">Visit our campus site</a>');
                            infowindow.open(map, marker);
                        }
                    })(marker, i));

                }

                bounds.extend(marker.getPosition());

            }

            // Don't zoom in too far on only one marker
            if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
                var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
                var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
                bounds.extend(extendPoint1);
                bounds.extend(extendPoint2);
            }

            return bounds;


        }

        google.maps.event.addDomListener(window, 'load', initMap);
    };



});

   /* JCAROUSEL RESPONSIVENESS */
   $(function() {
       if ( $( ".jcarousel" ).length ) {
         var jcarousel = $('.jcarousel');
       
         jcarousel
             .on('jcarousel:reload jcarousel:create', function () {
                 var width = jcarousel.innerWidth();
       
                 if (width >= 768) {
                     width = width / 4;
                 } else if (width >= 450) {
                     width = width / 2;                                     
                 } 
       
                 jcarousel.jcarousel('items').css('width', width + 'px');
             })
             .jcarousel({
                 wrap: 'circular'
             });
   
         $('.jcarousel-control-prev')
             .jcarouselControl({
                 target: '-=1'
             });
       
         $('.jcarousel-control-next')
             .jcarouselControl({
                 target: '+=1'
             });
   
         $('.jcarousel-pagination')
             .on('jcarouselpagination:active', 'a', function() {
                 $(this).addClass('active');
             })
             .on('jcarouselpagination:inactive', 'a', function() {
                 $(this).removeClass('active');
             })
             .on('click', function(e) {
                 e.preventDefault();
             })
             .jcarouselPagination({
                 perPage: 1,
                 item: function(page) {
                     return '<a href="#' + page + '">' + page + '</a>';
                 }
             });
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
			mute: false, // Mute the audio;
			// ratio: "4/3" or "16/9" to set the aspect ratio of the movie;
			// quality: "default" or "small", "medium", "large", "hd720", "hd1080", "highres";
			// containment: The CSS selector of the DOM element where you want the video background; if not specified it takes the "body"; if set to "self" the player will be instanced on that element;
			// optimizeDisplay: True will fit the video size into the window size optimizing the view;
			loop: false, // True or false loops the movie once ended.
			// vol: 1 to 100 (number) set the volume level of the video.
            addRaster: true,
			startAt: 0, // Set the seconds the video should start at.
			autoPlay:false, // True or false play the video once ready.
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

		$("#video").on("YTPFullScreenStart",function(){
            $("#video").playYTP();
            $("#wrapper_mbYTP_video").show();
		});
		// exit full screen
		$("#video").on("YTPFullScreenEnd",function(){
            $("#video").YTPStop();
            $("#wrapper_mbYTP_video").hide();

		});
	} else {
		// Fallback for mobile devices
		$("#home").removeClass(".video");
		$(".fullscreen-video, .video-controls, .play-btn-normal").hide();
	}
});

$(document).ready(function () {
   // if (location.pathname.indexOf("location-pages") !== -1) {
        //jQuery RSS parse for events on campus pages
        var campus_id = $("#event-carousel").attr("data-event-campus-id");
        var rssurl = "//network.cornwall.ac.uk/events/whats-on/feed/?post_type=tribe_events&venue=" + campus_id;
        $.get(rssurl, function (data) {
            var $XML = $(data);
            $XML.find("item").each(function () {

                var $this = $(this),
                    item = {
                        title: $this.find("title").text(),
                        link: $this.find("link").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text(),
                        author: $this.find("author").text(),
                        organizer: $this.find("organizer").text(),
                        venue: $this.find("venue").text(),
                        enddate: $this.find("enddate").text(),
                        startdate: $this.find("startdate").text(),
                        category: $this.find("category").text(),

                    };
                var event = $('<div/>').addClass("owl-item");
                var article = $('<article/>').addClass("transition text-center");
                var link = item.link;
                $(event).append((article).append($('<h3/>').text(item.title)));
                $(event).append((article).append($('<p/>').text(item.organizer).addClass("organizer")));
                $(event).append((article).append($('<p/>').text(item.venue).addClass("venue")));
                $(event).append((article).append($('<p/>').text(item.startdate).addClass("startdate ")));
                if (item.enddate) { $(event).append((article).append($('<p/>').text(item.enddate).addClass("enddate "))); }
                //$(event).append((article).append($('<p/>').text(item.category).addClass( "category " )));
                $(event).append((article).append("<a href='" + item.link + "' title='" + item.title + "' class='btn pull-right'>View event details</a>"));

                $(".owl-carousel").append(event);
                //etc...

            });

            if ($("#event-carousel").length) {
                $('#event-carousel').owlCarousel({
                    items: 1,
                    margin: 10,
                    //loop: true,
                    loop: $('#event-carousel').children().length > 1,
                    //nav: $('#event-carousel').children().length > 1,
                    animateOut: 'fadeOut',
                    autoplay: true,
                });
            }
        });
   // }
});
/*------------------- Download  filer ISOTOPE ----------------------*/
if (location.pathname.indexOf("about-pages") !== -1) {
    // init Isotope
    var $grid = $('#download-list').isotope({
      itemSelector: '.download',
      layoutMode: 'masonry'
    });

    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
}
/*------------------- learning area filer ISOTOPE ----------------------*/
if (location.pathname.indexOf("learning-area-hub") !== -1 || location.pathname.indexOf("sector-hub") !== -1) {
    $(document).ready(function () {

        //createItems();

        var $container = $('#career-content').isotope({
            itemSelector: '.area',
            //resizable: false
        });

        var $sector = $('#sector-page-content').isotope({
            itemSelector: '.area',
            //resizable: false
        });
        function rebuildLayout(id) { 
            $(id).isotope( 'layout' );     
        }        
        // read more link on Learning area page     
        $container.on('click', '.show-more', function () {
            // change size of item by toggling big class
            if($(this).parent().find(".detail").is(':visible')){
                $(this).parent().find(".detail").fadeOut(50);
            }
            else{
               $(this).parent().find(".detail").fadeIn(1500);   
            }
            
            $(this).parent().toggleClass('big');

            //hide the readmore link  
            $(this).children(".readmore").toggle();
            //re-build the layout after a delay 
            setTimeout(function(){rebuildLayout('#career-content')}, 300);
        });

        // read more link on sector page    
        $sector.on('click', '.show-more', function () {
            $(this).parent().toggleClass('big');
            $(this).children(".readmore").toggle();
            $sector.isotope('layout');
            //re-build the layout after a delay 
            setTimeout(function(){rebuildLayout('#sector-page-content')}, 300);
        });

        // filter items on button click Sector hub page
        $('.link-wrap').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');

            $sector.isotope({ filter: filterValue });
            $sector.show();
            //if 16-18 show the 'how you learn' filters 
            $sector.isotope('layout');
            $('html, body').animate({
                scrollTop: $('#sector-page-content').offset().top - 150
            }, 1000);

        });

        var $output = $('#output');

        // filter with selects and checkboxes
        var $checkboxes = $('#form-ui input');
        //declare the courseType var for use later    
        var courseType;
        var campusFilter;
        var brandFilter;

        $('#form-ui label.btn').click(function ($event) {
            // Deselect all other options
            var $clickedButton = $($event.target);

            $clickedButton.siblings('.active').click();
        });

        $checkboxes.change(function () {
            // map input values to an array   
            //var exclusives = [];
            var inclusives = [];
            //get and set course type data value
            courseType = $(this).attr("data-course-type") || courseType;
            //get and set campus data value
            campusFilter = $(this).attr("data-campus") || campusFilter;
            //get and set brand data value  
            brandFilter = $(this).attr("data-brand") || brandFilter;
            // inclusive filters from checkboxes

            $checkboxes.each(function (i, elem) {
                // if checkbox, use value if checked
                if (elem.checked) {
                    inclusives.push(elem.value);
                    $sector.show();
                    $sector.isotope('layout');
                }
            });

            // combine inclusive filters
            var filterValue = inclusives.length ? inclusives.join('') : '*';

            $output.text(filterValue);
            $container.isotope({
                filter: filterValue,
                queue: false,
                resizable: false
            })
        });

        // set the course area on click    
        $('.course-area').click(function () {
            //event.preventDefault();
            if (typeof courseType !== "undefined") {
                $(this).attr('href', function () {
                    return this.href + '/course_type/' + courseType;
                });
            }
            if (typeof campusFilter !== "undefined") {
                $(this).attr('href', function () {
                    return this.href + '/campus/' + campusFilter;
                });
            }
            if (typeof brandFilter !== "undefined") {
                $(this).attr('href', function () {
                    return this.href + '/brand/' + brandFilter;
                });
            }

        });
        $('.campus').click(function () {
            //event.preventDefault();

        });

        // Preset options 
        var brand_cookie = Cookies.get('brand');
        if (brand_cookie == '#duchy') {
            $('.area-filter > input[value=".dc"]').parent().click();
        } else if (brand_cookie == '#falmouth') {
            $('.area-filter > input[value=".fms"]').parent().click();
        } else if (brand_cookie == '#bicton') {
            $('.area-filter > input[value=".bic"]').parent().click();
        }

    });

        $(".isotope-reset").click(function(){
            $(".content ul.sort").isotope({
            filter: '*'
            });
        });
    
}
    
$(document).ready(function () {
    $( ".tile1" ).click(function() {
        $( ".content1" ).slideToggle( "slow", "swing");
        $( ".content2" ).slideUp( "slow", "swing");
        $( ".content3" ).slideUp( "slow", "swing");
        $( ".content4" ).slideUp( "slow", "swing");
    });
    
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
});
// get announcement from 
jQuery(document).ready(function () {
    // Lookup alert message and display if required
    jQuery.getJSON('https://network.cornwall.ac.uk/?action=ccg_get_announcement', function(data) {
        if(data.enabled && data.message) {
            $('#alert-container').html('<div class="announce-alert">' + data.message + '</div>');
            $('#alert-container').show();
        }
    });
});
