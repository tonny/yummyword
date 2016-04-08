angular.module('yummyword.loginController',[])

.controller('LoginController',function($scope,$state,Auth){

	//#5ceaf9
	//rgb(92,234,2249)
	//User to loging
	$scope.user = {};

	$scope.login = function(){
		$state.go('home');
	};

    var save_user = function(objLogin){
        var userid = objLogin.userid;
        //Grabo la session en el localStorage
        //localStorage.setItem("login", angular.toJson(objLogin));
        //Lo voy a guardar en la colección users
        //var user = Auth.$child("userid");
        console.log("Trata de guardar");
        Auth.$child(btoa(userid)).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            console.log("trata de entrar");
            if (!exists) {
                //Grabo en firebase el email codificado como clave, por si tiene caracteres raros.
                Auth.$child(btoa(useid)).set(objLogin);
                console.log("entra y graba");
            }

        });
    };

	$scope.loginFacebook = function() {
		Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
			// User successfully logged in
			$scope.authData = authData; // This will display the user's name in our view
            var first_name = authData.facebook.cachedUserProfile.first_name;
            var last_name = authData.facebook.cachedUserProfile.last_name;
            var image = authData.facebook.profileImageURL;
            var gerder = authData.facebook.cachedUserProfile.gender;
            //The email is returned if user has configured to give his email
            var email = authData.facebook.email;
            var userid = authData.facebook.id;
            var provider = authData.provider;
            //Save user
            var objLogin = {
                first_name : first_name,
                last_name : last_name,
                image: image,
                gerder: gerder,
                email: email,
                userid: userid,
                provider: provider,
                login: true,
            };
            console.log("llama a la funcion save_user");
            console.log(objLogin);
            save_user(objLogin);

  //          $state.go('home');

		}).catch(function(error) {
			if (error.code === "TRANSPORT_UNAVAILABLE") {
				Auth.$authWithOAuthPopup("facebook").then(function(authData) {
					// User successfully logged in. We can log to the console
					// since we’re using a popup here
                    console.log("Enter here with the following data:");
					console.log(authData);
               });
			} else {
				// Another error occurred
				console.log(error);
			}
		});
	};

	Auth.$onAuth(function(authData) {
		if (authData === null) {
			console.log("Not logged in yet");
		} else {
			console.log("Logged in as", authData.uid);
			console.log(authData);
		}
		$scope.authData = authData; // This will display the user's name in our view
	});

    $scope.logout = function(){
        Auth.$unauth();
        console.log("Cierra sesion");
      //  $scope.authData = null;
        console.log($scope.authData);
    };

	console.log(Auth);

});
