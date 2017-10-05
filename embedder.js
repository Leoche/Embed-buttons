var twitchButton = '<div class="relative"><div style="display: inherit;"><button onclick="window.location=\'$1\'" class="tw-button tw-button--hollow"><span class="tw-button__text">Embed</span></button></div></div>';
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

window.onload = function(){
   if(isTwitch() && getTwitchUser() !== null) {
      var embedLink = "https://player.twitch.tv/?channel=" + getTwitchUser();
      addTwitchButton(embedLink);
   }
 }