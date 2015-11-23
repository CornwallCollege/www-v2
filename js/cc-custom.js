/* SWIPER options (home page)*/

    var swiperH = new Swiper('.swiper-container-h', {
        pagination: '.swiper-pagination-h',
        paginationClickable: true,
        spaceBetween: 50,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
    var swiperV = new Swiper('.swiper-container-v', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        direction: 'vertical',
        spaceBetween: 50,
        nextButton: '.swiper-button-more',        
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


       $(document).ready(function () {
           $('#loader').fadeOut(1500);
           /*
               $(window).load(function() { // makes sure the whole site is loaded

               var hash = location.hash.replace('#', '').toLowerCase();
               if(hash.length)
               {
                   showPopup(hash);
               }
           */

           /* Shrink logo on scroll */
           window.addEventListener('scroll', function (e) {
               var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                   shrinkOn = 300,
                   logo = document.getElementById("cc-logo");
               if (distanceY > shrinkOn) {
                   classie.add(logo, "cc-logo-scroll");
               } else {
                   if (classie.has(logo, "cc-logo-scroll")) {
                       classie.remove(logo, "cc-logo-scroll");
                   }
               }
           });

       });

       /* MENU TOGGLING - 1.7 update

   */
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
           if (location.pathname === "/") {
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
            length:400                                      //Integer: For posts with text longer than this length, show an ellipsis.
        });
    });

// ADD back button navigation to home hash links

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

// Custom Google map settings