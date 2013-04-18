var mongoose = require('mongoose');

var Room = new mongoose.Schema({
	name: String,
	DJ: mongoose.Schema.ObjectId,
	playlist: mongoose.Schema.ObjectId,
	state:{
		currentVideoTime: Number,
		currentVideoId: String,
		currentVideoPlaylistIndex: Number
	}
});

mongoose.model("Room", Room);
