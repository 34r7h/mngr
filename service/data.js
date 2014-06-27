angular.module('mngr').factory('data',function($firebase, Firebase, $firebaseSimpleLogin, $filter) {

	var data = {
        path: '/',
        params: {},
        user: {
            account: null,  // firebase authentication account
            credentials: {
                email: '',
                password: '',
                passConfirm: '',
                recover: false
            },
            profile: null,  // user profile
            auth: $firebaseSimpleLogin(new Firebase("https://mngr.firebaseio.com/"))
        },

        // ecodocs: list of data types the service provides
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

        // ecodocs: initialize the data
        init: function (types) {
            // by default load everything
            types = (angular.isDefined(types)?(angular.isArray(types)?types:[types]):data.types);
            this.initObjects(types);
            this.initFires(types);
            this.initArrays(types);
        },

        // ecodocs: initialize the container objects for each data type
        initObjects: function(types) {
            angular.forEach(types, function(type){
                data[type] = {
                    ref: new Firebase("https://mngr.firebaseio.com/"+type),
                    fire: null,
                    array: []
                };
            });
        },

        // ecodocs: initialize the $firebase bindings for each data type
        initFires: function (types) {
            angular.forEach(types, function(type){
                if(data[type].ref){
                    data[type].fire = $firebase(data[type].ref);
                }
            });
        },

        // ecodocs: initialize the arrays for each data type
        initArrays: function (types) {
            angular.forEach(types, function(type) {
                if(data[type] && data[type].fire && angular.isFunction(data[type].fire.$on)){
                    data[type].fire.$on('value', function(){ data.fireToArray(type); });
                }
            });
        },

        // ecodocs: convert a $firebase refernce to an array (callback for data[type].fire.$on('value', function)
        fireToArray: function(type){
            data[type].array = $filter('orderByPriority')(data[type].fire);
            console.log(type+' loaded');
        },

        // creates a user profile for a given account
        createUserProfile: function(account){
        },

        // loads the user profile for a given account
        loadUserProfile: function(account){
        },

        // reset user login credentials
        resetUserCredentials: function(){
            data.user.credentials.email = '';
            data.user.credentials.password = '';
            data.user.credentials.passConfirm = '';
            data.user.credentials.recover = false;
        },

        // check if the given email is associated with an existing account
        userEmailExists: function(email){
        },

        // check if the given username is associated with an existing account
        usernameExists: function(username){
        }
    };

    // ecodocs: self-init()'ing service (gets called only once)
    data.init();

	return data;
});