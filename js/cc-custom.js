   /* SUPER SLIDES OPTIONS */
   if ($("#slides").length) {
       $('#slides').superslides({
           animation: 'fade',
           play: 5000,
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

           var thenDoThis1 = function (e, p) {
               e.style.opacity = Math.min(1, p * 1.5);
           };
           window.trackScrollAndMouseDistance("auto-hover", thenDoThis1, 3, 33);

           var thenDoThis2 = function (e, p) {
               if ($(window).width() <= 480) {
                   e.style.opacity = 0.25 + Math.max(0, p);
               }
           };
           window.trackScrollAndMouseDistance("cluster-hover", thenDoThis2, 3, 50);

       }


       /* FULL-TIME-HUB - Job Lookup */
       $(document).ready(function () {
           if (location.pathname.indexOf("full-time-hub") !== -1) {
               SimpleJekyllSearch.init({
                   searchInput: document.getElementById('jobs-input'),
                   resultsContainer: document.getElementById('jobs-results'),
                   dataSource: 'http://localhost:81/data/jobs.json',
                   searchResultTemplate: '<li><a href="/career-pages/{url}" title="{title}">{title}</a></li>',
                   noResultsText: 'None found, please choose from below',
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

       /* APPLY FORM */

       $(document).ready(function () {
           if (location.pathname === "/apply/index.html" || location.pathname === "/apply/") {
               $('#loader').fadeOut(1500);
               var hash = location.hash.replace('#', '').toLowerCase();
               if (hash.length) {
                   $("#interest").val(hash);
                   $("#interest").hide();
                   $("#interest-label").val(hash);
                   $("#interest-label").hide();
               }

               $(document).on("click", "#cancel-btn", function () {
                   event.preventDefault();
                   if (hash.length) {
                       location.href = "/career-pages/" + hash + "/";
                   } else {
                       location.href = "/full-time-hub/";
                   }
               });

               /* CONTACT FORM VALIDATION SCRIPT */
               $(function () {
                   if ($("#application").length) {
                       $('#application').validate({

                           errorElement: "em",
                           rules: {
                               name: {
                                   required: true
                               },
                               email: {
                                   required: true,
                                   email: true
                               },
                               interest: {
                                   required: true,
                               },
                               phone: {
                                   required: true,
                                   phonesUK: true
                               }
                           },
                           messages: {
                               name: {
                                   required: ""
                               },
                               email: {
                                   required: ""
                               },
                               interest: {
                                   required: ""
                               },
                               phone: {
                                   required: ""
                               }
                           },

                           submitHandler: function (form) {
                               $('#apply-error').html('');
                               $("#submit-btn").prop("disabled", true);
                               $("#cancel-btn").prop("disabled", true);
                               $(".alert-danger").remove();
                               $('#success').hide();
                               $(form).ajaxSubmit({
                                   type: "POST",
                                   data: $(form).serialize(),
                                   url: "/include/process.php",

                                   success: function () {
                                       document.location = "/apply/success/";
                                   },

                                   error: function (err) {
                                       $("#submit-btn").prop("disabled", false);
                                       $("#cancel-btn").prop("disabled", false);
                                       var errors = JSON.parse(err.responseText);
                                       var items = '';
                                       $.each(errors, function (i, v) {
                                           items += '<li>' + v.message + '</li>'
                                       });
                                       $('#apply-error').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Please correct the following</strong><br/><ul>' + items + '</ul></div>');
                                       return false;
                                   }
                               });
                           }
                       });
                   }
               });
           }
       });

   })(jQuery);