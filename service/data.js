angular.module('mngr').factory('data',function($firebase, Firebase) {

	var data = {
			path: '/',
			params: {},
			refs:{
				products: new Firebase("https://mngr.firebaseio.com/products").limit(1000),
				orders: new Firebase("https://mngr.firebaseio.com/orders"),
				users: new Firebase("https://mngr.firebaseio.com/users"),
				events: new Firebase("https://mngr.firebaseio.com/events"),
				messages: new Firebase("https://mngr.firebaseio.com/messages"),
				notices: new Firebase("https://mngr.firebaseio.com/notices"),
				contents: new Firebase("https://mngr.firebaseio.com/contents"),
				notes: new Firebase("https://mngr.firebaseio.com/notes"),
				shops: new Firebase("https://mngr.firebaseio.com/shops"),
				ui: new Firebase("https://mngr.firebaseio.com/ui"),
				settings: new Firebase("https://mngr.firebaseio.com/settings"),
				roles: new Firebase("https://mngr.firebaseio.com/roles")
			},
				//ecodocs Gets 3-way ready.
			get products () {return $firebase(this.refs.products);},
			get orders () {return $firebase(this.refs.orders);},
			get users () {return $firebase(this.refs.users);},
			get events () {return $firebase(this.refs.events);},
			get messages () {return $firebase(this.refs.messages);},
			get notices () {return $firebase(this.refs.notices);},
			get contents () {return $firebase(this.refs.contents);},
			get notes () {return $firebase(this.refs.notes);},
			get shops () {return $firebase(this.refs.shops);},
			get ui () {return $firebase(this.refs.ui);},
			get settings () {return $firebase(this.refs.settings);},
			get roles () {return $firebase(this.refs.roles);}
		};

	return data;
});