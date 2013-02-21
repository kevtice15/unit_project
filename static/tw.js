var response;


function refreshDOM(){
	console.log("refreshDOM" + response);
	$(response.results).each(function(i,tweet){
		var liEl = $("<li>").html(tweet.text);
		$('#tweetcontainer').append(liEl);
	});
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

// function get(){
	// $.ajax({
		// type: "get",
		// url: "/search.json",
		// datatype: "json",
		// success: function(data){
			// response = JSON.parse(data.data);
			//$("#tweetcontainer").append('<li>').html(data);
		//	$("t")
			// console.log(JSON.parse(data.data));
			// refreshDOM();
		// }
	// });
// }

function get(keyword){
	$.ajax({
		type: "get",
		url: "/search/" + encodeURI(keyword),
		//datatype: "json",
		success: function(data){
			//response = JSON.parse(data.data);
			response = data.data;
			console.log(JSON.parse(data.data));
			refreshDOM();
		}
	});
}



$(document).ready(function(){
	//post("kanye");
	$("#submitButton").click(function(){
		console.log($("#query-input").val());
		get($("#query-input").val());
	});
});