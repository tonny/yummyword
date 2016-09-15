angular.module('yummyword.saveWordsController',[])
.controller('SaveWordsController',function($scope,Auth,$state,$firebaseArray, $ionicHistory,Words,MyWords){
  $scope.myWords = [];
  $scope.showDelete = false;
  $scope.authData=null;
  Auth.$onAuth(function(authData) {

    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      $scope.authData = authData;
      MyWords.retrieving(authData.uid, $scope.myWords);
    }
  });

  $scope.goBack=function(){
    $ionicHistory.goBack();
  };
  $scope.goDatailWord=function(saveWords){
    $state.go('detailWord',{detail:saveWords});
  };
  $scope.deleteWord=function(word){  
      MyWords.deleteWord($scope.authData.uid,word, $scope.myWords);
  };

})
.controller('DetailWordController',function($scope,$stateParams){
  $scope.definitions=$stateParams.detail.definitions;
  $scope.word=$stateParams.detail.word;
  console.log($scope.definitions); 
})

;
