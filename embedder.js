/*///////////////////////////////////////////////*/
/* Vars & svgs
/*///////////////////////////////////////////////*/
var twitchButton = '<div class="relative"><div style="display: inherit;"><button onclick="window.location=\'$1\'" class="tw-button tw-button--hollow"><span class="tw-button__text">Embed</span></button></div></div>';
var youtubeSVG = '<svg width="100%" height="100%" viewBox="0 0 36 36"><path fill="#EEE" d="m10,16l2,0l0,-4l4,0l0,-2l-6,0l0,6l0,0z"></path><path fill="#EEE" d="m20,10l0,2l4,0l0,4l2,0l0,-6l-6,0l0,0z"></path><path fill="#EEE" d="m24,24l-4,0l0,2l6,0l0,-6l-2,0l0,4l0,0z"></path><path fill="#EEE" d="m12,20l-2,0l0,6l6,0l0,-2l-4,0l0,-4l0,0z"></path><line y2="21" x2="18" y1="15" x1="18" stroke-width="1.5" stroke="hsl(0, 0%, 93.3%)"></line><line transform="rotate(90 18,18)" y2="21" x2="18" y1="15" x1="18" stroke-width="1.5" stroke="hsl(0, 0%, 93.3%)"></line></svg>';

/*///////////////////////////////////////////////*/
/* Functions & utils
/*///////////////////////////////////////////////*/
function isTwitch(){
   return document.querySelector("title").innerText.match(/Twitch$/i) !== null
}
function getTwitchUser(){
   return document.querySelector(".channel-header__user") === null ? null : document.querySelector(".channel-header__user").attributes["href"].nodeValue.replace("/", "");
}
function addTwitchButton(url){
   var button = document.querySelector(".channel-info-bar__action-container .flex:last-child div");
   button.insertAdjacentHTML('beforebegin', twitchButton.replace("$1", url));
}

/*///////////////////////////////////////////////*/
/* Runtime
/*///////////////////////////////////////////////*/
window.onload = function(){
   if(isTwitch() && getTwitchUser() !== null) {
      var embedLink = "https://player.twitch.tv/?channel=" + getTwitchUser();
      addTwitchButton(embedLink);
   }
 }