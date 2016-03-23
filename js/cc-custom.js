/* SWIPER options (home page)*/
$(function(){
    if (location.pathname === "/") { 


        var swiperH = new Swiper('.swiper-container-h', {
            pagination: '.swiper-pagination-h',
            paginationClickable: true,
            spaceBetween: 0,
            hashnav: true
        });
        var swiperV = new Swiper('.swiper-container-v', {
            pagination: '.swiper-pagination-v',
            paginationClickable: true,
            direction: 'vertical',
            spaceBetween: 0,
            nextButton: '.swiper-button-more', 
            prevButton: '.swiper-button-less', 

        });

    /* Swiper brand navigation */
        changeCurrentLogo(); 

        swiperH.on('slideChangeStart', function(){
          changeCurrentLogo(); 
        });               

        function loadVideo(slide) {
            var video_options = [
                {
                    brand: 'cornwall',
                    videos: ['clouds','steps', 'steps']
                },
                {
                    brand: 'duchy',
                    videos: ['cow','cows']
                },
                {
                    brand: 'falmouth',
                    videos:  ['ocean','pier','port','seagull']
                },
                {
                    brand: 'bicton',
                    videos:  ['grass','tree']
                },          
            ]

            if(!$(slide).hasClass('video-in')) {
                 var brand = $(slide).attr('data-hash');
                 var brand_info = $.grep(video_options, function (e){return e.brand===brand;});
                 var videos = brand_info[0].videos;
                 var index = Math.floor(Math.random() * videos.length);
                 $(slide).find('.brand-video').html('<video autoplay  poster="" id="bgvid" loop><source src="videos/'+brand +'/' + videos[index] + '.mp4" type="video/webm"><source src="/videos/'+brand +'/' + videos[index] + '.webm" frameborder="0" allowfullscreen></video>');
                $(slide).addClass('video-in');
            }    
        }

        function changeCurrentLogo() {




            var slide = swiperH.slides[swiperH.activeIndex];
            var logo = $(slide).attr('data-logo');
            $('.logo').removeClass('current-brand');
            $('.logo').addClass('sub-brand grow');

            loadVideo(slide);
            if(swiperH.slides.length > swiperH.activeIndex+1) {
                 loadVideo(swiperH.slides[swiperH.activeIndex+1]);
            }

            if (swiperH.activeIndex>0) {
                loadVideo(swiperH.slides[swiperH.activeIndex-1]);
            }

            $('#'+logo+'-logo').parent().parent().parent().removeClass('sub-brand grow');
            $('#'+logo+'-logo').parent().parent().parent().addClass('current-brand');

        }

        $('#cc-logo').click(function(e){
            e.preventDefault();
            swiperH.slideTo(0, 1000, false);
            changeCurrentLogo();
        })
        $('#dc-logo').click(function(e){
            e.preventDefault();
            swiperH.slideTo(1, 1000, false);
            changeCurrentLogo();
        })
        $('#fms-logo').click(function(e){
            e.preventDefault();
            swiperH.slideTo(2, 1000, false);
            changeCurrentLogo();
        })
        $('#bic-logo').click(function(e){
            e.preventDefault();
            swiperH.slideTo(3, 1000, false);
            changeCurrentLogo();
        })    
    }
});

/* swiper ends */
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


       $(document).ready(function () {
           $('#loader').fadeOut(800);
           /*
               $(window).load(function() { // makes sure the whole site is loaded

               var hash = location.hash.replace('#', '').toLowerCase();
               if(hash.length)
               {
                   showPopup(hash);
               }
           */

  


       });

       
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
           window.restoreZoomAndScrollTo = function(id) {
                //var scale = 'scale(1)';
                //document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
                //document.body.style.msTransform =   scale;       // IE 9
                //document.body.style.transform = scale;
                $('#'+id).blur();
                window.smoothScrollTo(id);
                return false;
           };
       });

       // prevent default action on example career expand
        jQuery('.collapsed').bind('click',function(e){
              e.preventDefault();
        });

   })(jQuery);

// SOCIALFEED init
    $(document).ready(function(){
        $('.social-feed-container').socialfeed({

        // FACEBOOK
        facebook:{
            accounts: ['@369758859743435'],  //Array: Specify a list of accounts from which to pull wall posts
            limit: 10,                                   //Integer: max number of posts to load
            access_token: '351984661624125|235f03a6c7cab889853ae7d8d74fd01c'         //String: "APP_ID|APP_SECRET"
        },


            // GENERAL SETTINGS
            show_media: true,
            length:280                                      //Integer: For posts with text longer than this length, show an ellipsis.
        });
    });

//Campus Google Map script

       $(document).ready(function () {
            //GOOGLE MAP
           if (location.pathname.indexOf("career-pages") !== -1 || location.pathname.indexOf("location-hub") !== -1) {           
            function initMap() {
                var map = new google.maps.Map(document.getElementById('gmap_canvas'), {
                    zoom: 9,
                    center: {
                        lat: 50.304513,
                        lng: -5.000000
                    },
                    scrollwheel: false,
                    styles: [{
                                "featureType": "administrative",
                                "stylers": [
                                    { "visibility": "off" }
                                ]
                                }, {
                                "featureType": "poi",
                                "stylers": [
                                    { "visibility": "off" }
                                ]
                                }, {
                                "featureType": "road",
                                "stylers": [
                                    { "visibility": "off" }
                                ]
                                }, {
                                "featureType": "landscape",
                                "stylers": [
                                    { "visibility": "off" }
                                ]
                                }, {
                                "featureType": "water",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    { "saturation": -13 },
                                    { "color": "#52b3d9" },
                                    { "visibility": "on" }
                                ]
                                }, {
                                "featureType": "transit",
                                "stylers": [
                                    { "visibility": "off" }
                                ]
                                }, {
                                "featureType": "landscape",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    { "color": "#ffffff" },
                                    { "visibility": "on" },
                                    { "weight": 5.2 }
                                ]
                                }]                    
                            });

                
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
               if(location.pathname.indexOf("location-hub") !== -1){
                   
                    // stuff just for the location hub map
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
//                            //window.location.href = this.anchor;
                               //window.smoothScrollTo = this.anchor;
                                window.smoothScrollTo(this.anchor)
                            }    
                        })(marker, i));      
                    
                } else {
                    
                       google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                          infowindow.setContent('<h4>'+campuses[i][0]+'</h4>'+'<a href="'+campuses[i][3]+'" class="campus-button">Visit our campus site</a>');
                          infowindow.open(map, marker);
                        }
                      })(marker, i));                     
                    
                }
                    
                     bounds.extend(marker.getPosition());

                }
                return bounds;
            }

                        google.maps.event.addDomListener(window, 'load', initMap);
                       };
            });

// ADD back button navigation to home hash links
/*
$(function(){
    if (location.pathname === "/") {  
      // Bind an event to window.onhashchange that, when the hash changes, gets the
      // hash and adds the class "selected" to any matching nav link.
      $(window).hashchange( function(){
        var hash = location.hash;

        // Set the page title based on the hash.
        document.title = 'The hash is ' + ( hash.replace( /^#/, '' ) || 'blank' ) + '.';

        // Iterate over all nav links, setting the "selected" class as-appropriate.
        $('#nav a').each(function(){
          var that = $(this);
          that[ that.attr( 'href' ) === hash ? 'addClass' : 'removeClass' ]( 'selected' );
        });
      })

      // Since the event is only triggered when the hash changes, we need to trigger
      // the event now, to handle the hash the page may have loaded with.
      $(window).hashchange();
    }
});
*/
// Custom Google map settings

// Select or die dropdown 
$("select").selectOrDie({
    links: true,
    // Option below is not needed
    placeholderOption: true
});

// resposive logo; first click open second click follow link
    $('#logo-wrap .current-brand').click(function(e){
        if(!$('#logo-wrap').children().hasClass('active')) {
                $('#logo-wrap').removeClass('active');
                $('#logo-wrap').children().addClass('active');   
                e.preventDefault();
        } else {
            return true;
        }    
    });  
        $(document).click(function(e){
            if ($(e.target).is('.brand-image') === false) {
              $("#logo-wrap").children().removeClass("active");
            }
    });
    
        /* Shrink logo on scroll */
       $(function() {
            var logoWrap = $("#logo-wrap");
            var currentBrand = $(".current-brand");
            $(window).scroll(function() {    
                var scroll = $(window).scrollTop();

                if (scroll >= 300) {
                    //if page scrolls add scroll class and remove active class
                    logoWrap.removeClass("logo-wrap").addClass("logo-wrap-scroll");
                    currentBrand.addClass("current-brand-scroll");
                    $("#logo-wrap").children().removeClass("active");
                    
                    // Add click to expand logo cluster
                    $( ".brand-image" ).click(function() {
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

    /* Set brand cookie on home */
    $(function(){
        if (location.pathname === "/") { 
            //get the hash from the URL
            var hash = document.URL.substr(document.URL.indexOf('#')+1);
            
            // set up the brand based on hash
            var brand = $.cookie('brand', hash, { expires: 1, path: '/' });

            if (brand == null) {
                $('.newsletter_layer').show();
                $.cookie('brand', 'yes'); 
                alert($.cookie("brand"));         
            } else {alert($.cookie("brand"));}
        }
    });


//isotope for social feed section of the home page
$(window).load(function() {

    // cache container
    var $container = $('.grid');
    // initialize isotope
    $container.isotope({
        // options...
        animationEngine: 'best-available',
        itemSelector: '.isotope_selector'
    });

    // filter items when filter link is clicked
    $('#isotope_filters li a').on('click', function() {
        var selector = $(this).data('filter');
        $container.isotope({
        filter: selector
        });

    });
});

// file ends