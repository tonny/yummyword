angular.module('yummyword.services',[])

.factory("Auth", function($firebaseAuth) {
	var usersRef = new Firebase("https//gumwords.firebaseio.com/users");
	return $firebaseAuth(usersRef);
})

.factory("Dictionary",function(){
    var baseUrl = "http://api.wordnik.com:80/v4/word.json/";
    var key = "3f2910b068dfc2f83430b0791410bdc12bf77ac8a38bd40fe";

    return {
        definitionWord : function (word){
            return baseUrl+word+"/definitions?limit=50&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key="+key;
        },
        audioWord : function(word){
            return baseUrl+word+"/audio?useCanonical=false&limit=1&api_key="+key;
        }
    };
});


