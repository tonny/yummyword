angular.module('yummyword.gameController',[])

.controller('GameController',function($scope,$state, $ionicHistory) {
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

});
