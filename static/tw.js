var response;

function get(q){
	$.ajax({
		type: "get",
		url: "/search.json",
		data: {query: q},
		success: function(q){
			console.log("get success " + q);
		}
	});
}


$(document).ready(function(){
	get("kanye");
});