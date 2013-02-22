var express = require('express'),
    app = express();

app.use(express.logger());
app.use(express.bodyParser());

var http = require('http'),
	https = require('https');

app.get("/static/:filename", function(request, response){
	response.sendfile("static/" + request.params.filename);
});

var requestQuery;
var responseJSON = '';

var clientId = "VU0DICU13IR5L5YWZ23OGBCIMSUA2CCQILVXMV2QRQGRGKHN";
var clientSecret = "3UB2V5MNWB0QUCGNA5DDIH05YU0BSOOE0DI05GISLLWWGN0D";
/*
var options = {
	host: 'search.twitter.com',
	port: 443,
	path: '/search.json',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

exports.getJSON = function(options, onResult){
	console.log("getJSON start");

	var port = options.port == 443 ? https : http;
	var req = port.request(options, function(res){
		var output = '';
		console.log(options.host + ':' + res.statusCode);
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			output += chunk;
		});
		res.on('end', function(){
			var obj = JSON.parse(output);
			onResult(res.statusCode, obj);
		});
	});

	req.on('error', function(err){

	});
	req.end;
}
*/

function tweetGetter(){
	console.log("current query" + requestQuery);
	var options = {
		host: 'search.twitter.com',
		path: "/search.json?rpp=100&q=" + requestQuery,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	console.log("path option: " + options.path);
	callback = function(response){
		console.log("I enter callback");
		var str = '';
		response.on('data', function(chunk){
			if(chunk){
				str += chunk;
			}
			
			responseJSON += chunk;
		});

		response.on('end', function(){
			console.log(str);
		});

		//console.log(http.request(options, callback));
	};
	return http.request(options, callback).end();

}

function venueGetter(query, callback2){
	console.log("current query" + query);
	var options = {
		host: "api.foursquare.com",
		path: "/v2/venues/search?ll=" + query + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130222",
		//path: "/v2/venues/search?ll=" + query,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Connection': 'close'
		}
	};
	console.log("path option: " + options.path);
	callback = function(response){
		console.log("I enter venue callback");
		var str = '';
		response.on('data', function(chunk){
			if(chunk){
				str += chunk;
			}
			
			responseJSON += chunk;
		});

		response.on('end', function(){
			console.log(str);
			callback2(str);
		});

		response.on('err', function(){
			console.log("We gotta error gettin the venues yo");
		});
		//console.log(http.request(options, callback));
	};
	console.log("Gonna call the next line");
	return https.request(options, callback).end();
}

app.get('/venues/search', function(request, response){
	var lat = request.query.lat;
	var lon = request.query.lon;
	console.log("params = " + request.query);
	console.log(lat + " " + lon);
	var venues = venueGetter(lat + ',' + lon, function(resp){
		return resp;
	});
	console.log("***********VENUES************" + venues);
	response.send({
		data: JSON.parse(venues),
		success: (venues !== undefined)
	});
});

app.get('/search', function(request, response){
	console.log("********Le response JSON*******" + responseJSON);
	if(responseJSON.substring(0,5) === 'false'){
		responseJSON = responseJSON.substring(5);
	}
	response.send({
		data: responseJSON,
		success: (responseJSON !== undefined)
	});

});

app.post('/search.json', function(request, response){
	requestQuery = request.body.query;
	console.log("request: " + request.body.query);
	responseJSON = tweetGetter();
	console.log("!!response: " + responseJSON);
	response.send({
		success: responseJSON !== undefined
	});
});

app.listen(8889);
//console.log('Express server started on port %s', app.address().port);