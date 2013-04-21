var mongoose = require('mongoose');

var UserPlaylist = new mongoose.Schema({
	user_id: mongoose.Schema.ObjectId,
	playlist_id: mongoose.Schema.ObjectId
});

module.exports = mongoose.model("UserPlaylist", UserPlaylist);