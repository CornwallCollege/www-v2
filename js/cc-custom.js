
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

/* SWIPER options (home page)*/
$(function () {
    if (location.pathname === "/") {


        var swiperH = new Swiper('.swiper-container-h', {
            pagination: '.swiper-pagination-h',
            paginationClickable: true,
            spaceBetween: 0,
            hashnav: true,
            threshold: 75,
        });
        var swiperV = new Swiper('.swiper-container-v', {
            pagination: '.swiper-pagination-v',
            paginationClickable: true,
            direction: 'vertical',
            spaceBetween: 0,
            nextButton: '.swiper-button-more',
            prevButton: '.swiper-button-less',
            threshold: 50

        });

        /* Swiper brand navigation */
        //changeCurrentLogo();

        swiperH.on('slideChangeStart', function () {
            changeCurrentLogo();
        });

        function loadVideo(slide) {
            var video_options = [
                {
                    brand: 'cornwall',
                    videos: ['engineering', 'steps', 'door', 'landscape', 'landscape-2', 'landscape-4', 'landscape-6', 'mines', 'stac']
                },
                {
                    brand: 'duchy',
                    videos: ['cow', 'cows', 'tree', 'equine', 'lamb', 'stoke', 'stoke-campus']
                },
                {
                    brand: 'falmouth',
                    videos: ['boats', 'pier', 'port', 'water', 'pontoon', 'fms-flag', 'ocean']
                },
                {
                    brand: 'bicton',
                    videos: ['grass', 'tree', 'dafs', 'equine', 'landscape', 'tractor']
                },
            ]

            if (!$(slide).hasClass('video-in')) {
                var brand = $(slide).attr('data-hash');
                var brand_info = $.grep(video_options, function (e) {
                    return e.brand === brand;
                });
                var videos = brand_info[0].videos;
                var index = Math.floor(Math.random() * videos.length);
                $(slide).find('.brand-video').html('<video autoplay  poster="" id="bgvid" loop><source src="videos/' + brand + '/' + videos[index] + '.mp4" type="video/mp4"></video>');
                $(slide).addClass('video-in');
            }
        }

        function changeCurrentLogo() {

            var slide = swiperH.slides[swiperH.activeIndex];
            var logo = $(slide).attr('data-logo');
            $('.logo').removeClass('current-brand');
            $('.logo').addClass('sub-brand grow');

            loadVideo(slide);
            if (swiperH.slides.length > swiperH.activeIndex + 1) {
                loadVideo(swiperH.slides[swiperH.activeIndex + 1]);
            }

            if (swiperH.activeIndex > 0) {
                loadVideo(swiperH.slides[swiperH.activeIndex - 1]);
            }

            $('#' + logo + '-logo').parent().parent().parent().removeClass('sub-brand grow');
            $('#' + logo + '-logo').parent().parent().parent().addClass('current-brand');

        }

        $('#cc-logo').click(function (e) {
            e.preventDefault();
            swiperH.slideTo(0, 1000, false);
            changeCurrentLogo();
        })
        $('#dc-logo').click(function (e) {
            e.preventDefault();
            swiperH.slideTo(1, 1000, false);
            changeCurrentLogo();
        })
        $('#fms-logo').click(function (e) {
            e.preventDefault();
            swiperH.slideTo(2, 1000, false);
            changeCurrentLogo();
        })
        $('#bic-logo').click(function (e) {
            e.preventDefault();
            swiperH.slideTo(3, 1000, false);
            changeCurrentLogo();
        })
    }

    // Ajax menu into #main-menu
    $(document).ready(function () {
        $("#main-menu").load("/global-menu.html");
        $("#footer").load("/global-footer.html");
    });
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

    /* OPEN TO THE PUBLIC - ISOTOPE FOR PORTFOLIO ITEMS */
    /* if ($("#public-grid").length) {
        var $container = $('#public-grid').imagesLoaded(function () {
            var isotope = function () {
                $container.isotope({
                    resizable: false,
                    itemSelector: '.entry'
                });
            };
            isotope();
        });

        $('div.public-filter ul a').click(function () {
            var selector = $(this).attr('data-filter');
            if (selector) {
                $('html, body').animate({
                    scrollTop: $('#public-grid-anchor').offset().top
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

        var $optionSets = $('div.public-filter ul'),
            $optionLinks = $optionSets.find('a');
        $optionLinks.click(function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents('div.public-filter ul');
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

    } */


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

// SOCIALFEED init
$(document).ready(function () {
    $("#whats-on-group").click(function () {
        $('.social-feed-ccg-group').socialfeed({

            // FACEBOOK
            facebook: {
                accounts: ['@369758859743435'], //Array: Specify a list of accounts from which to pull wall posts
                limit: 5, //Integer: max number of posts to load
                access_token: '351984661624125|235f03a6c7cab889853ae7d8d74fd01c' //String: "APP_ID|APP_SECRET"
            },

            // TWITTER
            twitter: {
                accounts: ['@CornwallCollege'],                      //Array: Specify a list of accounts from which to pull tweets
                limit: 5,                                   //Integer: max number of tweets to load
                consumer_key: 'oAGN8K7HC0yzTdFFnT1Na1hID',          //String: consumer key. make sure to have your app read-only
                consumer_secret: 'T7jxqpvN2U9Hf4LZPzbpxg6pfpdK7fKQ4JPKSrLUG4WXkj9WSb',//String: consumer secret key. make sure to have your app read-only
            },
            //RSS FEED
            rss: {
                urls: ['//network.cornwall.ac.uk/news/feed/?post_type=article&newsBrand=cornwall-college', 'https://www.cornwall.ac.uk/cc-news.rss'], //Array: Specifiy a list of rss feed from which to pull posts
                limit: 2
            },

            // GENERAL SETTINGS
            show_media: true,
            length: 280 //Integer: For posts with text longer than this length, show an ellipsis.
        });
    });

    $("#whats-on-duchy").click(function () {
        $('.social-feed-duchy').socialfeed({

            // FACEBOOK
            facebook: {
                accounts: ['@319289784804400'], //Array: Specify a list of accounts from which to pull wall posts
                limit: 5, //Integer: max number of posts to load
                access_token: '351984661624125|235f03a6c7cab889853ae7d8d74fd01c' //String: "APP_ID|APP_SECRET"
            },

            // TWITTER
            twitter: {
                accounts: ['@DuchyCollege'],                      //Array: Specify a list of accounts from which to pull tweets
                limit: 5,                                   //Integer: max number of tweets to load
                consumer_key: 'oAGN8K7HC0yzTdFFnT1Na1hID',          //String: consumer key. make sure to have your app read-only
                consumer_secret: 'T7jxqpvN2U9Hf4LZPzbpxg6pfpdK7fKQ4JPKSrLUG4WXkj9WSb',//String: consumer secret key. make sure to have your app read-only
            },

            //RSS FEED
            rss: {
                urls: ['//network.cornwall.ac.uk/news/feed/?post_type=article&newsBrand=duchy-college'], //Array: Specifiy a list of rss feed from which to pull posts
                limit: 2
            },

            // GENERAL SETTINGS
            show_media: true,
            length: 280 //Integer: For posts with text longer than this length, show an ellipsis.
        });
    });
    $("#whats-on-falmouth").click(function () {
        $('.social-feed-falmouth').socialfeed({

            // FACEBOOK
            facebook: {
                accounts: ['@130954653707151'], //Array: Specify a list of accounts from which to pull wall posts
                limit: 5, //Integer: max number of posts to load
                access_token: '351984661624125|235f03a6c7cab889853ae7d8d74fd01c' //String: "APP_ID|APP_SECRET"
            },

            // TWITTER
            twitter: {
                accounts: ['@marineschool'],                      //Array: Specify a list of accounts from which to pull tweets
                limit: 5,                                   //Integer: max number of tweets to load
                consumer_key: 'oAGN8K7HC0yzTdFFnT1Na1hID',          //String: consumer key. make sure to have your app read-only
                consumer_secret: 'T7jxqpvN2U9Hf4LZPzbpxg6pfpdK7fKQ4JPKSrLUG4WXkj9WSb',//String: consumer secret key. make sure to have your app read-only
            },

            //RSS FEED
            rss: {
                urls: ['//network.cornwall.ac.uk/news/feed/?post_type=article&newsBrand=falmouth-marine-school'], //Array: Specifiy a list of rss feed from which to pull posts
                limit: 2
            },

            // GENERAL SETTINGS
            show_media: true,
            length: 280 //Integer: For posts with text longer than this length, show an ellipsis.
        });
    });
    $("#whats-on-bicton").click(function () {
        $('.social-feed-bicton').socialfeed({

            // FACEBOOK
            facebook: {
                accounts: ['@196919697022651'], //Array: Specify a list of accounts from which to pull wall posts
                limit: 5, //Integer: max number of posts to load
                access_token: '351984661624125|235f03a6c7cab889853ae7d8d74fd01c' //String: "APP_ID|APP_SECRET"
            },

            // TWITTER
            twitter: {
                accounts: ['@bictoncollege'],                      //Array: Specify a list of accounts from which to pull tweets
                limit: 5,                                   //Integer: max number of tweets to load
                consumer_key: 'oAGN8K7HC0yzTdFFnT1Na1hID',          //String: consumer key. make sure to have your app read-only
                consumer_secret: 'T7jxqpvN2U9Hf4LZPzbpxg6pfpdK7fKQ4JPKSrLUG4WXkj9WSb',//String: consumer secret key. make sure to have your app read-only
            },

            //RSS FEED
            rss: {
                urls: ['//network.cornwall.ac.uk/news/feed/?post_type=article&newsBrand=bicton-college'], //Array: Specifiy a list of rss feed from which to pull posts
                limit: 2
            },

            // GENERAL SETTINGS
            show_media: true,
            length: 280 //Integer: For posts with text longer than this length, show an ellipsis.
        });
    });

});

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
                            //                            //window.location.href = this.anchor;
                            //window.smoothScrollTo = this.anchor;
                            window.smoothScrollTo(this.anchor)
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
    // Option below is not needed
    placeholderOption: true,
    onChange: function () {
        if ($(this).val() === 'course-search') {
            $('.' + $(this).val()).hide();
            $('.' + $(this).val()).fadeIn("slow");

        } else {
            window.location.href = $(this).val();
        }
    }
});

// resposive logo; first click open second click follow link
$('#logo-wrap .current-brand').click(function (e) {
    if (!$('#logo-wrap').children().hasClass('active')) {
        $('#logo-wrap').removeClass('active');
        $('#logo-wrap').children().addClass('active');
        e.preventDefault();
    } else {
        return true;
    }
});
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

/* Set brand cookie on home */
$(function () {

    var hash = location.hash;
    var brand_cookie = Cookies.get('brand');


    //set brand on home page visit
    if (location.pathname === "/") {
        //get the hash from the URL

        if (hash == '') {
            var brand_cookie = Cookies.set('brand', '#cornwall');
            var course_brand_cookie = Cookies.set('course-brand', '#cornwall', {
                domain: '.cornwall.ac.uk'
            });

        } else {
            var brand_cookie = Cookies.set('brand', hash);
            var course_brand_cookie = Cookies.set('course-brand', hash, {
                domain: '.cornwall.ac.uk'
            });
            Cookies.get('brand');
        }
    }
    //set brand on logo click
    $(".brand-image").click(function () {
        var brand_cookie = Cookies.set('brand', hash);
        var course_brand_cookie = Cookies.set('course-brand', hash, {
            domain: '.cornwall.ac.uk'
        });

    });
    //
    $(function () {

        $('.logo').removeClass('current-brand');
        $('.logo').addClass('sub-brand grow');
        $(Cookies.get('brand')).removeClass('grow');
        $(Cookies.get('brand')).addClass('current-brand');
        //bring the active logo to the front
        $(Cookies.get('brand')).css("z-index", "999");

        //apply z-index to correctly stack the logos
        var offset = 1;
        $(Cookies.get('brand')).prevAll().each(function (index) {
            $(this).css("z-index", 999 - offset);
            offset++;
        });
        $(Cookies.get('brand')).nextAll().each(function (index) {
            $(this).css("z-index", 999 - offset);
            offset++;

        });


    });

});




$(document).ready(function () {
    if (location.pathname.indexOf("location-pages") !== -1) {
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
    }
});

/*------------------- learning area filer ISOTOPE ----------------------*/

$(document).ready(function () {

    //createItems();

    var $container = $('#career-content').isotope({
        itemSelector: '.area',
        //resizable: false
    });

    //   var $container = $('#download-content').isotope({
    //     itemSelector: '.download',
    //     //resizable: false
    //   });

    var $sector = $('#sector-page-content').isotope({
        itemSelector: '.area',
        //resizable: false
    });
    // read more link on Learning area page     
    $container.on('click', '.show-more', function () {
        // change size of item by toggling big class
        $(this).parent().toggleClass('big');
        //hide the readmore link  
        $(this).children(".readmore").toggle();
        //re-build the layout  
        $container.isotope('layout');
    });
    // read more link on sector page    
    $sector.on('click', '.show-more', function () {
        $(this).parent().toggleClass('big');
        $(this).children(".readmore").toggle();
        $sector.isotope('layout');
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

    /*
        $container.delegate( '.show-more', 'click', function(){
            //$(this).toggleClass('large');
            $container.isotope('layout');
        });
    
    */
});
