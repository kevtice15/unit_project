var mongoose = require('mongoose');

var Song = new mongoose.Schema({
	name: String,
	album: String,
	playlist_id: mongoose.Schema.ObjectId
});

mongoose.model("Song", Song);