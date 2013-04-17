var mongoose = require('mongoose');

var User = new mongoose.Schema({
	name: String,
	room_id: mongoose.Schema.ObjectId
});

mongoose.model("User", User);

User.methods.addRoomId = function (roomId){
	this.room_id = roomId;
}