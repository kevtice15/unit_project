var socket = io.connect();
 

socket.on("status", function(data) {
	if (data.success) {
	  console.log("Message successfully sent");
	} else {
	  console.log("Message failed to send");
	}
});

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("What's your name?"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
	$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updaterooms', function(rooms, current_room) {
	$('#rooms').empty();
	$.each(rooms, function(key, value) {
		if(value == current_room){
			$('#rooms').append('<div>' + value + '</div>');
		}
		else {
			$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
		}
	});
});

function switchRoom(room){
	socket.emit('switchRoom', room);
}

function addVideo(id){
	socket.emit('videoAdded', {body: id });
}

socket.on("newVideo", function(data) {
   $("#playlist").append($("<li>").html(data.body));
   playlist.push(data.body);
   if(currentVideoId === null){
		player.cueVideoById(data.body);
		currentVideoId = data.body;
		currentVideoIndex = 0;
   }
});

function updateVideo(videoToPlay){
	socket.emit('updateVideo', videoToPlay);
}

socket.on('updateVideo', function(video){
	player.loadVideoById(playlist[video], 0, 'medium');
	console.log("should be playing next song " + video);
});

function playPauseToggle(e){
	socket.emit('playPause', e);
	console.log("client emit statechage: " +  e);

}

socket.on('update', function(e){
	if(e === 'playing'){
		player.playVideo();
	}else if(e === 'paused'){
		player.pauseVideo();
	}
});

function stopVideo(){
	socket.emit('stop');
}

socket.on('stopVideo', function(){
	player.stopVideo();
	player.clearVideo();
});

// function playPauseToggle(e, currentTime){
// 	socket.emit('playPause', {e: e, time: currentTime});
// 	console.log("client emit statechage: " +  e);

// }

// socket.on('update', function(e){
// 	if(e === 'playing'){
// 		if(Math.abs(currentTime-e.time)){
// 			player.playVideo();
// 		}else{
// 			player.seekTo(e.time, false);
// 		}
		
// 	}else if(e === 'paused'){
// 		player.pauseVideo();
// 	}
// });