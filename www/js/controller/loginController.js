angular.module('yummyword.loginController',[])

.controller('LoginController',function($scope,$state,Auth,$mdDialog){

	//#5ceaf9
	//rgb(92,234,2249)
	//User to loging
	$scope.user = {};

	$scope.login = function(){
        console.log("Intenta loguear");
        Auth.$authWithPassword({
            "email": $scope.user.email,
            "password": $scope.user.password
        }).then(function(user) {
            //Success callback
            console.log('Authentication successful');
            console.log(user);
      		$state.go('home');
        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
            switch (error.code) {
                case "INVALID_USER":
                    $mdDialog.show({
                        clickOutsideToClose: true,
                        scope: $scope,        // use parent scope in template
                        openFrom : '#register-button',
                        // or an element
                        closeTo : angular.element(document.querySelector('#register-button')),
                        preserveScope: true,  // do not forget this if use parent scope
                        template:'<md-dialog>' +
                        ' <h3>You password or email are wrong.</h3>'+
                        '  <md-dialog-actions>' +
                        '    <md-button ng-click="closeDialog()" class="md-primary">' +
                        '     Ok!' +
                        '    </md-button>' +
                        '  </md-dialog-actions>' +
                        '</md-dialog>',
                         controller: function DialogController($scope, $mdDialog) {
                            $scope.closeDialog = function() {
                                $mdDialog.hide();
                            };
                        }
                    });
                break;
                default:
                    $mdDialog.show({
                        clickOutsideToClose: true,
                        scope: $scope,        // use parent scope in template
                        openFrom : '#register-button',
                        // or an element
                        closeTo : angular.element(document.querySelector('#register-button')),
                        preserveScope: true,  // do not forget this if use parent scope
                        template:'<md-dialog>' +
                        ' <h3>Ups!!! something is wrong :(."</h3>'+
                        '  <md-dialog-actions>' +
                        '    <md-button ng-click="closeDialog()" class="md-primary">' +
                        '     Ok!' +
                        '    </md-button>' +
                        '  </md-dialog-actions>' +
                        '</md-dialog>',
                        controller: function DialogController($scope, $mdDialog) {
                            $scope.closeDialog = function() {
                                $mdDialog.hide();
                            };
                        }
                    });
                console.log(error.code);
            }
        });
	};

    $scope.register = function(){
        console.log("################ Enter register ################# ");
        $state.go('register');
    };

    console.log("intenta cargar");

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
        console.log("Login trata de traer datos de facebook");
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
            console.log(authData);
            console.log(objLogin);
            save_user(objLogin);

            $state.go('home');

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
