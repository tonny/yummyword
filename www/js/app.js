// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('yummyword', ['ionic','firebase','ngMaterial','yummyword.services',
			   'yummyword.loginController','yummyword.homeController','yummyword.searchController'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider,
				 $mdThemingProvider)
{
	$mdThemingProvider.theme('default')
		.primaryPalette('light-blue')
		.accentPalette('blue')
		.warnPalette('red');

	$stateProvider

		.state('login',{
			url: '/login',
			templateUrl : 'template/user/login.html',
			controller : 'LoginController'
		})

		.state('register',{
			url : '/register',
			templateUrl : 'template/user/register.html',
			controller : 'LoginController'
		})

		.state('home',{
			url : '/home',
			templateUrl : 'template/user/home.html',
			controller : 'HomeController'
		})

		.state('search',{
			url : '/search',
			templateUrl : 'template/user/search.html',
			controller : 'SearchController'
		})

		;

	$urlRouterProvider.otherwise('/login');
});
