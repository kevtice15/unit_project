//Require controllers

var playlists = require('../controllers/playlists');
var rooms = require('../controllers/rooms');
var users = require('../controllers/users');

module.exports = function(app){

	//Static route
	// app.get("/static/:filename", function(request, response){
	// 	response.sendfile("static/" + request.params.filename);
	// });

	//User routes
	
	/*
	app.io.route('/users:create', function(request){
		console.log("****************************");
		users.create(request);
	});
	*/
	app.io.route('users', {
    create: function(req) {
      // create your customer
      users.create(req);
    },
    retrieve: function(req){
      users.retrieve(req);
    },
    update: function(req) {
      // update your customer
      users.update(req);
    },
    remove: function(req) {
      // remove your customer
      users.del(req);
    }
  });

	app.post('/users', function(request, response){
		users.create(request, response);
	});

	app.get('/users', function(request, response){
		users.retrieve(request, response);
	});

	app.get('/users/:id', function(request, response){
		users.retrieve(request, response);
	});

	app.put('/users/:id', function(request, response){
		users.update(request, response);
	});

	app.del('/users/:id', function(request, response){
		users.del(request, response);
	});

	//Room routes
	app.post('/rooms', function(request, response){
		rooms.create(request, response);
	});

	app.get('/rooms', function(request, response){
		rooms.retrieve(request, response);
	});

	app.get('/rooms/:id', function(request, response){
		rooms.retrieve(request, response);
	});

	app.put('/rooms/:id', function(request, response){
		rooms.update(request, response);
	});

	app.del('/rooms/:id', function(request, response){
		rooms.del(request, response);
	});

	//Playlist routes
	app.post('/playlists', function(request, response){
		playlists.create(request, response);
	});

	app.get('/playlists', function(request, response){
		playlists.retrieve(request, response);
	});

	app.get('/playlists/:id', function(request, response){
		playlists.retrieve(request, response);
	});

	app.put('/playlists/:id', function(request, response){
		playlists.update(request, response);
	});

	app.del('/playlists/:id', function(request, response){
		playlists.del(request, response);
	});
}
