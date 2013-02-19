var response;

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
			$('#tweetcontainer').append('<li>').html("Hello There!");
			//$("#tweetcontainer").append('<li>').html(data);
			//$("t")
			console.log(data);
		}
	});
}

$(document).ready(function(){
	post("kanye");
});