var mongoose = require('mongoose');

exports.create = function(request, response){
	var Resource = mongoose.model('Playlist');
	var fields = request.body;
	console.log("CREATE PLAYLIST REQUEST", request.user);
	var r = new Resource(fields);
	r.save(function(err, Resource){
		if(err){
			response.send(500, {error: err});
		}

		r.addCreatorandDJ(request.user);
		response.send(Resource);
	});
};

exports.retrieve = function(request, response){
	var Resource = mongoose.model('Playlist');

	if(request.params.id !== undefined){
		Resource.findById(request.params.id, function(err, Resource){
			if(err){
				response.send(500, {error: err});
			}
			else if(Resource){
				response.send(Resource);
			}
			else{
				response.send(404);
			}
		});
	}
	else{
		Resource.find({}, function(err, coll){
			response.send(coll);
		});
	}
};

exports.update = function(request, response){
	var Resource = mongoose.model('Playlist');
	var fields = request.body;

	Resource.findByIdAndUpdate(request.params.id, {$set: fields}, function(err, Resource){
		if(err){
			response.send(500, {error: err});
		}
		else if(Resource){
			response.send(Resource);
		}
		else{
			response.send(404);
		}
	});
};

exports.del = function(request, response){
	var Resource = mongoose.model('Playlist');

	Resource.findByIdAndRemove(request.params.id, function(err, Resource){
		if(err){
			response.send(500, {error: err});
		}
		else if(Resource){
			response.send(200);
		}
		else{
			response.send(404);
		}
	});
};

exports.retrievePlaylists = function(request, response){
	var Resource = mongoose.model("Playlist");
	var userPlaylists = Resource.getUserPlaylists(request.params.id);
	response.send({
		playlist: userPlaylists,
		success: true
	});
}

function playlistLog(err){
	console.log("[playlist route] - ", err);
}