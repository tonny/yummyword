angular.module('yummyword.homeController',[])

.controller('HomeController',function($scope,$state){
    $scope.goSearch = function(){
        console.log("GO SEARCH PAGE");
        $state.go('search');
    };
});
