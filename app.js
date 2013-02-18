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
var responseJSON;
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

function tweetGetter(q){
	console.log("current query" + requestQuery);
	var options = {
		host: 'search.twitter.com',
		path: "/search.json?q=" + requestQuery,
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
			str += chunk;
		});

		response.on('end', function(){
			console.log(str);
		});

		//console.log(http.request(options, callback));
	};
	return http.request(options, callback).end();

}

app.get('/search', function(request, response){
	

});

app.post('/search.json', function(request, response){
	requestQuery = request.body.query;
	console.log("request: " + request.body.query);
	responseJSON = tweetGetter();
	response.send(true);
});

app.listen(8889);
//console.log('Express server started on port %s', app.address().port);