var mongoose = require('mongoose');

var User = new mongoose.Schema({
	name: String,
	room_id: mongoose.Schema.ObjectId
});

mongoose.model("User", User);