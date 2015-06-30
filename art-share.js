// sample JSON
var foo = {
	'animals': ['zebra', 'lions']
};
// Look familiar? Looks like an object literal!
// Biggest differences:
//   keys ('animals') must be strings
//   Cannot contain methods


// Create a User
var createUser = function(email, fname, lname, password){
	$.ajax({
		type: 'POST',
		url: 'http://art-share.herokuapp.com/api/v1/users/',
		data: {
			user: {
				fname: fname,
				lname: lname,
				password: password,
				email: email
			}
		}
	}).success(function(data){
		console.log(data.result);
	});
};

// login with the user you just created
var loginUser = function(email){
	$.ajax({
		type: 'POST',
		url: 'http://art-share.herokuapp.com/api/v1/sessions/new',
		data: {
			email: email,
			password: 'passw0rd'
		}
	}).success(function(data){
		console.log('successful login. Here\'s the user:', data.result);
	});
};

// Create a painting for the user you just created, (pass in your users ID)
var addPainting = function(userId, name, image_url){
	$.ajax({
		type: 'POST',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId + '/paintings/',
		data: {
			painting: {
				image_url: image_url,
				name: name
			}
		}
	}).success(function(response){
		console.log('Added a painting!: ', response.result);
	}).error(function(error){
		console.log('Error: ', error);
	});
};

// List paintings for the user you just created (pass in your users ID)
var listPaintings = function(userId){
	$.ajax({
		type: 'GET',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId + '/paintings/'
	}).success(function(response){
		console.log(response.result);
		for (var i = 0; i < response.result.length; i++){
			console.log(response.result[i].image_url);
			var image_url = response.result[i].image_url;

			$('.images').append('<img src="' + image_url + '">');
		}
		// for (var i = 0; i < response.result.length; i++){
		// 		$('.images').append('<img src="' + response.result[i].image_url + '"><p>' + response.result[i].name + '</p>');
		// 		console.log(response.result[i]);
		// }
	}).error(function(response){
		console.log('error: ', response);
	});
};

/* --------------------------------------------------------------
MORE functions from the API
-------------------------------------------------------------- */

// return all users
var returnUsers = function(){
	$.ajax({
		type: 'GET',
		url: 'http://art-share.herokuapp.com/api/v1/users/'
	}).success(function(data){
		var user = data.result;
		console.log('all users: ', user);
	}).error(function(error){
		console.log('error msg: ', error);
	});
};


// Get currently Logged in user
// Doesn't work outside of art-share domain!?!?
var getCurrentUser = function(){
	$.ajax({
		type: 'GET',
		url: 'http://art-share.herokuapp.com/api/v1/sessions/'
	}).success(function(response){
		console.log('success: ', response);
	});	
};


// Delete a users painting
var deletePainting = function(userId, paintingId){
	$.ajax({
		type: 'DELETE',
		url: 'http://art-share.herokuapp.com/api/v1/users/' + userId + '/paintings/' + paintingId
	}).success(function(response){
		console.log('Deleted a painting: ', response.result);
	});
};



// Delete a user
var deleteUser = function(){
	$.ajax({
		type: 'DELETE',
		url: 'http://art-share.herokuapp.com/api/v1/users/10'
	}).success(function(response){
		console.log('Deleted a user: ', response);
	});
};

// If you find your responses containing JSON in a string:
var parsed = JSON.parse('{"jelly": "fish"}');


$(document).on('ready', function(){
	$('form#form-add-user').on('submit', function(){
		var email = $('#email').val();
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var password = $('#password').val();
		
		createUser(email, fname, lname, password);
		
		return false;

	});


	$('form#form-add-painting').on('submit', function(){
		var title = $('#title').val();
		var url = $('#url').val();
		
		addPainting(148, title, url);
		
		return false;

	});

    $('form#form-delete-painting').on('submit', function(){
            var paintingId = $('#paintingId').val();

            deletePainting(148, paintingId);

            return false;

    });

}); //Closes doc. ready




