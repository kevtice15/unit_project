var response;

function getJSON(){
	console.log("haha");
}

function post(q){
	$.ajax({
		type: "post",
		url: "/search.json",
		data: {"query": q},
		success: function(q){
			console.log("post success " + q);
		}
	});
}


$(document).ready(function(){
	post("kanye");
});