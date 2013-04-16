var mongoose = require('mongoose');

var Room = new mongoose.Schema({
	name: String,
	playlist: mongoose.Schema.ObjectId
});

mongoose.model("Room", Room);