angular.module('yummyword.services',[])

.factory("Auth", function($firebaseAuth) {
//	var usersRef = new Firebase("https//yummyword.firebaseio.com/users");
	var usersRef = new Firebase("https//yummyword.firebaseio.com");
	return $firebaseAuth(usersRef);
})

.factory("Words", function($firebaseArray) {
    var wordsRef = new Firebase("https://yummyword.firebaseio.com/words");
    return $firebaseArray(wordsRef);
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
})
.factory("MyWords",function(){

	var ref = new Firebase("https://yummyword.firebaseio.com/words");
	var wordSnapshot=null;
	return {
		retrieving:function(IdUser,wordArray){

			ref.on('value',function(snapshot){
				snapshot.forEach(function(childSnapshot) {
					 wordSnapshot = childSnapshot.val();
					if(wordSnapshot.user==IdUser){
						wordArray.push({
							definitions:wordSnapshot.definition,
							word:wordSnapshot.word,
						});
					}
				});
			});

		},
		deleteWord:function(IdUser,word){
			ref.on('value',function(data){
				data.forEach(function(childWord){
					wordSnapshot=childWord.val();
					if(wordSnapshot.user==IdUser && wordSnapshot.word==word){
						var deleteWordRef= new Firebase("https://yummyword.firebaseio.com/words/"+childWord.key());
					//	console.log(wordSnapshot);
					//	console.log(childWord.key());
						deleteWordRef.remove();
					}
				});
			});
		}
	};
})
;
