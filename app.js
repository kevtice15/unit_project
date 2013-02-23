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
<<<<<<< HEAD
var responseJSON = '';

var fsclientId = "VU0DICU13IR5L5YWZ23OGBCIMSUA2CCQILVXMV2QRQGRGKHN";
var fsclientSecret = "3UB2V5MNWB0QUCGNA5DDIH05YU0BSOOE0DI05GISLLWWGN0D";

var twclientId = "Bt2qpXMrCsbctcTSwxVU8Q";
var twclientSecret = "j2EweBmhK7cknxr3WvIAZLl1SjVs7YmDKd0k66okVdA";
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
=======
var latestTweet = 0;
>>>>>>> client start post/get


function tweetGetter(callBack2){
	console.log("current query " + requestQuery);
	var options = {
		host: 'search.twitter.com',
		path: "/search.json?q=" + requestQuery + "&rpp=100&geocode=37.781157,-122.398720,25mi",
		//host: 'api.twitter.com',
		//path: "/1.1/trends/place.json?id=" + requestQuery + "&rpp=100",
<<<<<<< HEAD
		path: "https://api.twitter.com/1.1/trends/place.json?id=1",
		host: 'search.twitter.com',
		//path: "/search.json?rpp=100&q=" + requestQuery,
=======
		//path: "api.twitter.com/1.1/trends/place.json?id="+requestQuery,
		
>>>>>>> client start post/get
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
<<<<<<< HEAD

				//responseJSON += chunk;
=======
>>>>>>> client start post/get
			}
			//responseJSON += chunk;
		});

		response.on('end', function(){
			callBack2(str);
		});

		//console.log(http.request(options, callback));
	};
	//return http.request(options, callback).end();
	return https.request(options, callback).end();

}

<<<<<<< HEAD

function venueGetter(query, callback2){
	console.log("current query" + query);
	var options = {
		host: "api.foursquare.com",
		path: "/v2/venues/search?ll=" + query + "&client_id=" + fsclientId + "&client_secret=" + fsclientSecret + "&v=20130222",
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

=======
>>>>>>> client start post/get
app.get('/search/:keyword', function(request, response){
	requestQuery = request.params.keyword;
	tweetGetter(function(str){
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		response.send({
			data: parseData(str),
			success: (str !== undefined)
		});
	});
});



app.get('/venues/search', function(request, response){
	var lat = request.query.lat;
	var lon = request.query.lon;
	console.log("params = " + request.query);
	console.log(lat + " " + lon);
	venueGetter(lat + ',' + lon, function(resp){
		//console.log("***********VENUES************" + venues);
		parseData(resp);
		response.send({
			data: resp,
			success: (resp !== undefined)
		});
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
<<<<<<< HEAD
	
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
	
	// (function(){
		// setTimeout(function(){
			// parseData();
			// console.log("setTimeout " + responseJSON);
			// response.send({
				// data: responseJSON,
				// success: (responseJSON !== undefined)
		// });
		// },1000);
	// })();
=======
>>>>>>> client start post/get
});

function parseData(str){
	// if(responseJSON.substring(0,5) === 'false'){
		// responseJSON = responseJSON.substring(5);
	// }
	// else if (responseJSON.substring(0,9) === 'undefined'){
		// responseJSON = responseJSON.substring(9);
	// }
	console.log(str);
	str = JSON.parse(str);
	return str;
	
}


app.post('/search', function(request, response){
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