<<<<<<< HEAD
angular.module('mngr', ['ngSanitize','ngMd5','ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.utility'/*, 'ionic'*/]);

=======

angular.module('mngr', ['ngSanitize','ngMd5','ui.utils','ui.router','ngAnimate', 'firebase', 'mngr.util'/*, 'ionic'*/]);
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895

angular.module('mngr').config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url:'*path',
		reloadOnSearch: false,
<<<<<<< HEAD
		controller: ['$scope','$location','ui', 'models', 'data', 'api' ,function($scope, $location, ui, models, data, api){
=======
		controller: ['$scope','$location','ui', 'models', 'data', 'api' ,function($scope, $location, ui, models, data, api,$window){
>>>>>>> f9aec33bf4ece5208ea9d68ea4d58398e8668895
			api.loadState(angular.copy($location.path()), angular.copy($location.search()));
			$scope.$on('$locationChangeSuccess', function(){
				api.loadState(angular.copy($location.path()), angular.copy($location.search()));
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
