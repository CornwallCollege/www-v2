if (document.body.addEventListener) {
  document.body.addEventListener('click',replaceThumbnailWithIframe,false);
}
else {
  document.body.attachEvent('onclick',replaceThumbnailWithIframe);//for IE
}

function replaceThumbnailWithIframe(e){
  e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.className.match(/BetterTube-playBtn/)){
    parent = target.parentNode;
    id = parent.getAttribute('data-youtube-id');
    // w = parent.getAttribute('data-player-width');
    // h = parent.getAttribute('data-player-height');
    style = 'style="frameborder=0;"';
    inner = '<iframe id="ytplayer" class="youtube-player" type="text/html" src="https://www.youtube.com/embed/' + id + '?autoplay=1&autohide=1&border=0&wmode=opaque&rel=0&enablejsapi=1"' + style + ' allowfullscreen/>'
    parent.innerHTML = inner;
  }
}