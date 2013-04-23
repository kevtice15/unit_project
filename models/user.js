var mongoose = require('mongoose');

var User = new mongoose.Schema({
	google_id: String,
	name: String,
	room_id: mongoose.Schema.ObjectId
});

module.exports = mongoose.model("User", User);

/*
User.ensureIndexes(function(err){
	if(err){
		return handleError(err);
	}
});

User.on('index', function(err){
	if(err){
		console.log(err);
	}
});
*/
User.methods.addRoomId = function (roomId){
	this.room_id = roomId;
};
