var response;


function refreshDOM(){
	console.log(response);
	$('#tweetcontainer').append('<li>').html(response.results[0].text);
}

function getJSON(){
	console.log("haha");
}

function post(q){
	$.ajax({
		type: "post",
		url: "/search.json",
		data: {"query": q},
		success: function(data){
			console.log("post success " + data);
		}
	});
}

function get(){
	$.ajax({
		type: "get",
		url: "/search",
		datatype: "json",
		success: function(data){
			response = JSON.parse(data.data);
			//$("#tweetcontainer").append('<li>').html(data);
			//$("t")
			console.log(JSON.parse(data.data));
		}
	});
}

$(document).ready(function(){
	post("kanye");
});