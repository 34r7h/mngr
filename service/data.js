angular.module('mngr').factory('data',function(mngrSecureFirebase) {

	var data = {
        path: '/',
        params: {},
        user: {
            profile: null,  // user profile
            auth: mngrSecureFirebase()
        },
        types: [
            {name: 'products', access: 'public'},
            {name: 'orders', access: ['user', 'admin', 'manager']},
            {name: 'events', access: ['user', 'admin', 'manager']},
            {name: 'messages', access: ['user', 'admin']},
            {name: 'notices', access: ['user', 'admin']},
            {name: 'contents', access: 'public'},
            {name: 'notes', access: ['user', 'admin', 'manager']},
            {name: 'shops', access: 'public'},
            {name: 'ui', access: 'public'},
            {name: 'settings', access: 'user'},
            {name: 'roles', access: ['admin', 'manager']},
            {name: 'userAccounts', access: 'public'},
            {name: 'users', access: 'user'}
        ]
    };

	return data;
});
