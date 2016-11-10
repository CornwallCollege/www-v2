jQuery(document).ready(function ($) {

    replaceThumbnailWithIframe = function (e, autoplay) {
        id = e.getAttribute('data-youtube-id');
        var autoplayBit = 1
        if (!autoplay) autoplayBit = 0;
        inner = '<iframe class="youtubePlayer" src="https://www.youtube.com/embed/' + id + '?autoplay=' + autoplayBit + '&showinfo=0&autohide=1&border=0&wmode=opaque&rel=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
        e.innerHTML = inner;
    }

    $('.BetterTube').each(function (i, e) {
        //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if (/iPhone|iPad|iPod|IEMobile/i.test(navigator.userAgent)) {
            replaceThumbnailWithIframe(e, false);
        } else {
            $(e).on('click', function () {
                replaceThumbnailWithIframe(e, true)
            });
        }
    });

});