/*///////////////////////////////////////////////*/
/* Vars & svgs
/*///////////////////////////////////////////////*/
var twitchButton = '<div id="embed-btn" class="relative"><div style="display: inherit;"><button onclick="window.location=\'$1\'" class="tw-button tw-button--hollow"><span class="tw-button__text">Embed</span></button></div></div>';

var youtubeSVG = '<svg width="100%" height="100%" viewBox="0 0 36 36"><path fill="#EEE" d="m10,16l2,0l0,-4l4,0l0,-2l-6,0l0,6l0,0z"></path><path fill="#EEE" d="m20,10l0,2l4,0l0,4l2,0l0,-6l-6,0l0,0z"></path><path fill="#EEE" d="m24,24l-4,0l0,2l6,0l0,-6l-2,0l0,4l0,0z"></path><path fill="#EEE" d="m12,20l-2,0l0,6l6,0l0,-2l-4,0l0,-4l0,0z"></path><line y2="21" x2="18" y1="15" x1="18" stroke-width="1.5" stroke="hsl(0, 0%, 93.3%)"></line><line transform="rotate(90 18,18)" y2="21" x2="18" y1="15" x1="18" stroke-width="1.5" stroke="hsl(0, 0%, 93.3%)"></line></svg>';
var youtubeButton = '<button id="embed-btn" onclick="window.location=\'$1\'" class="ytp-button ytp-hd-quality-badge" title="Embed">' + youtubeSVG + '</button>'

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
function hasEmbedButton(url){
   return document.querySelector("#embed-btn") !== null;
}
function removeEmbedButton(){
   document.querySelector("#embed-btn").remove()
}

function isYoutube(){
   return document.querySelector("title").innerText.match(/Youtube$/i) !== null
}
function getYoutubeLink(){
   return document.querySelector("ytd-watch") === null ? null : document.querySelector("ytd-watch").attributes["video-id"].nodeValue;
}
function addYoutubeButton(url){
   var button = document.querySelector(".ytp-fullscreen-button");
   button.insertAdjacentHTML('afterend', youtubeButton.replace("$1", url));
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

/*///////////////////////////////////////////////*/
/* Runtime
/*///////////////////////////////////////////////*/
var lastTwitch = null;
var lastYoutube = null;
observeDOM(document.querySelector('body') ,function(){
   if(!hasEmbedButton()){
      if(isTwitch() && getTwitchUser() !== null &&  getTwitchUser() != "undefined") {
         lastTwitch = getTwitchUser();
         addTwitchButton("https://player.twitch.tv/?channel=" + getTwitchUser());
      }
      if(isYoutube() && getYoutubeLink() !== null && getYoutubeLink() != "undefined" && getYoutubeLink() != ""){
         lastYoutube = getYoutubeLink();
         addYoutubeButton("https://www.youtube.com/embed/" + getYoutubeLink());
      }
   }else{
      if(isTwitch() && getTwitchUser() !== null &&  getTwitchUser() != "undefined") {
         if(hasEmbedButton() && lastTwitch != getTwitchUser()) removeEmbedButton()
      }
      if(isYoutube() && getYoutubeLink() !== null && getYoutubeLink() != "undefined" && getYoutubeLink() != ""){
         if(hasEmbedButton() && lastYoutube != getYoutubeLink()) removeEmbedButton()
      }
   }
 });