// var playlistIds = [];
var player;
var room;
var state;
var currentVideoId = null;
var currentVideoIndex;
var currentTime;
var playlist = [];


$(document).ready(function(){


	function createVideo(id){
		$('#ytplayer').attr('class', 'video-frame');
		$('#ytplayer').attr('width', 320);
		$('#ytplayer').attr('height', 200);
		$('#ytplayer').attr('src','http://www.youtube.com/embed/' + id + '?controls=0&showinfo=0&enablejsapi=1&iv_load_policy=3&rel=0&modestbranding=1&amp');
		$('#ytplayer').attr('frameborder', '0');
	}

	function handleLogin(){
		$.ajax({
			type: "get",
			url: "/auth/google",
			success: function(data, err){
				console.log(data);
				//put the user in the db
			},
			error: function(data, var2, err){
				console.log(data);
				console.log(err);
			}
		});
		console.log("sent ajax request");
	}


	$('#searchContainer').css({zIndex: 100});	
	var leftValue = 0;
	var topValue = 0;
	$('#login-button').click(function() {
		leftValue -= 320;
		$('#test-container').css({top: 0, left: leftValue, position: 'absolute'});
  		handleLogin();
  	});	

  	$('#rooms').click(function() {
  		leftValue -= 320;
	  	$('#test-container').css({top: 0, left: leftValue, position: 'absolute'});
  	});
  	
  	
  	
  	$('#searchMenuButton').click(function() {
	  	topValue -= 462;
	  	$('#test-container').css({top: topValue, left: leftValue, position: 'absolute'});
	  	$('#playlist-wrapper').css({zIndex: 0});
	  	$('#searchContainer').css({zIndex: 100});
  	});

  	$('#search-button').click(function() {
	  	search($('#query').val());
  	});
  	
  	$('#searchDone').click(function() {
		topValue += 462;
 	  	$('#test-container').css({top: topValue, left: leftValue, position: 'absolute'}); 	
 	  	console.log("done");
  	});
  	
  	$('#playlistDone').click(function() {
		topValue += 462;
 	  	$('#test-container').css({top: topValue, left: leftValue, position: 'absolute'}); 	
 	  	console.log("done");
  	});  	
  	
  	$('#playListMenuButton').click(function(){
	  	topValue -= 462;
	  	$('#test-container').css({top: topValue, left: leftValue, position: 'absolute'});
	  	$('#searchContainer').css({zIndex: 0});
	  	$('#playlist-wrapper').css({zIndex: 100});
  	});

  	

	//Will want to put a add videos thing to the empty video or a create group thing
	createVideo(playlist[0]);
	
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
	};
	

	
	/*********************************
			Room player controls
	**********************************/

	//play video
	$('#play').click(function() {
		// playPauseToggle(parseState(1));
		playPauseToggle(parseState(1), player.getCurrentTime());
	});
	//pause video
	$('#pause').click(function() {
		// playPauseToggle(parseState(2));
		playPauseToggle(parseState(2), player.getCurrentTime());
	});
	
	//play next video
	$('#next').click(function() {

		if(playlist[currentVideoIndex+1]){
			currentVideoIndex++;
			updateVideo(currentVideoIndex);
		}
	
	});

	//play previous video
	$('#previous').click(function() {

		if(playlist[currentVideoIndex-1]){
			currentVideoIndex--;
			updateVideo(currentVideoIndex);
		}
	
	});

	//stop video and clear
	$('#stop').click(function() {
		// player.stopVideo();
		// player.clearVideo();
		stopVideo();
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
			currentTime = player.getCurrentTime();
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
	}
	
/*
	The API calls this function when the player's state changes.

*/
	var done = false;
	
	function onPlayerStateChange(e) {
		// //socket emit the event
		// videoEvent({

		// 	state: parseState(e.data),

		state = e.data;

		// console.log(parseState(state));

		$('#currentState').html(parseState(e.data));

		// });
		// if (e.data === 1 || e.data === 2){
		// 	playPauseToggle(parseState(e.data));
		// }

		// if (e.data === 1 || e.data === 2){
		// 	playPauseToggle(parseState(e.data), currentTime);
		// }

		// console.log('event: ' + e.data);
		// console.log(parseState(e.data));
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
		} else if (state === 5) {
			return 'video cued';
		}		
	}


});
	












