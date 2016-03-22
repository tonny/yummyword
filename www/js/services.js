angular.module('yummyword.services',[])

.factory("Auth", function($firebaseAuth) {
	var usersRef = new Firebase("https//gumwords.firebaseio.com/users");
	return $firebaseAuth(usersRef);
});

