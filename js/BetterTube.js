if (document.body.addEventListener) {
  document.body.addEventListener('click',replaceThumbnailWithIframe,false);
}
else {
  document.body.attachEvent('onclick',replaceThumbnailWithIframe);//for IE
}

function replaceThumbnailWithIframe(e){
  e = e || window.event;
  var target = e.target || e.srcElement;
    alert('here1');
  if (target.className.match(/BetterTube-playBtn/)){
      alert('here2');
    parent = target.parentNode;
    id = parent.getAttribute('data-youtube-id');
    // w = parent.getAttribute('data-player-width');
    // h = parent.getAttribute('data-player-height');    
    inner = '<iframe class="youtubePlayer" src="https://www.youtube.com/embed/' + id + '?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1" frameborder="0"></iframe>';
    parent.innerHTML = inner;
      alert('here3');
  } 
}