/*===========================
		Express Server
===========================*/

var express = require('express.io'),
	// videos = require('./videos/videos.js');
	app = express();

app.http().io().set('log level', 1);


app.use(express.logger('dev'));
app.use(express.bodyParser());


app.get("/static/:filename", function(request, response){
	response.sendfile("static/" + request.params.filename);
});

app.get("/static/js/:filename", function(request, response){
	response.sendfile("static/js/" + request.params.filename);
});

app.get("/static/css/:filename", function(request, response){
	response.sendfile("static/css/" + request.params.filename);
});

// app.get('/videos', videos.findAll);
// app.get('/videos/:id', videos.findById);
// app.post('/videos', videos.addVideo);
// app.put('/videos/:id', videos.updateVideo);
// app.delete('/videos/:id', videos.deleteVideo);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

//Require our data models
var User = require('./models/user');
var Playlist = require('./models/playlist');
var Room = require('./models/room');

//Require our routes 
require("./routes/routes.js")(app);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

//Not doing anything here; you can use the restful api with cURL

});
	


var server = app.listen(8889);
console.log('Express listening on port 8889');


/*===========================
		Socket Server
===========================*/
//var io = require('socket.io').listen(server);



// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];


app.io.sockets.on("connection", function(socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(nameandroom){
		// store the username in the socket session for this client
		// CREATE NEW USER IN DB
		console.log("I GET HERE");
		socket.emit('users:create', {body:{name: nameandroom.name}});
		console.log("I GET HERE 2");
		socket.username = nameandroom.name;
		
		socket.emit('rooms:create', {body:{name: nameandroom.room}});
		console.log("********Socket Log*********", socket);
		// store the room name in the socket session for this client
		// CREATE NEW ROOM IN DB
		// SET USERS ROOM TO THAT ROOM
		console.log("User", User);
		var justAddedUser = User.findOne({ 'name': 'nameandroom.name' });
		//justAddedUser.
		socket.room = 'room1';
		// add the client's username to the global list
		usernames[nameandroom.name] = nameandroom.name;

		// SET USERS ROOM TO THAT ROOM
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

	socket.on('addRoom', function(roomname){
		socket.emit('rooms:create', {body:{name: roomname}});
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});


	socket.on('videoAdded', function(data){
		socket.emit('status', {success: 'true'})
		app.io.sockets.emit('newVideo', { body: data.body });
	});

	socket.on('next', function(video){
		socket.emit('status', {success: 'true'})
		socket.broadcast.to('room1').emit('updateVideo', video);
	});

});