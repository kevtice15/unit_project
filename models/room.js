var mongoose = require('mongoose');

var Room = new mongoose.Schema({
	name: String,
	up_down: Boolean,
	pub: Boolean,
	DJ: mongoose.Schema.ObjectId,
	playlist: mongoose.Schema.ObjectId
});

mongoose.model("Room", Room);