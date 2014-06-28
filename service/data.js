angular.module('mngr').factory('data',function(Firebase, $firebaseSimpleLogin) {

	var data = {
        path: '/',
        params: {},
        user: {
            profile: null,  // user profile
            auth: $firebaseSimpleLogin(new Firebase("https://mngr.firebaseio.com/"))
        }
    };

	return data;
});