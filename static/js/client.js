function handleLogin(){
	$.ajax({
		type: "get",
		url: "/auth/google",
		success: function(data){
			console.log(data);
			//put the user in the db
		}
	});
}


$(document).ready(function(){

});