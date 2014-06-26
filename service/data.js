angular.module('mngr').factory('data',function($firebase, Firebase, $filter) {

	var data = {
        path: '/',
        params: {},

        types: [
            'products',
            'orders',
            'users',
            'events',
            'messages',
            'notices',
            'contents',
            'notes',
            'shops',
            'ui',
            'settings',
            'roles'
        ],

        products: {
            ref: new Firebase("https://mngr.firebaseio.com/products").limit(1000),
            fire: null,
            array: []
        },
        orders: {
            ref: new Firebase("https://mngr.firebaseio.com/orders"),
            fire: null,
            array: []
        },
        users: {
            ref: new Firebase("https://mngr.firebaseio.com/users"),
            fire: null,
            array: []
        },
        events: {
            ref: new Firebase("https://mngr.firebaseio.com/events"),
            fire: null,
            array: []
        },
        messages: {
            ref: new Firebase("https://mngr.firebaseio.com/messages"),
            fire: null,
            array: []
        },
        notices: {
            ref: new Firebase("https://mngr.firebaseio.com/notices"),
            fire: null,
            array: []
        },
        contents: {
            ref: new Firebase("https://mngr.firebaseio.com/contents"),
            fire: null,
            array: []
        },
        notes: {
            ref: new Firebase("https://mngr.firebaseio.com/notes"),
            fire: null,
            array: []
        },
        shops: {
            ref: new Firebase("https://mngr.firebaseio.com/shops"),
            fire: null,
            array: []
        },
        ui: {
            ref: new Firebase("https://mngr.firebaseio.com/ui"),
            fire: null,
            array: []
        },
        settings: {
            ref: new Firebase("https://mngr.firebaseio.com/settings"),
            fire: null,
            array: []
        },
        roles: {
            ref: new Firebase("https://mngr.firebaseio.com/roles"),
            fire: null,
            array: []
        },

        init: function () {
            this.initObjects();
            this.initFires();
            this.initArrays();
        },
        initObjects: function() {
            //angular.forEach(this.types, function(type){
            //});
        },
        initFires: function () {
            this.products.fire = $firebase(this.products.ref);
            this.orders.fire = $firebase(this.orders.ref);
            this.users.fire = $firebase(this.users.ref);
            this.events.fire = $firebase(this.events.ref);
            this.messages.fire = $firebase(this.messages.ref);
            this.notices.fire = $firebase(this.notices.ref);
            this.contents.fire = $firebase(this.users.ref);
            this.notes.fire = $firebase(this.notes.ref);
            this.shops.fire = $firebase(this.shops.ref);
            this.ui.fire = $firebase(this.ui.ref);
            this.settings.fire = $firebase(this.settings.ref);
            this.roles.fire = $firebase(this.roles.ref);
        },
        initArrays: function () {
            this.products.fire.$on('value', function(){ data.fireToArray('products'); });
            this.orders.fire.$on('value', function(){ data.fireToArray('orders'); });
            this.users.fire.$on('value', function(){ data.fireToArray('users'); });
            this.events.fire.$on('value', function(){ data.fireToArray('events'); });
            this.messages.fire.$on('value', function(){ data.fireToArray('messages'); });
            this.notices.fire.$on('value', function(){ data.fireToArray('notices'); });
            this.contents.fire.$on('value', function(){ data.fireToArray('contents'); });
            this.notes.fire.$on('value', function(){ data.fireToArray('notes'); });
            this.shops.fire.$on('value', function(){ data.fireToArray('shops'); });
            this.ui.fire.$on('value', function(){ data.fireToArray('ui'); });
            this.settings.fire.$on('value', function(){ data.fireToArray('settings'); });
            this.roles.fire.$on('value', function(){ data.fireToArray('roles'); });
        },

        fireToArray: function(type){
            this[type].array = $filter('orderByPriority')(this[type].fire);
        }
    };

    data.init(); // self-init()'ing service (gets called only once)

	return data;
});