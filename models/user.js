var mongoose = require('mongoose');

var User = new mongoose.Schema({
	name: String,
	room: mongoose.Schema.ObjectId
});

mongoose.model("User", User);