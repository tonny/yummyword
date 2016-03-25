angular.module('yummyword.loginController',[])

.controller('LoginController',function($scope,$state,Auth){

	//#5ceaf9
	//rgb(92,234,2249)
	//User to loging
	$scope.user = {};

	$scope.login = function(){
		$state.go('home');
	};

	// TODO use auto by facebook
	/*
	$scope.login = function() {
		Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
			// User successfully logged in
			$scope.authData = authData; // This will display the user's name in our view
		}).catch(function(error) {
			if (error.code === "TRANSPORT_UNAVAILABLE") {
				Auth.$authWithOAuthPopup("facebook").then(function(authData) {
					// User successfully logged in. We can log to the console
					// since we’re using a popup here
					console.log(authData);
				});

			} else {
				// Another error occurred
				console.log(error);
			}
		});
	};
	*/
	Auth.$onAuth(function(authData) {
		if (authData === null) {
			console.log("Not logged in yet");
		} else {
			console.log("Logged in as", authData.uid);
			console.log(authData);
		}
		$scope.authData = authData; // This will display the user's name in our view
	});

	console.log(Auth);

});
