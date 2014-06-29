angular.module('mngr', ['ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.utility', 'ionic']);


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

angular.module('mngr').run(function($rootScope, data, $firebase, Firebase, $filter) {
    var dataLoader = {
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
                    data[type].fire.$on('value', function(){
                        dataLoader.fireToArray(type);
                    });
                }
            });
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
    ]);



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
