angular.module('mngr', ['ngSanitize','ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.utility'/*, 'ionic'*/]);


angular.module('mngr').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url:'*path',
		reloadOnSearch: false,
		controller: ['$scope','$location','ui', 'models', 'data', 'api' ,function($scope, $location, ui, models, data, api){
			ui.loadState(angular.copy($location.path()), angular.copy($location.search()));
			$scope.$on('$locationChangeSuccess', function(){
				ui.loadState(angular.copy($location.path()), angular.copy($location.search()));
			});

            $scope.api = api;
            $scope.ui = ui;
            $scope.models = models;
            $scope.data = data;
		}],
		template: '<main></main>'
	});
    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('mngr').run(function($rootScope, api, data, $q, $firebase, Firebase, $filter) {
	//Firebase.enableLogging(true);
    var dataLoader = {
        // ecodocs: initialize the data
        init: function (types) {
            var defer = $q.defer();
            // by default load everything
            types = (angular.isDefined(types)?(angular.isArray(types)?types:[types]):data.types);
            dataLoader.initObjects(types).then(function(){
                dataLoader.initFires(types).then(function(){
                    dataLoader.initArrays(types).then(function(){
                        defer.resolve(true);
                    });
                });
            });
            return defer.promise;
        },

        // ecodocs: initialize the container objects for each data type
        initObjects: function(types) {
            var defer = $q.defer();
            angular.forEach(types, function(type){
                data[type] = {
                    ref: new Firebase("https://mngr.firebaseio.com/"+type),
                    fire: null,
                    array: []
                };
            });
            defer.resolve(true);
            return defer.promise;
        },

        // ecodocs: initialize the $firebase bindings for each data type
        initFires: function (types) {
            var defer = $q.defer();
            var firesInitted = {};
            angular.forEach(types, function(type){
                if(data[type].ref){
                    var fireInitted = $q.defer();
                    firesInitted[type] = fireInitted.promise;
                    data[type].fire = $firebase(data[type].ref);
                    data[type].fire.$on('loaded', function(){
                        fireInitted.resolve(true);
                    });
                }
            });
            $q.all(firesInitted).then(function(result){
                defer.resolve(result);
            });
            return defer.promise;
        },

        // ecodocs: initialize the arrays for each data type
        initArrays: function (types) {
            var defer = $q.defer();
            var arraysInitted = {};
            angular.forEach(types, function(type) {
                if(data[type] && data[type].fire && angular.isFunction(data[type].fire.$on)){
                    var arrayInitted = $q.defer();
                    arraysInitted[type] = arrayInitted.promise;
                    data[type].fire.$on('value', function(){
                        dataLoader.fireToArray(type);
                        if(arrayInitted){
                            // only resolve the first time (when initializing)
                            arrayInitted.resolve(true);
                            arrayInitted = null;
                        }
                    });
                }
            });
            $q.all(arraysInitted).then(function(result){
                defer.resolve(result);
            });
            return defer.promise;
        },

        // ecodocs: convert a $firebase refernce to an array (callback for data[type].fire.$on('value', function)
        fireToArray: function(type){
            data[type].array = $filter('orderByPriority')(data[type].fire);
            console.log(type+' loaded');
        }
    };
    dataLoader.init([
        'products',
        'orders',
        'events',
        'messages',
        'notices',
        'contents',
        'notes',
        'shops',
        'ui',
        'settings',
        'roles',
        'userAccounts',
        'users'
    ]).then(function(){
        api.login('active');
    });

    // ecodocs: mngrSecureFirebase testing...
/**    var up = $firebase(new Firebase('https://mngr.firebaseio.com/users/-JQZB3Pmi-yyABRG5x7B'));
    up.$on('loaded', function(){
        var securityTest = mngrSecureFirebase({name: 'test', access: ['customer', 'user']}, up);
        var publicTest = mngrSecureFirebase({name: 'test', access: ['public']}, up);

        var testData = securityTest.$child('jibba');
        if(testData){
            console.log('%cUser knows, waiting for data... '+JSON.stringify(testData), 'background: #000; color: #CF0');
            testData.$on('loaded', function(){
                console.log('%cGranted! '+JSON.stringify(testData), 'background: #000; color: #0F0');
            });
        }
        else{
            console.log('%cDenied!', 'background: #000; color: #F00');
        }

        var publicData = publicTest.$child('jibba');
        if(publicData){
            console.log('%cUser knows, waiting for data... '+JSON.stringify(publicData), 'background: #555; color: #CF0');
            publicData.$on('loaded', function(){
                console.log('%cGranted! '+JSON.stringify(publicData), 'background: #555; color: #0F0');
            });
        }
        else{
            console.log('%cDenied!', 'background: #555; color: #F00');
        }

        // events on data root
        securityTest.$on('loaded', function(){
            console.log('%cSecure Root: loaded', 'background: #000; color: #0CF');
        });
        securityTest.$on('change', function(){
            console.log('%cSecure Root: change', 'background: #000; color: #0CF');
        });
        securityTest.$on('value', function(snapshot){
            console.log('%cSecure Root: value:'+((snapshot&&snapshot.snapshot)?snapshot.snapshot.name+':'+JSON.stringify(snapshot.snapshot.value):'null?'), 'background: #000; color: #0CF');
        });

        publicTest.$on('loaded', function(){
            console.log('%cPublic Root: loaded', 'background: #555; color: #0CF');
        });
        publicTest.$on('change', function(){
            console.log('%cPublic Root: change', 'background: #555; color: #0CF');
        });
        publicTest.$on('value', function(snapshot){
            console.log('%cPublic Root: value:'+((snapshot&&snapshot.snapshot)?snapshot.snapshot.name+':'+JSON.stringify(snapshot.snapshot.value):'null?'), 'background: #555; color: #0CF');
        });


        // events on a $child
        testData.$on('loaded', function(){
            console.log('%cSecure testData: loaded', 'background: #000; color: #09F');
        });
        testData.$on('change', function(){
            console.log('%cSecure testData: change', 'background: #000; color: #09F');
        });
        testData.$on('value', function(snapshot){
            console.log('%cSecure testData: value: '+((snapshot&&snapshot.snapshot)?snapshot.snapshot.name+':'+JSON.stringify(snapshot.snapshot.value):'null?'), 'background: #000; color: #09F');
        });

        publicData.$on('loaded', function(){
            console.log('%cSecure publicData: loaded', 'background: #555; color: #09F');
        });
        publicData.$on('change', function(){
            console.log('%cSecure publicData: change', 'background: #555; color: #09F');
        });
        publicData.$on('value', function(snapshot){
            console.log('%cSecure publicData: value: '+((snapshot&&snapshot.snapshot)?snapshot.snapshot.name+':'+JSON.stringify(snapshot.snapshot.value):'null?'), 'background: #555; color: #09F');
        });

    });
*/



    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
