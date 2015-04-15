jQuery(document).ready(function ($) {

    replaceThumbnailWithIframe = function(e, autoplay) {
        parent = e.parentNode;
        id = parent.getAttribute('data-youtube-id');
        // w = parent.getAttribute('data-player-width');
        // h = parent.getAttribute('data-player-height');    
        var autoplayBit = 1
        if (!autoplay) autoplayBit = 0;
        inner = '<iframe class="youtubePlayer" src="https://www.youtube.com/embed/' + id + '?autoplay='+autoplayBit+'&showinfo=0&autohide=1&border=0&wmode=opaque&rel=0&enablejsapi=1" frameborder="0"></iframe>';
        parent.innerHTML = inner;
    }

    $('.BetterTube-playBtn').each(function (i, e) {
        //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
            replaceThumbnailWithIframe(e, false);
        } else {
        $(e).on('click', function() {replaceThumbnailWithIframe(e, true)});
        }
    });

});