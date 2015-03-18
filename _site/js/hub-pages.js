"use strict";

function incrementCount(counter) {
    var max = Number($(counter).attr("data-count-to"));
    var stepSize = Number($(counter).attr("data-count-step"));
    if (Number($(counter).html()) < max) {
        var nextNumber = Number($(counter).html()) + stepSize
        $(counter).html(nextNumber.toFixed(0));
        if (Number($(counter).html()) > max) {
            $(counter).html(max);
        }
        window.setTimeout(function () {
            incrementCount(counter)
        }, 10);
    }

}

(function ($) {


    $(document).ready(function () {
        $('#loader').fadeOut(1500);
        /*var hash = location.hash.replace('#', '').toLowerCase();
        if(hash.length)
        {
            showPopup(hash);    
        }*/

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

        // hover Focus by Jay    
        var trackScrollAndMouseDistance = function (className, func, radius, hoverAtYPercent) {
            var calcDistanceInPercentageFromMouseAndViewportCentre = function (me, el) {
                var distanceBetween = function (p1, p2) {
                    return Math.abs(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
                }
                var yp = .5;
                if (hoverAtYPercent) yp = (hoverAtYPercent / 100);
                var v = {
                    x: window.innerWidth / 2,
                    y: window.innerHeight * yp
                };
                var r = el.getBoundingClientRect();
                var e = {
                    x: r.left + ((r.right - r.left) / 2),
                    y: r.top + ((r.bottom - r.top) / 2)
                };
                var d = 0;
                if (typeof me !== 'undefined' && me != null) {
                    var m = {
                        x: me.pageX,
                        y: me.pageY
                    };
                    m.x = m.x - window.pageXOffset;
                    m.y = m.y - window.pageYOffset;
                    d = distanceBetween(m, e) / radius;
                } else {
                    d = distanceBetween(e, v) / radius;
                }
                d = 100 - d;
                var p = Math.round(d) / 100;
                return p;
            }

            var apply = function (me) {
                Array.prototype.slice.call(document.getElementsByClassName(className), 0)
                    .every(function (e) {
                        func(e, calcDistanceInPercentageFromMouseAndViewportCentre(me, e));
                        return true;
                    });
            }

            document.documentElement.addEventListener('mousemove', function (me) {
                apply(me)
            }, false);
            window.addEventListener('scroll', function () {
                apply()
            }, false);
            window.addEventListener('resize', function () {
                apply()
            }, false);
        };
        var thenDoThis1 = function (e, p) {
            e.style.opacity = Math.min(1, p * 1.5);
        };
        trackScrollAndMouseDistance("auto-hover", thenDoThis1, 3, 33);

    }


    /* CAREER PAGES */
    $(document).ready(function () {
        if (location.pathname.indexOf("career-pages")!==-1) {

            $(document).on("click", "[aria-expanded]", function (event) {
                var item = $(this).attr("aria-controls");
                if ($("#" + item).hasClass("in") === false) {
                    $("#" + item).find(".counter").each(function () {
                        var countTo = 0;
                        if ($(this).attr("data-count-to") == undefined) {
                            var max = Number($(this).html().replace(",", ""));
                            $(this).attr("data-count-to", max);
                            var stepSize = max / 2 / 100;
                            $(this).attr("data-count-step", stepSize);
                        }
                        $(this).html("0");
                        countTo = $(item).attr("data-count-to");
                        incrementCount(this);
                    });
                }
            });
        }
    });


   /* PORTFOLIO EXPANDER GRID INITIALIZER */
   if ( $( "#og-grid" ).length ) {
      Grid.init();
   }  

    /* APPLY FORM */

    $(document).ready(function () {
        if (location.pathname === "/apply/index.html" || location.pathname === "/apply/") {
            $('#loader').fadeOut(1500);
            var hash = location.hash.replace('#', '').toLowerCase();
            if (hash.length) {
                $("#interest").val(hash);
                $("#interest").hide();
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
                                required: true
                            },
                            contact: {
                                required: true
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
                            contact: {
                                required: ""
                            }
                        },

                        submitHandler: function (form) {
                            $("#submit-btn").attr('disabled', 'disabled');
                            $("#cancel-btn").attr('disabled', 'disabled');
                            $(".alert-danger").remove();
                            $('#success').hide();
                            $(form).ajaxSubmit({
                                type: "POST",
                                data: $(form).serialize(),
                                url: "/include/process.php",

                                success: function () {

                                    $('#success').fadeIn('slow', function () {
                                        //setTimeout("$('#success').fadeOut('slow');", 2000);
                                        $('#apply :input').val('');
                                    });
                                    $("#submit-btn").removeAttr('disabled');
                                    $("#cancel-btn").removeAttr('disabled');
                                },

                                error: function () {
                                    $('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Something went wrong</strong><br/> Check the data you have entered and try again.</div>').insertBefore($("#submit-btn").parent().parent());
                                    $("#submit-btn").removeAttr('disabled');
                                    $("#cancel-btn").removeAttr('disabled');
                                }
                            });
                        }
                    });
                }
            });
        }
    });
      
    
})(jQuery);