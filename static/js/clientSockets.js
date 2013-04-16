var socket = io.connect();
 

socket.on("status", function(data) {
    if (data.success) {
      console.log("Message successfully sent");
    } else {
      console.log("Message failed to send");
    }
});

socket.on("newVideo", function(data) {
   $("#playlist").append($("<li>").html(data.body));
   playlistIds.push(data.body);
});

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	//socket.emit('adduser', prompt("What's your name?"));
	console.log('About to emit ************');
	socket.emit('users:create', {body:{name: prompt("What's your name?")}});
	console.log('Emitted!!!! ************');
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


//Will want to make this so that it is a video for just the room

function addVideo(id){
	socket.emit('videoAdded', {body: id });
}

function nextVideo(videoToPlay){
	socket.emit('next', videoToPlay);
}

socket.on('updateVideo', function(video){
	player.loadVideoById(playlistIds[video], 0, 'medium');
	console.log("should be playing next song " + video);
});