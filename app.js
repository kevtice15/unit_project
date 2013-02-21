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

function tweetGetter(){
	console.log("current queryn " + requestQuery);
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
			responseJSON += chunk;
		});

		response.on('end', function(){
			console.log(str);
		});

		//console.log(http.request(options, callback));
	};
	return http.request(options, callback).end();

}

// app.get('/search.json', function(request, response){
	// console.log("********Le response JSON*******" + responseJSON);
	// requestQuery = request.body.query;
	// tweetGetter();
	
	// if(responseJSON.substring(0,5) === 'false'){
		// responseJSON = responseJSON.substring(5);
	// }
	// response.send({
		// data: responseJSON,
		// success: (responseJSON !== undefined)
	// });

// });

app.get('/search/:keyword', function(request, response){
	requestQuery = request.params.keyword;
	tweetGetter();
	
	/*
	want to have this send on the return of the twitter feed
	or write to a file in the fn above????
	or us .on and create an event emitter type thing
	ORRR could I somehow create a closure with the .on end event in the tweet getter function to send the data
	*/
	// setTimeout(parseData,500);
	// response.send({
		// data: responseJSON,
		// success: (responseJSON !== undefined)
	// });
	
	(function(){
		setTimeout(function(){
			
			parseData();
			console.log("setTimeout " + responseJSON);
			response.send({
			data: responseJSON,
			success: (responseJSON !== undefined)
		});
		},1000);
	})();	
	
	
	

});

function parseData(){
	if(responseJSON.substring(0,5) === 'false'){
		responseJSON = responseJSON.substring(5);
	}
	else if (responseJSON.substring(0,9) === 'undefined'){
		responseJSON = responseJSON.substring(9);
	}
}


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