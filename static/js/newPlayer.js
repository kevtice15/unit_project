/**/
/*
var player;

$(document).ready(function(){

	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	$('#ytplayer').attr('class', 'video-frame');
	$('#ytplayer').attr('width', 320);
	$('#ytplayer').attr('height', 200);
	$('#ytplayer').attr('src','http://www.youtube.com/embed/' + null + '?controls=0&showinfo=0&enablejsapi=1&iv_load_policy=3&rel=0&modestbranding=1&amp');
	$('#ytplayer').attr('frameborder', '0');

	$('#play').on('click', videoApp.play);
	$('#pause').on('click', videoApp.pause);
	$('#stop').on('click', videoApp.stop);
	$('#next').on('click', videoApp.next);
	// $('#previous').on('click', previous);
	$('#mute').on('click', videoApp.mute);

});
*/
$(document).ready(function(){
	var videoApp = {
		player: null,
		currentState: "",
		userName: "",
		roomId: "",
		currentVideo: "",

		setup: function(){
			this.addYouTubeAPI();
			this.createFrame();
			this.bindControls();
		},

		//Add the API
		addYouTubeAPI: function(){
			var tag = document.createElement('script');
			tag.src = "//www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			this.onYouTubePlayerAPIReady();
		},

		// Register the player
		onYouTubePlayerAPIReady: function(){
			player = new YT.Player("player", {
				height: "320",
				width: "200",
				videoId: "PpccpglnNf0",
				playerVars: {
					playlist: ["PpccpglnNf0"]
				},
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange
				}
			});
			console.log(player);
		},

		//Set up the iframe element
		createFrame: function(){
			$('#ytplayer').attr('class', 'video-frame');
			$('#ytplayer').attr('width', 320);
			$('#ytplayer').attr('height', 200);
			$('#ytplayer').attr('src','http://www.youtube.com/embed/' + null + '?controls=0&showinfo=0&enablejsapi=1&iv_load_policy=3&rel=0&modestbranding=1&amp');
			$('#ytplayer').attr('frameborder', '0');
		},

		//Bind the click evends to the player buttons
		bindControls: function(){
			// $('#play').on('click', play);
			$('#pause').on('click', pause);
			$('#stop').on('click', stop);
			$('#next').on('click', next);
			// $('#previous').on('click', previous);
			$('#mute').on('click', mute);
		},

		onPlayerReady: function(){
			setInterval(videoInformation(),10);
		},

		//THIS IS WHERE YOU HANDLE ALL THE CHANGES IN THE VIDEO
		// this is where you could broadcast things to rooms
		onPlayerStateChange: function(){

		},

		//update the DOM
		updateDom: function (elemId, data) {
			$(elemId).html(' ' + data + '<br>');
			//console.log(data);
		},


		videoInformation: function(){
			//video time
			updateDom('#time', player.getCurrentTime());
			//percentage of video loaded
			updateDom('#loaded', Math.round(player.getVideoLoadedFraction() * 100) / 100);
			//state of the player
			updateDom('#state', parseState(player.getPlayerState()));
			//length of the video
			updateDom('#duration', player.getDuration());
			//url of the video
			updateDom('#url', player.getVideoUrl());
			//return volume
			updateDom('#volume', player.getVolume());
			//return muted
			updateDom('#muteS', player.isMuted());
			//return quality
			updateDom('#quality', player.getPlaybackQuality());
		},



		//return a string based on its corrisponding code
		parseState: function(state) {
			if (state === -1) {
				return 'unstarted';
			} else if (state === 0) {
				return 'ended';
			} else if (state === 1) {
				return 'playing';
			} else if (state === 2) {
				return 'paused';
			} else if (state === 3) {
				return 'buffering';
			} else if (state === 5) {
				return 'video cued';
			}
		},

		updatePlaylist: function(videoId){
			player.playerVars.playlist.push(videoId);
			// player.videoId = 
		},

		play: function(){
			player.playVideo();
		},
		pause: function(){
			player.pauseVideo();
		},
		stop: function(){
			player.stopVideo();
			player.clearVideo();
		},
		next: function(){
			player.nextVideo();
		},
		previous: function(){
			player.previousVideo();
		},
		playVideoByIndex: function(index){
			player.playVideoAt(index);
		},
		mute: function(){
			if(player.isMuted()){
				player.unMute();
			}else{
				player.mute();
			}
		}
	};

	videoApp.setup();
});



