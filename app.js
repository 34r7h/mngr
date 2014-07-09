angular.module('mngr', ['ngSanitize','ngMd5','ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.utility'/*, 'ionic'*/]);

angular.module('mngr').config(function($stateProvider, $urlRouterProvider, $compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
	$stateProvider.state('main', {
		url:'*path',
		reloadOnSearch: false,
		controller: ['$scope','$location','ui', 'models', 'data', 'api','$window' ,function($scope, $location, ui, models, data, api,$window){

			api.loadState(angular.copy($location.path()), angular.copy($location.search()));
			$scope.$on('$locationChangeSuccess', function(){
				api.loadState(angular.copy($location.path()), angular.copy($location.search()));
			});
			$scope.window = $window;
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

angular.module('mngr').run(function($rootScope, api) {
	//Firebase.enableLogging(true);

    api.loadData().then(function(){
        api.login('active');
    });

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
