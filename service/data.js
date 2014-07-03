angular.module('mngr').factory('data',function(Firebase, $firebaseSimpleLogin) {
	var fireRef = new Firebase("https://mngr.firebaseio.com/");
	var data = {
        path: '/',
        params: {},
        user: {
            profile: null,  // user profile
            auth: $firebaseSimpleLogin(fireRef)
        }
    };

	return data;
});