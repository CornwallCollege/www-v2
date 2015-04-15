jQuery(document).ready(function ($) {

    replaceThumbnailWithIframe = function(e) {
        parent = e.parentNode;
        id = parent.getAttribute('data-youtube-id');
        // w = parent.getAttribute('data-player-width');
        // h = parent.getAttribute('data-player-height');    
        inner = '<iframe class="youtubePlayer" src="https://www.youtube.com/embed/' + id + '?autoplay=1&autohide=1&border=0&wmode=opaque&rel=0&enablejsapi=1" frameborder="0"></iframe>';
        parent.innerHTML = inner;
    }

    $('.BetterTube-playBtn').each(function (i, e) {
        $(e).on('click', function() {replaceThumbnailWithIframe(e)});
    });

});