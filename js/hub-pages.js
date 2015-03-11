(function ($) {
    "use strict";
    
    $( document ).ready(function(){
      $('#loader').fadeOut(1500);   
    });
    
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
            showPopup('engineering'); //$(this).attr("data-popup");
           
        });               

        $(document).on("click",".career-help-bar > .ls-close", function (event) {
            event.preventDefault();
            $('html, body').removeClass('noscroll');
            $(this).parent().parent().parent().removeClass('cbp-spmenu-open');
            $("#close").removeClass('show-close');
        });

        $(document).on("click", ".apply-btn", function (event) {
            event.preventDefault();
            if ($(this).attr("data-career")){
                $("#interest").val($(this).attr("data-career"));
                $("#interest").hide();
            }else{
                 $("#interest").show();
            }
			$('html, body').addClass('app-form-visible');
            $('#apply').addClass('cbp-spmenu-open');
        });

        $(document).on("click", "#cancel-btn", function () {
            event.preventDefault();
            $('#apply').removeClass('cbp-spmenu-open');
			$('html, body').removeClass('app-form-visible');
            $('#apply :input').val('');
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
                            url: "include/process.php",

                            success: function () {

                                $('#success').fadeIn('slow', function () {
                                    //setTimeout("$('#success').fadeOut('slow');", 2000);
                                    $('#apply :input').val('');
                                });
                                $('#apply').removeClass('cbp-spmenu-open');
								$('html, body').removeClass('app-form-visible');
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
    
   function showPopup(area){
             $("#career-content").load('./career-pages/' + area + '.html #content', function () {
                //$("#career-content").html($(data).find("#content"));
                $('.career-popup').addClass('cbp-spmenu-open');
                $("#close").addClass('show-close');
                $('.counter').counterUp({
                    delay: 100,
                    time: 3000
                });
            });
        }
    
})(jQuery);
