
jQuery(document).ready(function () {
    jQuery("#main-menu").load("/global-menu.html");
    jQuery("#footer").load("/global-footer.html");
});


$(document).ready(function () {
    
 $('#loader').fadeOut(400);

    /* Set brand cookie on home */
$(function () {

    var hash = location.hash;
    var brand_cookie = Cookies.get('brand');

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
    
    
/* SWIPER options (home page)*/
    if (location.pathname === "/") {
        var swiperH = new Swiper('.swiper-container-h', {
            pagination: '.swiper-pagination-h',
            paginationClickable: true,
            spaceBetween: 0,
            hashnav: true,
            threshold: 75,
        });

        function initSwiper() {    
            var swiperV = new Swiper('.swiper-container-v', {
                pagination: '.swiper-pagination-v',
                paginationClickable: true,
                direction: 'vertical',
                spaceBetween: 0,
                nextButton: '.swiper-button-more',
                prevButton: '.swiper-button-less',
                threshold: 50,
                mousewheelControl: true,
                scrollbarDraggable: true,
                slidesPerView: 'auto',
                freeMode: true,

            });     
        }

    // SOCIALFEED init
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
            limit: 3
        },

        // GENERAL SETTINGS
        show_media: true,
        length: 280, //Integer: For posts with text longer than this length, show an ellipsis.
        callback: function() { 
            console.log("All posts collected!");
            initSwiper();
        }
    });


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

    //check is it is an IOS device
    function is_IOS() {
      var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);  
        return isIOS;
    }    
    

    //set the brand hash    
    var hash = location.hash;
    var brand_cookie = Cookies.get('brand');


        //set brand on home page visit
        if (location.pathname === "/") {
            //get the hash from the URL

            if (hash == '') {        
                var brand_cookie = Cookies.set('brand', '#cornwall' );             
                var course_brand_cookie = Cookies.set('course-brand', '#cornwall', {
                    domain: '.cornwall.ac.uk'
                });

            } else {
                var brand_cookie = Cookies.set('brand', hash );             
                var course_brand_cookie = Cookies.set('course-brand', hash, {
                domain: '.cornwall.ac.uk'
            });
                Cookies.get('brand');
            }
        }        
        

        /* Swiper brand navigation */
        $( document ).ready(function() {
            
            
            
            var fade_in_videos = document.querySelectorAll('.fade-in-video');
            for( i=0; i<fade_in_videos.length; i++ ) {
                fade_in_videos[i].addEventListener("playing", function(){
                    
                    if(!$(this).hasClass('is-playing') ){
                       this.className += ' is-playing';
                    } 
                     
                });
            }     
            
            
            
            
        });
        
        function loadVideo(slide) {
            
            /*get the current month 0 indxed
            var iOS = /iPhone|iPod|Android|BlackBerry|iPhone Simulator/.test(navigator.platform);*/
            //get season from current month
            var season = '';
                switch (new Date().getMonth())
                {
                   case 2:
                   case 3:
                   case 4: 
                       season = 'spring';
                       break;                          
                   case 5:
                   case 6:
                   case 7: 
                       season = 'summer';
                       break;                          
                   case 8:
                   case 9:
                   case 10: 
                       season = 'autumn';
                       break;                          
                   case 11:
                   case 0:
                   case 1: 
                       season = 'winter';
                       break;
                      
                   default: 
                       alert('no-season');
                }
 
                if(season == 'autumn'){
                    //do somthing seasonal!
                }
                var isMobile = /android|iPad|iPhone|iPod/.test(navigator.platform);
                var video_options = [
                    {
                        brand: 'cornwall',
                        videos: ['door-crop', 'walking-by', 'wall-sketching',  'landscape', 'landscape-2', 'landscape-4', 'landscape-6', 'mines', 'stac'], 
                        mobile_videos: ['mobile/landscape', 'mobile/landscape-2', 'mobile/landscape-4', 'mobile/landscape-6', 'mobile/mines', 'mobile/stac'], 
                    },
                    {
                        brand: 'duchy',
                        videos: ['cow', 'cows', 'tree', 'equine', 'lamb', 'stoke', 'stoke-campus'],
                        mobile_videos: ['mobile/cow', 'mobile/cows', 'mobile/tree', 'mobile/equine', 'mobile/lamb', 'mobile/stoke', 'mobile/stoke-campus'],
                    },
                    {
                        brand: 'falmouth',
                        videos: ['boats', 'pier', 'port', 'water', 'pontoon', 'fms-flag', 'ocean'],
                        mobile_videos: ['mobile/boats', 'mobile/pier', 'mobile/port', 'mobile/water', 'mobile/pontoon', 'mobile/fms-flag', 'mobile/ocean'],
                    },
                    {
                        brand: 'bicton',
                        videos: ['grass', 'tree', 'dafs', 'equine', 'landscape', 'tractor'],
                        mobile_videos: ['mobile/grass', 'mobile/tree', 'mobile/dafs', 'mobile/equine', 'mobile/landscape', 'mobile/tractor'],
                    },
                ]
            
           /* }*/

            if (!$(slide).hasClass('video-in')) {
                var brand = $(slide).attr('data-hash');
                var brand_info = $.grep(video_options, function (e) {
                    return e.brand === brand;
                });
                //if mobile choose from the mobile array of videos
                if(isMobile){
                    var videos = brand_info[0].mobile_videos;  
                } else {
                    var videos = brand_info[0].videos;  
                }

                var index = Math.floor(Math.random() * videos.length);
                $(slide).find('.brand-video').html('<video autoplay muted loop id="'+brand+'-video" class="video fade-in-video"><source src="videos/' + brand + '/' + videos[index] + '.mp4" type="video/mp4"></video><canvas id="'+brand+'-canvas" class="video-canvas"></canvas>');
                $(slide).addClass('video-in');
                
                var fade_in_videos = document.querySelectorAll('.fade-in-video');
                for( i=0; i<fade_in_videos.length; i++ ) {
                    fade_in_videos[i].addEventListener("playing", function(){
                        if(!$(this).hasClass('is-playing') ){
                            this.className += ' is-playing';
                        }
                    });
                }  
                
                 auto_play_on_ios(brand); 
            }
    
        }

     
        
        //if ios device work around 
        function auto_play_on_ios(brand) {
           
            if (is_IOS()) {
                    var canvasVideo = new CanvasVideoPlayer({
                        videoSelector: "#"+brand+"-video",
                        canvasSelector: "#"+brand+"-canvas",
                        timelineSelector: false,
                        autoplay: true,
                        makeLoop: true,
                        pauseOnClick: false,
                        audio: false
                    });
                
                
            }else {

                // Use HTML5 video
                document.querySelectorAll('.video-canvas')[0].style.display = 'none';

            }   
        }
        

        function changeCurrentLogo() {

            var slide = swiperH.slides[swiperH.activeIndex];
            var logo = $(slide).attr('data-logo');
            $('.logo').removeClass('current-brand');
            $('.logo').addClass('sub-brand grow');
            //$('.logo').children().children().children().attr('src', '/images/dc-brand-logo.png');
            
            if (is_IOS()==false) {
            loadVideo(slide);

                if (swiperH.slides.length > swiperH.activeIndex + 1) {
                    loadVideo(swiperH.slides[swiperH.activeIndex + 1]);
                }

                if (swiperH.activeIndex > 0) {
                    loadVideo(swiperH.slides[swiperH.activeIndex - 1]);
                }
            }


            $('#' + logo + '-logo').parent().parent().parent().removeClass('sub-brand grow');
            $('#' + logo + '-logo').parent().parent().parent().addClass('current-brand');

        }

        // onSwipe stack logos function
        function stackLogosSwipe() {    
            //get hash from url
            var swipeBrand = window.location.hash
            //set cookie based on hash 
            var brand_cookie = Cookies.set('brand', swipeBrand );
            //set cross domain cookie
            var course_brand_cookie = Cookies.set('course-brand', swipeBrand, { domain: '.cornwall.ac.uk' });
        
            //apply z-index to correctly stack the logos
        $( Cookies.get('brand') ).css("z-index", "999");
            var offset = 1;
            $( Cookies.get('brand') ).prevAll().each(function(index){
               $(this).css("z-index", 999 - offset);
                offset++;
            });
            $( Cookies.get('brand') ).nextAll().each(function(index){
               $(this).css("z-index", 999 - offset);
                offset++;
         
            });  
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
        //set brand on logo click
        $(".brand-image").click(function () {
                var clickBrand = $(this).parent().parent().prop("hash");
                var brand_cookie = Cookies.set('brand', clickBrand );        
                var course_brand_cookie = Cookies.set('course-brand', clickBrand, { domain: '.cornwall.ac.uk' });

                //apply z-index to correctly stack the logos
            $( Cookies.get('brand') ).css("z-index", "999");
                var offset = 1;
                $( Cookies.get('brand') ).prevAll().each(function(index){
                   $(this).css("z-index", 999 - offset);
                    offset++;
                });
                $( Cookies.get('brand') ).nextAll().each(function(index){
                   $(this).css("z-index", 999 - offset);
                    offset++;

                });
            
            //now close the menu is its open
            var openRightPush = document.getElementById('openRightPush')            
            if ($( '#openRightPush' ).hasClass('active')) {
                //change the text and icon back
                $('.menu-icon > i').toggleClass("fa-bars");
                $('.menu-icon > i').toggleClass("fa-times");
                $('.menu-text').html($('.menu-text').html() == 'MENU' ? 'CLOSE' : 'MENU');
                //remove the open classes
                $( '#openRightPush' ).removeClass('active');
                $( '#cbp-spmenu-s2' ).removeClass('cbp-spmenu-open');
            }
        });
        $(document).ready(function () {
            swiperH.on('slideChangeStart', function () {
                changeCurrentLogo();
            });
            swiperH.on('slideChangeEnd', function () {
                //small delay to let the hash load properly
                setTimeout(stackLogosSwipe, 50);
            });
            var slide = swiperH.slides[swiperH.activeIndex];
            loadVideo(slide);
        });
    }

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


    
});