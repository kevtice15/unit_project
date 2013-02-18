var express = require('express'),
    app = express();

app.use(express.logger());
app.use(express.bodyParser());

var http = require('http'),
	https = require('https');

app.get("/static/:filename", function(request, response){
	response.sendfile("static/index.html");
});

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


app.get('/search.json', function(request, response){
	var options = {
		host: 'search.twitter.com',
		port: 443,
		path: '/search.json',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	var req = http.request(options, function(res){
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	req.write("?q=" + request.body.query);

	response.send(res);
});

app.listen(8889);
//console.log('Express server started on port %s', app.address().port);