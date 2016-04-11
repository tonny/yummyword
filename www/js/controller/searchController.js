angular.module('yummyword.searchController',[])

.controller('SearchController',function($scope,$state,Auth,Dictionary,$ionicLoading,
										$ionicPopup,$http,$ionicHistory,Words){
    $scope.user = {};

    console.log("======= enter with register =========");
	Auth.$onAuth(function(authData) {
		if (authData === null) {
			console.log("Not logged in yet");
		} else {
			console.log("Logged in as", authData.uid);
			console.log(authData);
        	$scope.authData = authData; // This will display the user's name in our view
		}
	});


	$scope.goBack = function(){
		console.log("back");
		$ionicHistory.goBack();
	};

	//Configuration button
	$scope.config = {
		topDirections : ['left', 'up'],
		bottomDirections : ['down', 'right'],
		isOpen : false,
		availableModes : ['md-fling', 'md-scale'],
		selectedMode : 'md-fling',
		availableDirections : ['up', 'down', 'left', 'right'],
		selectedDirection : 'up'
	};

    $scope.searchWord = function(){
		if($scope.user.word !== "" && $scope.user.word !== undefined){
			$scope.loading = $ionicLoading.show({
				content: '<ion-spinner></ion-spinner>',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 0,
				showDelay: 0
			});
			// pedimos los comentarios al servidor 
			var options={
				method:"GET",
				url: Dictionary.definitionWord($scope.user.word),
				dataType: 'json',
				headers:{
					'Content-Type': 'application/json'
				}
			};
			$http(options)
			.then(function(response){
				console.log("datos del comentario");
				console.log(response.data);
				$scope.user.definition = response.data;
				$ionicLoading.hide();
			}, function(response) {
				console.log(response);
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Error de conexión',
					template: 'Upss! no se pudo traer los datos del servidor'
				});
			});
		}
	};
	$scope.saveWord = function(){
		if($scope.user.word !== "" && $scope.user.word !== undefined){
            console.log("Trying to connect");
            console.log(Words);

            Words.$add({
                user: $scope.authData.uid,
                word: $scope.user.word,
                definition: $scope.user.definition,
                timestamp: Firebase.ServerValue.TIMESTAMP
            });
			console.log("save a word");
		}
	};
});
