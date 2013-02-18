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
		success: function(data){
			console.log(data);
		}
	});
}

$(document).ready(function(){
	post("kanye");
});