angular.module('mngr').factory('data',function(mngrSecureFirebase) {

	var data = {
<<<<<<< HEAD
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
            {name: 'userEmails', access: 'public'},
            {name: 'users', access: 'user'}
        ]
    };
=======
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
			{name: 'userEmails', access: 'public'},
			{name: 'users', access: 'user'}
		]
	};

>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895

	return data;
});
