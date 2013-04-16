var mongoose = require('mongoose');

var UserPlaylist = new mongoose.Schema({
	videos: [Video],
	creator: mongoose.Schema.ObjectId,
	shared: Boolean,
	name: String,
	dj: mongoose.Schema.ObjectId
});

mongoose.model("UserPlaylist", UserPlaylist);