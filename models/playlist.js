var mongoose = require('mongoose');

var Video = function(youtube_id, name, votes){
	this.youtube_id = youtube_id;
	this.name = name;
	this.votes = votes;
	this.setYoutubeId = function(id){
		this.youtube_id = id;
	};
	this.getYoutubeId = function(){
		return this.youtube_id;
	};
	this.setName = function(name){
		this.name = name;
	};
	this.getName = function(){
		return this.name;
	};
	this.setVotes = function(votes){
		this.votes = votes;
	};
	this.getVotes = function(){
		return this.votes;
	};
	this.addVote = function(){
		this.votes++;
	};
	this.subtractVote = function(){
		this.votes--;
	};
};

var Playlist = new mongoose.Schema({
	videos: [Video],
	creator: mongoose.Schema.ObjectId
});

mongoose.model("Playlist", Playlist);