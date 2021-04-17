let player;
const playerContainer = $(".player");
const button = $(".player__playback-button");
const buttonPaddLeft = parseInt(button.css("padding-left"));
const buttonPaddRight = parseInt(button.css("padding-right"));
const buttonWidth = ($(".player__playback-button").width() + buttonPaddLeft + buttonPaddRight) / 2;


let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
   $(".player__playback-button").addClass("active");
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
     $(".player__start").removeClass("active");
   } else {
     player.playVideo();
     $(".player__start").addClass("active");
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     
     "margin-left": `calc(${newButtonPositionPercent}% - ${buttonWidth}px)`
   });
   $(".player__playback-active").css({
     
    "width": `calc(${newButtonPositionPercent}% - ${buttonWidth}px)`
  });

   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
   $(".player__playback-button").addClass("active");
   $(".player__start").addClass("active");
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
    "margin-left": `calc(${completedPercent}% - ${buttonWidth}px)`
   });

   $(".player__playback-active").css({
    "width": `calc(${completedPercent}% - ${buttonWidth}px)`
  });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     $(".player__start").addClass("active");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     $(".player__start").removeClass("active");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "100%",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();