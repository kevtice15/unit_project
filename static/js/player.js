var playlistIds = [];
var player;
$(document).ready(function(){

		
	//DO SOMETHING BETTER THAN THIS LIKE HAVE AN OBJECT WITH WHAT IS PLAYING AND ALL ITS 
	//IMPORTANT INFO
	var currentlyPlaying = -1;



	function createVideo(id){
		$('#ytplayer').attr('class', 'video-frame');
		$('#ytplayer').attr('width', 320);
		$('#ytplayer').attr('height', 200);
		$('#ytplayer').attr('src','http://www.youtube.com/embed/' + id + '?controls=0&showinfo=0&enablejsapi=1&iv_load_policy=3&rel=0&modestbranding=1&amp');
		$('#ytplayer').attr('frameborder', '0');
	}

	//Will want to put a add videos thing to the empty video or a create group thing
	createVideo(playlistIds[1]);
	
	// Add the API 
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	// Register the player
	// var player;
	console.log(player);
	onYouTubeIframeAPIReady = function() {
		player = new YT.Player('ytplayer', {
		    events: {
		        'onReady': onPlayerReady,
		        'onStateChange': onPlayerStateChange
		    }
		}); 	    
	}
	
	// controls
	//play video
	$('#play').click(function() {
	    player.playVideo();
	});
	//pause video
	$('#pause').click(function() {
	    player.pauseVideo();
	});
	//play new video from time
	var time = 10;
	$('#p-seek').click(function() {
		player.loadVideoById(playlistIds[0], time, 'medium');
	});
	//play next video
	$('#next').click(function() {
		player.loadVideoById(playlistIds[++currentlyPlaying], 20, 'medium');
		console.log(currentlyPlaying);

		//REDO THIS...this currently to test whether I can sync playing next video
		nextVideo(currentlyPlaying);


	});
	//stop video and clear
	$('#stop').click(function() {
		player.stopVideo();
		player.clearVideo();
	});
	//mute audio
	var mute = false;
	$('#mute').click(function() {
		if (mute === false) {
			player.mute();
			mute = true;
		} else {
			player.unMute();
			mute = false;
		}
	});
	
	//when the player finishes loading
	function onPlayerReady(event) {
	    //e.g. event.target.playVideo();
	    //call functions to update the data
	    setInterval(function(){
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
	    }, 10);
	    console.log(player);
	}
	
/*
	The API calls this function when the player's state changes.
	The function indicates that when playing a video (state=1),
	the player should play for six seconds and then stop.
*/
	var done = false;
	
	function onPlayerStateChange(event) {
	/*e.g. if (event.data == YT.PlayerState.PLAYING && !done) {
	          setTimeout(stopVideo, 6000);
	          done = true;
	        }*/
	}

	//update the DOM
	function updateDom(elemId, data) {
		$(elemId).html(' ' + data + '<br>');
		//console.log(data);
	}
	
	//return a string based on its corrisponding code
	function parseState(state) {
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
		} else if (state === 4) {
			return 'video cued';
		}		
	}


});
	












